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
import BusinessJobPosting from "./BusinessJobPosting";
import CountryJobPosting from "./CountryJobPosting";
import JobPaymentType from "./JobPaymentType";

interface DataType {
  key: string;
  name: string;
  price: number;
  businessType: string;
}

const JobsPricing = () => {
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
      label: "Jop Payment Type",
      children: <JobPaymentType />,
    },
    {
      key: "2",
      label: "Country Job Posting",
      children: <CountryJobPosting />,
    },
    {
      key: "3",
      label: "Business Job Posting",
      children: <BusinessJobPosting />,
    },
  ];

  return (
    <Fragment>
      {/* Search */}
      <div>
        <Typography.Title level={4} className="my-2">
          Jobs Pricing System
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

export default JobsPricing;
