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
import BusinessInvitePricings from "./BusinessInvitePricing";
import CountryBusinessInvite from "./CountryBusinessInvite";
import BusinessInvitePaymentType from "./BusinessInvitePaymentType";

interface DataType {
  key: string;
  name: string;
  price: number;
  businessType: string;
}

const BusinessInvitePricing = () => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Invite Payment Type",
      children: <BusinessInvitePaymentType />,
    },
    {
      key: "2",
      label: "Country Business Invite",
      children: <CountryBusinessInvite />,
    },
    {
      key: "3",
      label: "Business Invite Pricing",
      children: <BusinessInvitePricings />,
    },
  ];

  return (
    <Fragment>
      {/* Search */}
      <div>
        <Typography.Title level={4} className="my-2">
          Business Invite Pricing System
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

export default BusinessInvitePricing;
