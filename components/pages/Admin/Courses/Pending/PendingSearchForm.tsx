/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";
import { Col, Form, Input, Row, Select } from "antd";
import config from "@/app/utils/config";
import axios from "axios";
import axiosInstance from "@/app/utils/axios-config";
import { handleAxiosError } from "@/app/utils/axiosError";

const PendingSearchForm = ({
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
  const [searchQuery, setSearchQuery] = useState<any>("");
  const [businessList, setBusinessList] = useState<any>([]);
  const fetchBusinessList = async () => {
    try {
      const res = await axiosInstance.get("/admin/business");
      if (Array.isArray(res?.data?.data?.results)) {
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
      handleAxiosError(error);
    }
  };

  useEffect(() => {
    fetchBusinessList();
  }, []);

  const handleSearchInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newSearchQuery =
      typeof event?.target?.value === "string" &&
      event.target.value.trim() !== ""
        ? event.target.value
        : undefined;
    setSearchQuery(newSearchQuery);
    try {
      setLoading(true);
      const response = await axios.get(`${config.API.API_URL}/course`, {
        params: { title: newSearchQuery, status: "pending" },
      });
      setCourses(response?.data?.data?.courses);
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery == "") {
      fetchCourses(currentPage);
    }
  }, [searchQuery]);

  const handleOrganisationChange = async (id: any) => {
    try {
      setLoading(true);
      const searchQuery1 =
        typeof searchQuery === "string" && searchQuery.trim() !== ""
          ? searchQuery
          : undefined;
      const res = await axiosInstance.get(`/course`, {
        params: { page: currentPage, title: searchQuery1, businessId: id },
      });
      if (Array.isArray(res?.data?.data?.courses)) {
        setCourses(res.data.data.courses);
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
      </Row>
    </Form>
  );
};

export default PendingSearchForm;
