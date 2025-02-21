"use client";
import React, { useEffect, useState } from "react";
// ant components
import { Col, DatePicker, Form, Input, Row, Select } from "antd";
import axiosInstance from "@/app/utils/axios-config";

const FundingSearchForm = ({ setSearchTerms, setBusinessId }: any) => {
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
        console.log("here");
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
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={10}>
          <Form.Item className="mb-0">
            <Input.Search
              size="large"
              placeholder="Search your funding"
              onSearch={(value) => setSearchTerms(value)}
              onChange={(e) => setSearchTerms(e.target.value)}
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
        {/* <Col xs={24} lg={6}>
          <Form.Item className="mb-0">
            <DatePicker.RangePicker className="w-full" size="large" />
          </Form.Item>
        </Col> */}
      </Row>
    </Form>
  );
};

export default FundingSearchForm;
