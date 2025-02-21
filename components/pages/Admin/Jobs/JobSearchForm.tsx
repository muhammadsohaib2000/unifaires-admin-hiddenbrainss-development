"use client";
import React, { useEffect, useState } from "react";
// ant components
import { Col, DatePicker, Form, Input, Row, Select } from "antd";
import axiosInstance from "@/app/utils/axios-config";

const JobSearchForm = ({ setSearchTerms, setBusinessId }: any) => {
  const [form] = Form.useForm();
  const [businessList, setBusinessList] = useState<any>([]);
  const fetchBusinessList = async () => {
    try {
      const res = await axiosInstance.get("/admin/business");
      if (res.status) {
        // console.log(res);
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

  const handleOrganisationChange = async (id: any) => {
    setBusinessId(id);
  };

  return (
    <Form form={form} className="pb-6">
      <Row className="gap-2">
        <Form.Item className="mb-0">
          <Input.Search
            size="large"
            placeholder="Search your jobs"
            onSearch={(value) => setSearchTerms(value)}
            onChange={(e) => setSearchTerms(e.target.value)}
          />
        </Form.Item>

        <Form.Item className="mb-0">
          <Select
            showSearch
            allowClear
            size="large"
            placeholder="Filter by Organization"
            optionFilterProp="children"
            onChange={handleOrganisationChange}
            filterOption={(input, option: any) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={businessList}
          />
        </Form.Item>
      </Row>
    </Form>
  );
};

export default JobSearchForm;
