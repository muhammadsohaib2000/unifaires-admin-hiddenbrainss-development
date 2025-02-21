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
import BusinessSubscription from "./BusinessSubscription";
import CountrySubscription from "./CountrySubscription";
import SubscriptionPlans from "./SubscriptionPlans";
import FundingSubscriptionPricing from "./FundingSubscription";

interface DataType {
  key: string;
  name: string;
  price: number;
  businessType: string;
}

const SubscriptionPricing = () => {
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState("");
  const [editedText, setEditedText] = useState("");
  const [editId, setEditId] = useState("section");

  const handleEditClick = (text: any) => {
    setEditedText(text);
    setIsEditing(text);
  };

  const handleSaveClick = () => {
    setIsEditing("");
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Funding Subscription",
      children: <FundingSubscriptionPricing />,
    },
    {
      key: "2",
      label: "Course Subscription ",
      children: (
        <div>
          <Typography.Paragraph>Course Subscription</Typography.Paragraph>
        </div>
      ),
    },
    // {
    //   key: "3",
    //   label: "Business ",
    //   children: <BusinessSubscription />,
    // },
  ];

  return (
    <Fragment>
      {/* Search */}
      <div>
        <Typography.Title level={4} className="my-2">
          Subscription Pricing System
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

export default SubscriptionPricing;
