"use client";
import { EditOutlined, LoadingOutlined } from "@ant-design/icons";
import { CountryListOption } from "@/components/shared/CountryList/countryList";
import axiosInstance from "@/app/utils/axios-config";
import { handleAxiosError } from "@/app/utils/axiosError";
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  Spin,
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

const BusinessJobPosting = () => {
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState("");
  const [loading, setLoading] = useState(false);
  const [editedText, setEditedText] = useState<{ [key: string]: string }>({});
  const [businessList, setBusinessList] = useState<any>();
  const [businessDiscount, setBusinessDiscount] = useState<any>();
  const [fetchingBusiness, setFetchingBusiness] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalBusiness, setTotalBusiness] = useState(0);
  const [searchTerms, setSearchTerms] = useState<string>("");

  const fetchAllBusiness = async (page: any) => {
    const query = buildQuery({
      companyName: searchTerms,
      page,
      limit: pageSize,
    });
    try {
      setFetchingBusiness(true);
      const res = await axiosInstance.get(`/admin/business${query}`);
      if (res.status) {
        const resData = res.data.data;
        setBusinessList(resData.results);
        setCurrentPage(resData.currentPage);
        setTotalBusiness(resData.count);
        // console.log(res);
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setFetchingBusiness(false);
    }
  };

  const buildQuery = (params: { [key: string]: any }) => {
    const query = Object.entries(params)
      .filter(
        ([_, value]) => value !== undefined && value !== null && value !== ""
      )
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join("&");
    return query ? `?${query}` : "";
  };

  const fetchBusinessDiscount = () => {
    axiosInstance
      .get("/job-business-pricing")
      .then((res) => {
        setBusinessDiscount(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchBusinessDiscount();
  }, []);

  useEffect(() => {
    fetchAllBusiness(currentPage);
  }, [currentPage, searchTerms]);

  const handleEditClick = (code: string, currentText: string) => {
    setEditedText((prevData) => ({
      ...prevData,
      [code]: currentText,
    }));
    setIsEditing(code);
  };

  const handleSaveClick = async (id: any) => {
    setLoading(true);

    await axiosInstance
      .post("/job-business-pricing", {
        businessId: id,
        discount: editedText[id],
      })
      .then((res) => {
        message.success("Discount added successfully");

        fetchBusinessDiscount();
      })
      .catch((error) => {
        handleAxiosError(error);
        console.log("here is the error", error);
      });
    setLoading(false);
    setIsEditing("");
  };

  const handleUpdatePricing = async (id: any) => {
    const business: any = businessDiscount.find(
      (b: any) => b.businessId === id
    );
    const discountId = business.id;
    setLoading(true);
    await axiosInstance
      .put(`/job-business-pricing/${discountId}`, {
        discount: editedText[id],
      })
      .then((res) => {
        message.success("Discount updated successfully");
        fetchBusinessDiscount();
      })
      .catch((error) => {
        handleAxiosError(error);
        console.log("here is the error", error);
      });
    setLoading(false);
    setIsEditing("");
  };

  const getDiscountForBusiness = (businessId: any) => {
    if (!businessDiscount || !Array.isArray(businessDiscount)) {
      // Handle the case when currentPricingIndex is not defined or not an array
      return "N/A";
    }
    const business = businessDiscount.find((b) => b.businessId === businessId);
    return business ? `${business.discount}%` : "N/A";
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Name of Organization",
      dataIndex: "companyName",
      key: "name",
      fixed: "left",
      width: 100,
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Business Type",
      dataIndex: "businessType",
      key: "businessType",
      width: 100,
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Discount(%)",
      dataIndex: "id",
      key: "Discount",
      render: (id) => (
        <div>
          {isEditing === id ? (
            <div className="flex flex-row items-center gap-2">
              <Input
                type="number"
                value={editedText[id]}
                onChange={(e) =>
                  setEditedText({ ...editedText, [id]: e.target.value })
                }
                className="w-20"
              />
              {getDiscountForBusiness(id) !== "N/A" ? (
                <Button
                  type="primary"
                  onClick={() => handleUpdatePricing(id)}
                  loading={loading}
                >
                  Update
                </Button>
              ) : (
                <Button
                  type="primary"
                  onClick={() => handleSaveClick(id)}
                  loading={loading}
                >
                  Save
                </Button>
              )}
            </div>
          ) : (
            <div className="flex flex-row items-center gap-4">
              <Typography.Paragraph>
                {getDiscountForBusiness(id)}
              </Typography.Paragraph>
              <Button
                type="text"
                size="small"
                shape="circle"
                icon={<EditOutlined />}
                className="-mt-4"
                onClick={() => handleEditClick(id, editedText[id] || "")}
              />
            </div>
          )}
        </div>
      ),
      width: 100,
    },
  ];

  return (
    <Fragment>
      {/* Search */}
      <div>
        <Form form={form} className="pb-6">
          <Form.Item className="mb-0">
            <Input.Search
              size="large"
              placeholder="Search Organization and Groups"
              onChange={(e) => setSearchTerms(e.target.value)}
            />
          </Form.Item>
        </Form>
      </div>
      <div>
        <Spin
          spinning={fetchingBusiness}
          indicator={
            <LoadingOutlined className="flex items-center justify-center text-5xl" />
          }
        >
          <Table
            columns={columns}
            dataSource={businessList}
            scroll={{ x: 200 }}
          />
        </Spin>
      </div>
    </Fragment>
  );
};

export default BusinessJobPosting;
