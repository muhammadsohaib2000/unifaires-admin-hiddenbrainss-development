"use client";
import { EditOutlined } from "@ant-design/icons";
import { CountryListOption } from "@/components/shared/CountryList/countryList";
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  Table,
  Tabs,
  Tag,
  Typography,
} from "antd";
import form from "antd/es/form";
import { ColumnsType } from "antd/es/table";
import { TabsProps } from "antd/lib";
import { Fragment, useState } from "react";
import BusinessCoursePayout from "./BusinessCoursePayout";
import CountryCoursePayout from "./CountryCoursePayout";

interface DataType {
  key: string;
  name: string;
  price: number;
  businessType: string;
}

const CoursePayout = () => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Country Payout ",
      children: <CountryCoursePayout />,
    },
    {
      key: "2",
      label: "Business Specific",
      children: <BusinessCoursePayout />,
    },
  ];

  return (
    <Fragment>
      {/* Search */}
      <div>
        <Typography.Title level={4} className="my-2">
          Course Payout Pricing System
        </Typography.Title>
      </div>
      <div>
        <div>
          <Tabs defaultActiveKey="1" items={items} />
        </div>
      </div>
    </Fragment>
  );
};

export default CoursePayout;
