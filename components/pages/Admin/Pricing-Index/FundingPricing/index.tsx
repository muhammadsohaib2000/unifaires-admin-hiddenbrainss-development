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
import BusinessFundingPosting from "./BusinessFundingPosting";
import CountryFundingPosting from "./CountryFundingPosting";
import FundingPaymentType from "./FundingPaymentType";

interface DataType {
  key: string;
  name: string;
  price: number;
  businessType: string;
}

const FundingsPricings = () => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Funding Payment Type",
      children: <FundingPaymentType />,
    },
    {
      key: "2",
      label: "Country Funding Posting",
      children: <CountryFundingPosting />,
    },
    {
      key: "3",
      label: "Business Funding Posting",
      children: <BusinessFundingPosting />,
    },
  ];

  return (
    <Fragment>
      {/* Search */}
      <div>
        <Typography.Title level={4} className="my-2">
          Fundings Pricing System
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

export default FundingsPricings;
