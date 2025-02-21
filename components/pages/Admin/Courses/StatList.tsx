"use client";
import React, { useEffect, useState } from "react";
// next components
import NextLink from "next/link";
// antd components
import { Row, Col, Card, Space, Avatar, Progress, Typography } from "antd";
import {
  RiseOutlined,
  FallOutlined,
  GlobalOutlined,
  WalletOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import axiosInstance from "@/app/utils/axios-config";
import { fetchCountries } from "@/redux/features/CountrySlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";

const StatList = () => {
  const [courseStats, setCourseStats] = useState<any>();
  const dispatch: any = useAppDispatch();

  const fetchStats = async () => {
    try {
      // const stats = await axiosInstance.get("/admin/stats");
      const stats = await axiosInstance.get("/admin/course-stats");
      if (stats.status) {
        console.log("here is the stat", stats);
        setCourseStats(stats.data.data);
      }
    } catch (error) {
      console.log("Error fetching Stats", error);
    }
  };

  const formatCurrency = (value: any) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  useEffect(() => {
    fetchStats();
    dispatch(fetchCountries());
  }, []);

  const Countries = useAppSelector(
    (state: RootState) => state.country.countries
  );

  const getCountry = (countryCode: string) => {
    if (!Countries || !Array.isArray(Countries)) {
      // Handle the case when currentPricingIndex is not defined or not an array
      return "N/A";
    }
    const country = Countries.find((c) => c.code === countryCode);
    return country ? country.name : 0;
  };
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={12} xl={5}>
        <Card hoverable className="rounded-lg h-full">
          <Space className="justify-between w-full">
            <Typography.Title level={5} className="mb-0">
              Total Revenue
            </Typography.Title>
            <Avatar
              size={48}
              icon={<WalletOutlined />}
              className="flex justify-center items-center bg-accent-50 text-accent-500"
            />
          </Space>
          <Typography.Title level={1} className="">
            {formatCurrency(courseStats?.revenue || 0)}
          </Typography.Title>
          <Space className="gap-2 w-full">
            <Typography.Paragraph className="font-semibold italic">
              Total Unifaires Courses Revenue
            </Typography.Paragraph>
          </Space>
        </Card>
      </Col>
      <Col xs={24} sm={12} xl={5}>
        <NextLink href="/dashboard/learning/students">
          <Card hoverable className="rounded-lg text-center h-full">
            <Space className="justify-between w-full">
              <Typography.Title level={5} className="mb-0">
                Total students
              </Typography.Title>
              <Avatar
                size={48}
                icon={<UsergroupAddOutlined />}
                className="flex justify-center items-center bg-purple-60 text-purple-500"
              />
            </Space>
            <Typography.Title level={1} className="my-2">
              {courseStats?.students || 0}
            </Typography.Title>
            <Space className="gap-2 w-full">
              <Typography.Paragraph className="font-semibold italic">
                Total Number of Students on Unifaires
              </Typography.Paragraph>
            </Space>
          </Card>
        </NextLink>
      </Col>
      <Col xs={24} sm={12} xl={6}>
        <Card hoverable className="rounded-lg h-full">
          <Space className="justify-between w-full">
            <Typography.Title level={5} className="mb-0">
              Countries with student
            </Typography.Title>
            <Avatar
              size={48}
              icon={<GlobalOutlined />}
              className="flex justify-center items-center bg-orange-50 text-orange-500"
            />
          </Space>
          <Typography.Title level={1} className="">
            {courseStats?.countries.length || 0}
          </Typography.Title>
          <Space className="gap-2 w-full">
            <Typography.Paragraph className="mb-0">
              Total Number of Countries with Student
            </Typography.Paragraph>
          </Space>
        </Card>
      </Col>
      <Col xs={24} sm={12} xl={8}>
        <Card hoverable className="rounded-lg h-full">
          <Typography.Paragraph>Top student locations</Typography.Paragraph>
          <div className=" [&>div>div>div>div>div]:bg-purple-500 h-full">
            {courseStats && courseStats.countries.length > 0 ? (
              courseStats.countries
                .sort((a: any, b: any) => b.enrollmentCount - a.enrollmentCount) // Sort in descending order
                .slice(0, 4) // Get the top 4 countries
                .map((country: any) => {
                  const percentage: any =
                    (country.enrollmentCount / courseStats.students) * 100;
                  return (
                    <div
                      key={country.country}
                      className="flex justify-between gap-1 w-full"
                    >
                      <Typography.Title level={5} className="mb-0">
                        {getCountry(country.country)}
                      </Typography.Title>
                      <Progress
                        percent={percentage.toFixed(2)}
                        className="w-3/5"
                      />
                    </div>
                  );
                })
            ) : (
              <div className="flex justify-center items-center h-[120px]">
                <Typography.Paragraph className="font-bold text-base">
                  No Countries
                </Typography.Paragraph>
              </div>
            )}
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default StatList;
