"use client";
import { fetchCountries } from "@/redux/features/CountrySlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { EditOutlined } from "@ant-design/icons";
import { CountryListOption } from "@/components/shared/CountryList/countryList";
import axiosInstance from "@/app/utils/axios-config";
import { handleAxiosError, showSuccess } from "@/app/utils/axiosError";
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
  message,
} from "antd";
import form from "antd/es/form";
import { ColumnsType } from "antd/es/table";
import { TabsProps } from "antd/lib";
import { Fragment, useEffect, useState } from "react";

interface DataType {
  key: string;
  name: string;
  price: number;
  businessType: string;
}

const CountryCoursePayout = () => {
  const dispatch: any = useAppDispatch();
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [editedText, setEditedText] = useState<{ [key: string]: string }>({});
  const [currentCountryDiscount, setCurrentDiscount] = useState<any>();
  const [loading, setLoading] = useState(false);

  const fetchCountryPercentage = () => {
    axiosInstance
      .get("/general-course-payout")
      .then((res) => {
        // console.log(res);
        setCurrentDiscount(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchCountryPercentage();
    dispatch(fetchCountries());
  }, []);

  const Country = useAppSelector((state: any) => state.country.countries);

  const filteredData = Country.filter((item: any) => {
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
    const countryISO = await Country.find((c: any) => c.name === name);

    setLoading(true);

    await axiosInstance
      .post("/general-course-payout", {
        country: name,
        businessPercentage: editedText[name],
        // countryISO: countryISO.code,
      })
      .then((res) => {
        showSuccess("Percentage added successfully");
        fetchCountryPercentage();
      })
      .catch((error) => {
        handleAxiosError(error);
        console.log("here is the error", error);
      });
    setLoading(false);
    setIsEditing("");
  };

  const handleUpdatePricing = async (name: string) => {
    const country: any = currentCountryDiscount.find(
      (c: any) => c.country === name
    );
    const discountId = country.id;
    setLoading(true);
    await axiosInstance
      .put(`/general-course-payout/${discountId}`, {
        businessPercentage: editedText[name],
      })
      .then((res) => {
        showSuccess("Discount updated successfully");
        fetchCountryPercentage();
      })
      .catch((error) => {
        handleAxiosError(error);
        console.log("here is the error", error);
      });
    setLoading(false);
    setIsEditing("");
  };

  const getPercentageForCountry = (countryName: string) => {
    if (!currentCountryDiscount || !Array.isArray(currentCountryDiscount)) {
      // Handle the case when currentPricingIndex is not defined or not an array
      return "N/A";
    }
    const country = currentCountryDiscount.find(
      (c) => c.country === countryName
    );
    return country ? `${country.businessPercentage}%` : "N/A";
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
      title: "Percentage(%)",
      dataIndex: "name",
      key: "Percentage",
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
              {getPercentageForCountry(name) !== "N/A" ? (
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
                {getPercentageForCountry(name)}
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

export default CountryCoursePayout;
