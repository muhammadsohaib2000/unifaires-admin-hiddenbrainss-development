"use client";
import React, { useEffect, useState } from "react";
// ant components
import { Col, DatePicker, Form, Input, Row, Select } from "antd";
import config from "@/app/utils/config";
import axios from "axios";
import { useSession } from "next-auth/react";
import axiosInstance from "@/app/utils/axios-config";
import { handleAxiosError } from "@/app/utils/axiosError";

const ArchiveSearchForm = ({
  fetchCourses,
  setLoading,
  currentPage,
  setCourses,
}: {
  fetchCourses: Function;
  setCourses: any;
  setLoading: any;
  currentPage: any;
}) => {
  const [form] = Form.useForm();
  const { data: session } = useSession();
  const [searchQuery, setSearchQuery] = useState("");
  const [businessList, setBusinessList] = useState<any>([]);
  const fetchBusinessList = async () => {
    try {
      const res = await axiosInstance.get("/admin/business");
      if (res.status) {
        const resData = res.data.data.results;
        const businessOptions = resData.map((business: any) => {
          return {
            label: business.companyName,
            value: business.id,
          };
        });
        setBusinessList(businessOptions);
      }
    } catch (error) {
      console.log("Here is the error", error);
    }
  };

  useEffect(() => {
    fetchBusinessList();
  }, []);

  const handleSearchInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newSearchQuery = event.target.value;
    setSearchQuery(newSearchQuery);
    try {
      setLoading(true);
      const response = await axios.get(
        `${config.API.API_URL}/course?title=${searchQuery}&&status=archive`
      );
      const courses = response.data.data;
      // console.log(courses);
      setCourses(courses.courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery == "") {
      fetchCourses(currentPage);
    }
  }, [searchQuery]);

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

  const handleOrganisationChange = async (id: any) => {
    const query = buildQuery({ page: currentPage, businessId: id });

    try {
      setLoading(true);
      const res = await axiosInstance.get(`/course${query}`);
      if (res.status) {
        console.log("here is res", res);
        const courses = res.data.data;
        // console.log(courses);
        setCourses(courses.courses);
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} className="py-6">
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={10}>
          <Form.Item className="mb-0">
            <Input.Search
              size="large"
              placeholder="Search your course"
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
          </Form.Item>
        </Col>
        {/* <Col xs={12} lg={4}>
          <Form.Item className="mb-0">
            <Select
              size="large"
              showSearch
              placeholder="Sort by"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={[
                {
                  value: "date-created",
                  label: "Date created",
                },
                {
                  value: "recently-accessed",
                  label: "Recently Accessed",
                },
              ]}
            />
          </Form.Item>
        </Col> */}
        <Col xs={12} lg={4}>
          <Form.Item className="mb-0">
            <Select
              showSearch
              allowClear
              size="large"
              placeholder="Filter by Organization"
              optionFilterProp="children"
              onChange={handleOrganisationChange}
              filterOption={(input, option: any) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={businessList}
            />
          </Form.Item>
        </Col>
        {/* <Col xs={24} lg={6}>
          <Form.Item className="mb-0">
            <DatePicker.RangePicker className="w-full" size="large" />
          </Form.Item>
        </Col> */}
      </Row>
    </Form>
  );
};

export default ArchiveSearchForm;
