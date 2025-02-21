"use client";
import React, { Fragment, useState } from "react";
// next components
// import NextLink from "next/link";
// antd components
import { Card, Form, Steps, Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
// app components
import BillingAddress from "./BillingAddress";
import Payment from "./Payment";
import Preview from "./Preview";
import BasicInfo from "./BasicInfo";
import ReviewPost from "./ReviewPost";
import JobCategories from "./JobCategories";
import { showSuccess } from "@/app/utils/axiosError";
import { useRouter } from "next/navigation";

const CreateJobForm = () => {
  // const [form] = Form.useForm();
  const [selectedCard, setSelectedCard] = useState<any>();
  const [billingAddress, setBillingAddress] = useState<any>();
  const [totalPrice, setTotalPrice] = useState<any>();
  const router = useRouter();

  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const steps = [
    {
      title: "Enter Job Details",
      content: <BasicInfo next={next} />,
    },
    {
      title: "Categories",
      content: <JobCategories prev={prev} next={next} />,
    },
    {
      title: "Preview",
      content: <Preview next={next} prev={prev} />,
    },
    // {
    //   title: "Payment",
    //   content: (
    //     <Payment
    //       next={next}
    //       prev={prev}
    //       setTotalPrice={setTotalPrice}
    //       selectedCard={selectedCard}
    //       setSelectedCard={setSelectedCard}
    //     />
    //   ),
    // },
    // {
    //   title: "Billing Address",
    //   content: (
    //     <BillingAddress
    //       next={next}
    //       prev={prev}
    //       setBillingAddress={setBillingAddress}
    //     />
    //   ),
    // },
    // {
    //   title: "Review Post",
    //   content: (
    //     <ReviewPost
    //       next={next}
    //       prev={prev}
    //       billingAddress={billingAddress}
    //       totalPrice={totalPrice}
    //       selectedCard={selectedCard}
    //       setCurrent={setCurrent}
    //     />
    //   ),
    // },
  ];

  const onChange = (value: number) => {
    setCurrent(value);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  return (
    <Fragment>
      <Steps
        items={items}
        current={current}
        onChange={onChange}
        percent={((current + 1) / 3) * 100}
      />
      {/* <Button
        size="large"
        type="primary"
        className="flex items-center ml-auto mt-4"
      >
        Next
      </Button> */}
      <Card className="mt-8" title={steps[current].title}>
        <div>{steps[current].content}</div>
        <div className="steps-action flex justify-between items-center">
          {/* {current > 0 && (
            <Button size="large" onClick={() => prev()}>
              Previous
            </Button>
          )} */}
          {/* {current < steps.length - 1 && (
            <Button
              size="large"
              type="primary"
              className="ml-auto"
              onClick={() => next()}
            >
              Next
            </Button>
          )} */}
          {/* {current === steps.length - 1 && (
            <div className="flex ml-auto mt-1 ">
              <Button
                size="large"
                type="primary"
                icon={<PlusOutlined />}
                className="rounded-md flex items-center"
                onClick={() => {
                  showSuccess("Course Creation Complete!");
                  router.push("/dashboard/jobs");
                }}
              >
                Save
              </Button>
            </div>
          )} */}
        </div>
      </Card>
    </Fragment>
  );
};

export default CreateJobForm;
