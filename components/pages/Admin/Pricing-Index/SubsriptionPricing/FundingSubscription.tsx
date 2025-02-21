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

interface DataType {
  key: string;
  name: string;
  price: number;
  businessType: string;
}

const FundingSubscriptionPricing = () => {
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
      label: "Subscription Payment Plan",
      children: <SubscriptionPlans />,
    },
    {
      key: "2",
      label: "Country Subscription Discount ",
      children: <CountrySubscription />,
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
          Funding Subscription Pricing System
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

export default FundingSubscriptionPricing;
