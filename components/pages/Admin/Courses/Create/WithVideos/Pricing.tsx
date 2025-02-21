"use client";
import React, { Fragment, useState, useContext, useEffect } from "react";
// next components
// import NextLink from "next/link";
// antd components
import {
  Col,
  RadioChangeEvent,
  Radio,
  Row,
  Space,
  InputNumber,
  Typography,
  Select,
  Form,
  Button,
  Input,
  message,
  Checkbox,
} from "antd";
import Container from "@/components/shared/container";
import config from "@/app/utils/config";
import { useSession } from "next-auth/react";
import { CourseContext } from "../CourseContext";
import axios from "axios";
import { handleAxiosError, showSuccess } from "@/app/utils/axiosError";
import axiosInstance from "@/app/utils/axios-config";
import { toast } from "react-toastify";

const Pricing = () => {
  const { data: session, status } = useSession();
  const [form] = Form.useForm();
  const { courseData, fetchCourseData } = useContext<any>(CourseContext);
  const [value, setValue] = useState<number>(0);
  const [radioValue, setRadioValue] = useState(1);
  const [showPaidOptions, setShowPaidOptions] = useState(false);
  const [discountedPrice, setDiscountedPrice] = useState<number>();
  const [selectedDiscount, setSelectedDiscount] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [loading, setLoading] = useState(false);
  const onCurrencyChange = (value: string) => {
    setSelectedCurrency(value);
  };

  const courseId = courseData?.data?.id;

  useEffect(() => {
    if (courseData?.data?.pricing && courseData.data.pricing.type === "paid") {
      setRadioValue(2);
      setShowPaidOptions(true);
      const amount = parseInt(courseData.data.pricing.amount, 10);
      form.setFieldsValue(courseData.data.pricing);
      form.setFieldValue("amount", amount);
    } else {
      setRadioValue(1);
      setShowPaidOptions(false);
    }
  }, [courseData]);

  const onChange = (e: RadioChangeEvent) => {
    setRadioValue(e.target.value);
    setShowPaidOptions(e.target.value === 2);
  };
  const onSelectChange = (value: string) => {
    setSelectedDiscount(value);
  };
  const onPriceChange = (value: any) => {
    const newPrice = parseFloat(`${value}`);
    setValue(newPrice);
    const discount = parseFloat(selectedDiscount); // Get the selected discount value (example: 10%)
    const discountPrice = newPrice - (newPrice * discount) / 100; // Calculate the discounted price

    setDiscountedPrice(discountPrice);
  };
  const handleDiscount = () => {
    const price = value; // Get the entered price value
    const discount = parseFloat(selectedDiscount); // Get the selected discount value (example: 10%)
    const discountPrice = price - (price * discount) / 100; // Calculate the discounted price

    setDiscountedPrice(discountPrice);
  };

  const handleSavePrice = async () => {
    if (!radioValue) {
      handleDiscount();
    }
    const pricingData = {
      type: radioValue === 1 ? "free" : "paid",
      currency: radioValue === 1 ? "Free" : selectedCurrency,
      amount: radioValue === 1 ? 0 : value,
      discount: radioValue === 1 ? 0 : parseFloat(selectedDiscount),
    };

    try {
      setLoading(true);

      const res = await axiosInstance.post("/pricing", {
        ...pricingData,
        courseId: courseId,
      });

      if (res.status) {
        showSuccess("Price Added Succesfully");
        fetchCourseData();
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <section className="content-header">
        <Container>
          <div>
            <Typography.Paragraph>Course Price Tier</Typography.Paragraph>
            <Typography.Paragraph>
              Please select the price tag for your course and click
              &apos;Apply&apos;. The list price that student will see in other
              currencies is determined by using the pricing tag matrix.
            </Typography.Paragraph>
            <Typography.Paragraph>
              If you intend to to offer your courses for free, the total length
              of video content must be less than 2 hours.
            </Typography.Paragraph>
          </div>
          <div>
            <Radio.Group
              onChange={onChange}
              defaultValue={1}
              value={radioValue}
            >
              <Space direction="vertical">
                <Radio value={1}>Free</Radio>
                <Radio value={2}>Paid</Radio>
              </Space>
            </Radio.Group>
          </div>
          {showPaidOptions && (
            <div className="mt-6">
              <Form form={form} layout="horizontal">
                <Row>
                  <Col className="mr-6">
                    <Form.Item name="currency">
                      <Select
                        size="large"
                        showSearch
                        placeholder="Currency"
                        optionFilterProp="children"
                        onChange={onCurrencyChange}
                        filterOption={(input, option) =>
                          (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        options={[
                          {
                            value: "USD",
                            label: "USD",
                          },
                          // {
                          //   value: "NGN",
                          //   label: "NGN",
                          // },
                        ]}
                      />
                    </Form.Item>
                  </Col>
                  <Col className="mr-6">
                    <Form.Item name="amount">
                      <Space>
                        <InputNumber
                          size="large"
                          min={1}
                          max={100000}
                          placeholder="Enter Price"
                          onChange={onPriceChange}
                        />
                      </Space>
                    </Form.Item>
                  </Col>
                  <Col className="mr-6">
                    <Form.Item name="discount">
                      <Select
                        size="large"
                        showSearch
                        placeholder="Discount"
                        optionFilterProp="children"
                        onChange={onSelectChange}
                        filterOption={(input, option) =>
                          (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        options={[
                          {
                            value: "0",
                            label: "0%",
                          },
                          {
                            value: "10",
                            label: "10%",
                          },
                          {
                            value: "20",
                            label: "20%",
                          },
                          {
                            value: "30",
                            label: "30%",
                          },
                          {
                            value: "40",
                            label: "40%",
                          },
                          {
                            value: "50",
                            label: "50%",
                          },
                          {
                            value: "60",
                            label: "60%",
                          },
                        ]}
                      />
                    </Form.Item>
                  </Col>

                  <Col lg={4} className="mr-6">
                    <Form.Item>
                      <Input
                        size="large"
                        min={1}
                        max={100000}
                        disabled={true}
                        value={discountedPrice}
                        placeholder="Current Price"
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </div>
          )}

          <Button
            size="large"
            type="primary"
            className="rounded-md flex ml-auto items-center"
            // className="rounded-md flex items-center"
            onClick={handleSavePrice}
            loading={loading}
          >
            Apply Pricing
          </Button>

          {/* <Button
            size="large"
            type="primary"
            className="rounded-md flex ml-auto items-center"
            onClick={handleSavePrice}
            loading={loading}
          >
            Save Price
          </Button> */}
        </Container>
      </section>
    </Fragment>
  );
};

export default Pricing;
