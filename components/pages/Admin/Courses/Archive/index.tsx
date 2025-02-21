/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { Fragment, useEffect, useState } from "react";

// next components
// import NextLink from "next/link";
// antd components
import { Divider, Pagination, Typography } from "antd";
// app components
import CourseList from "./CourseList";
import Container from "@/components/shared/container";
import LearningMenu from "@/components/pages/Admin/Learning/LearningMenu";
import axiosInstance from "@/app/utils/axios-config";
import StatList from "../StatList";

const ArchivePage = () => {
  const [courses, setCourses] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCourses, setTotalCourses] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [loading, setLoading] = useState(false);

  const fetchCourses = async (page: any) => {
    try {
      setLoading(true);
      const query = buildQuery({ status: "archive", page, limit: pageSize });
      const res = await axiosInstance.get(`/course/all${query}`);
      if (res.status) {
        const resData = res.data.data;
        setCourses(resData.courses);
        setTotalCourses(resData.count);
        setCurrentPage(resData.currentPage);
      }
    } catch (error) {
      console.log("Unable to fetch archive courses", error);

      // handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  };

  const buildQuery = (params: { [key: string]: any }) => {
    const query = Object.entries(params)
      .filter(
        ([_, value]) => value !== undefined && value !== null && value !== ""
      )
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join("&");
    return query ? `?${query}` : "";
  };

  useEffect(() => {
    fetchCourses(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <Fragment>
      <section className="content-header">
        <Container className="container-fluid p-6">
          <Typography.Title level={2} className="mb-0">
            Archive
          </Typography.Title>
          <Typography.Paragraph className="mb-0">
            Check out Organisations that are making the most impact on Funding,
            Grants, & Scholarships
          </Typography.Paragraph>
        </Container>
      </section>
      <nav>
        <Container className="container-fluid px-6">
          <LearningMenu activeKey="archive" />
        </Container>
      </nav>
      <section className="content-header">
        <Container className="container-fluid p-6">
          <StatList />
        </Container>
      </section>
      <section className="content-body">
        <Container className="container-fluid px-6 pb-6">
          <CourseList
            fetchCourses={fetchCourses}
            coursesList={courses}
            currentPage={currentPage}
            setCourses={setCourses}
            loading={loading}
            setLoading={setLoading}
          />
          <div className="flex justify-center items-center mt-2">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={totalCourses}
              onChange={handlePageChange}
            />
          </div>
        </Container>
      </section>
    </Fragment>
  );
};

export default ArchivePage;
