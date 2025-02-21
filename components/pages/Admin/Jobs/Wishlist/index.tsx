"use client";
import React, { Fragment, useEffect, useState } from "react";
// next components
// import NextLink from "next/link";
// antd components
import { List, Typography } from "antd";
// app components
import JobsMenu from "../JobsMenu";
import JobSearchForm from "../JobSearchForm";
import Container from "@/components/shared/container";
import JobCard from "@/components/shared/cards/JobCard";
import { useSession } from "next-auth/react";
import axios from "axios";
import config from "@/app/utils/config";

const MyJobWishlist = () => {
  const { data: session, status } = useSession();
  const [jobList, setJobList] = useState();
  const fetchJob = async () => {
    await axios
      .get(`${config.API.API_URL}/jobs`, {
        headers: {
          "x-token": session?.user?.token,
        },
      })
      .then((res) => {
        setJobList(res.data.data);
        console.log(res.data);
      });
  };

  useEffect(() => {
    fetchJob();
  }, []);

  return (
    <Fragment>
      <section className="content-header">
        <Container className="p-6 container-fluid">
          <Typography.Title level={2} className="mb-0">
            Wishlist
          </Typography.Title>
          <Typography.Paragraph className="mb-0">
            Check out Organisations that are making the most impact on Funding,
            Grants, & Scholarships
          </Typography.Paragraph>
        </Container>
      </section>
      <nav className="mb-6">
        <Container className="px-6 container-fluid">
          <JobsMenu activeKey="wishlist" />
        </Container>
      </nav>
      <section className="content-body">
        <Container className="px-6 pb-6 container-fluid">
          <JobSearchForm />
          <List
            size="large"
            itemLayout="vertical"
            className="cursor-default [&>div.ant-list-pagination]:px-6 [&>div.ant-list-pagination]:pb-4"
            pagination={{
              onChange: (page) => {
                console.log(page);
              },
              pageSize: 5,
            }}
            dataSource={Array.isArray(jobList) ? jobList : []}
            // dataSource={coursesList}
            renderItem={(job) => <JobCard job={job} />}
          />
        </Container>
      </section>
    </Fragment>
  );
};

export default MyJobWishlist;
