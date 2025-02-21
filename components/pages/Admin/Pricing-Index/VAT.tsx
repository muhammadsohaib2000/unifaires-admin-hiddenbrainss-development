"use client";
import { EditOutlined } from "@ant-design/icons";
import Country, {
  CountryListOption,
} from "@/components/shared/CountryList/countryList";
import axiosInstance from "@/app/utils/axios-config";
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  Table,
  Tag,
  Typography,
  message,
} from "antd";
import form from "antd/es/form";
import { ColumnsType } from "antd/es/table";
import { Fragment, useEffect, useState } from "react";

interface DataType {
  name: string;
  flag: string;
  code: string;
  dial_code: string;
}

const VAT = () => {
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [editedText, setEditedText] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [currentTaxPricing, setCurrentTaxPricing] = useState<any>();

  const fetchVatPricing = () => {
    axiosInstance
      .get("/tax")
      .then((res) => {
        setCurrentTaxPricing(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchVatPricing();
  }, []);

  const filteredData = Country.filter((item) => {
    return item.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleEditClick = (code: string, currentText: string) => {
    setEditedText((prevData) => ({
      ...prevData,
      [code]: currentText,
    }));
    setIsEditing(code);
  };

  const handleSaveClick = async (name: string) => {
    setLoading(true);
    await axiosInstance
      .post("/tax", {
        country: name,
        tax: editedText[name],
      })
      .then((res) => {
        message.success("Pricing added successfully");

        fetchVatPricing();
      })
      .catch((error) => {
        console.log("here is the error", error);
      });
    setLoading(false);
    setIsEditing("");
  };
  const handleUpdatePricing = async (name: string) => {
    const country = currentTaxPricing.find((c: any) => c.country === name);
    const pricingId = country.id;
    setLoading(true);
    await axiosInstance
      .put(`/tax/${pricingId}`, {
        tax: editedText[name],
      })
      .then((res) => {
        message.success("Pricing updated successfully");

        fetchVatPricing();
        console.log(res);
      })
      .catch((error) => {
        console.log("here is the error", error);
      });
    setLoading(false);
    setIsEditing("");
  };

  const getTaxForCountry = (countryName: string) => {
    if (!currentTaxPricing || !Array.isArray(currentTaxPricing)) {
      // Handle the case when currentPricingIndex is not defined or not an array
      return "N/A";
    }
    const country = currentTaxPricing.find((c) => c.country === countryName);
    return country ? `${country.tax}%` : "N/A";
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Country",
      dataIndex: "name",
      key: "name",
      fixed: "left",
      width: 50,
      render: (name) => <a>{name}</a>,
    },
    {
      title: "VAT(%)",
      dataIndex: "name",
      key: "VAT",
      align: "center",
      render: (name) => (
        <div className="flex justify-center">
          {isEditing === name ? (
            <div className="flex flex-row items-center gap-2">
              <Input
                type="number"
                value={editedText[name]}
                onChange={(e) =>
                  setEditedText({ ...editedText, [name]: e.target.value })
                }
                className="w-20"
              />
              {getTaxForCountry(name) !== "N/A" ? (
                <Button
                  type="primary"
                  onClick={() => handleUpdatePricing(name)}
                  loading={loading}
                >
                  Update
                </Button>
              ) : (
                <Button
                  type="primary"
                  onClick={() => handleSaveClick(name)}
                  loading={loading}
                >
                  Save
                </Button>
              )}
            </div>
          ) : (
            <div className="flex flex-row items-center gap-4">
              <Typography.Paragraph>
                {/* {editedText[name] || "0"} */}
                {getTaxForCountry(name)}
              </Typography.Paragraph>
              <Button
                type="text"
                size="small"
                shape="circle"
                icon={<EditOutlined />}
                className="-mt-4"
                onClick={() => handleEditClick(name, editedText[name] || "")}
              />
            </div>
          )}
        </div>
      ),
      width: 50,
    },
  ];

  return (
    <Fragment>
      {/* Search */}
      <div>
        <Typography.Title level={4} className="my-2">
          VAT Pricing System
        </Typography.Title>
        <Form form={form} className="pb-6">
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={10}>
              <Form.Item className="mb-0">
                <Input.Search
                  size="large"
                  placeholder="Search for Country"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
      <div>
        <Table
          columns={columns}
          dataSource={filteredData}
          scroll={{ x: 200 }}
        />
      </div>
    </Fragment>
  );
};

export default VAT;
