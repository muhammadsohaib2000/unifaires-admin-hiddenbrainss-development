"use client";
import React, { Fragment, useEffect, useState } from "react";
// next components
// import NextLink from "next/link";
// antd components
import { Card, Form } from "antd";
// app components
import BasicInfo from "./BasicInfo";
import JobCategories from "./JobSteps/JobCategories";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const CreateJobForm = () => {
  const [form] = Form.useForm();
  const [current, setCurrent] = useState(0);
  const [requestBody, setRequestBody] = useState();
  const myProfile = useSelector((state: RootState) => state?.user?.myProfile);
  const { jobCategories } = useSelector((state: RootState) => state.jobCategory);

  const next = () => {
    form.validateFields().then(() => {
      setCurrent(current + 1);
    });
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const steps = [
    {
      title: "Enter Job Details",
      content: (
        <BasicInfo
          next={next}
          requestBody={requestBody}
          setRequestBody={setRequestBody}
          current={current}
        />
      ),
    },
    {
      title: "Categories",
      content: <JobCategories prev={prev} requestBody={requestBody} next={next} />,
    },
  ];

  // const items = steps.map((item) => ({ key: item.title, title: item.title }));

  return (
    <Fragment>
      <Card className="mt-8" title={steps[current].title}>
        <div>{steps[current].content}</div>
      </Card>
    </Fragment>
  );
};

export default CreateJobForm;
