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
import BusinessAssociateInvite from "./BusinessAssociateInvite";
import CountryAssociateInvite from "./CountryAssociateInvite";
import AssociatePaymentType from "./AssociatePaymentType";

interface DataType {
  key: string;
  name: string;
  price: number;
  businessType: string;
}

const AssociateUserPricing = () => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Associate Payment Type",
      children: <AssociatePaymentType />,
    },
    {
      key: "2",
      label: "Country Associate Invite",
      children: <CountryAssociateInvite />,
    },
    {
      key: "3",
      label: "Business Associate Invite",
      children: <BusinessAssociateInvite />,
    },
  ];

  return (
    <Fragment>
      {/* Search */}
      <div>
        <Typography.Title level={4} className="my-2">
          Associate User Invite Pricing System
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

export default AssociateUserPricing;
