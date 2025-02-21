/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { Fragment, useEffect, useState } from "react";
// next components
import NextLink from "next/link";
// antd components
import { Button, Typography, List, Pagination, Skeleton, Spin } from "antd";
// app components
import JobsMenu from "./JobsMenu";
import JobSearchForm from "./JobSearchForm";
import Container from "@/components/shared/container";
import JobCard from "@/components/shared/cards/JobCard";
import axiosInstance from "@/app/utils/axios-config";
import { handleAxiosError } from "@/app/utils/axiosError";
import JobStatsCard from "./JobStatsCard";
import { LoadingOutlined } from "@ant-design/icons";

const Jobs = () => {
  const [jobList, setJobList] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(true);
  const [searchTerms, setSearchTerms] = useState();
  const [businessId, setBusinessId] = useState();

  const fetchJob = async (page: any) => {
    try {
      setLoading(true);

      const query = buildQuery({
        title: searchTerms,
        page,
        limit: pageSize,
        businessId: businessId,
        status: "opened",
      });

      const res = await axiosInstance.get(`/jobs/all${query}`);
      // const res = await axiosInstance.get("/jobs/user");

      if (res.status) {
        setLoading(false);
        const resData = res.data.data;
        setJobList(resData.jobs);
        setTotalJobs(resData.count);
        setCurrentPage(resData.currentPage);
      }
    } catch (error) {
      console.log(error);
      // handleAxiosError(error);
    } finally {
      setLoading(false);
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

  useEffect(() => {
    fetchJob(currentPage);
  }, [searchTerms, currentPage, businessId]);

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  return (
    <Fragment>
      <section className="content-header">
        <Container className="p-6 container-fluid">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div className="flex-grow">
              <Typography.Title level={2} className="mb-0">
                My Jobs
              </Typography.Title>
              <Typography.Paragraph className="mb-0">
                Find, edit and delete jobs you have posted for qualified
                candidates
              </Typography.Paragraph>
            </div>
            <NextLink href="/dashboard/jobs/create" passHref>
              <Button type="primary" size="large" className="rounded-md">
                + Create job
              </Button>
            </NextLink>
          </div>
        </Container>
      </section>
      <section className="content-header">
        <Container className="p-6 container-fluid">
          <JobStatsCard />
        </Container>
      </section>
      <nav className="mb-6">
        <Container className="px-6 container-fluid">
          <JobsMenu activeKey="my-jobs" />
        </Container>
      </nav>
      <section className="content-body">
        <Container className="px-6 pb-6 container-fluid">
          <JobSearchForm
            setBusinessId={setBusinessId}
            setSearchTerms={setSearchTerms}
          />
          <Spin
            indicator={
              <LoadingOutlined className="flex items-center justify-center text-5xl" />
            }
            spinning={loading}
          >
            <List
              size="large"
              itemLayout="vertical"
              className="cursor-default [&>div.ant-list-pagination]:px-6 [&>div.ant-list-pagination]:pb-4"
              dataSource={Array.isArray(jobList) ? jobList : []}
              renderItem={(job) => (
                <JobCard
                  fetchJob={fetchJob}
                  job={job}
                  currentPage={currentPage}
                />
              )}
            />
          </Spin>
          <div className="flex justify-center items-center">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={totalJobs}
              onChange={handlePageChange}
              className="flex ml-auto pt-4"
            />
          </div>
        </Container>
      </section>
    </Fragment>
  );
};

export default Jobs;
