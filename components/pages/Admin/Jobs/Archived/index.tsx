/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";
import { List, Pagination, Skeleton, Typography } from "antd";
import JobsMenu from "../JobsMenu";
import JobSearchForm from "../JobSearchForm";
import Container from "@/components/shared/container";
import JobCard from "@/components/shared/cards/JobCard";
import axiosInstance from "@/app/utils/axios-config";
import { handleAxiosError } from "@/app/utils/axiosError";
import JobStatsCard from "../JobStatsCard";

const MyJobArchives = () => {
  const [jobList, setJobList] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [loading, setLoading] = useState(true);
  const [searchTerms, setSearchTerms] = useState();
  const [businessId, setBusinessId] = useState();

  const fetchJob = async (page: any) => {
    try {
      setLoading(true);
      const query = buildQuery({ title: searchTerms, page, limit: pageSize });
      const res = await axiosInstance.get(`/jobs/all${query}&&status=archive`);
      if (res.status) {
        const resData = res.data.data;
        setJobList(resData.jobs);
        setTotalJobs(resData.count);
        setCurrentPage(resData.currentPage);
      }
    } catch (error) {
      handleAxiosError(error);
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
  }, [currentPage, searchTerms]);

  const handlePageChange = (page: any) => {
    console.log("here is page number", page);
    setCurrentPage(page);
  };
  return (
    <>
      <section className="content-header">
        <Container className="p-6 container-fluid">
          <Typography.Title level={2} className="mb-0">
            Archived Jobs
          </Typography.Title>
          <Typography.Paragraph className="mb-0">
            Check out Organisations that are making the most impact on Funding,
            Grants, & Scholarships
          </Typography.Paragraph>
        </Container>
      </section>
      <section className="content-header">
        <Container className="p-6 container-fluid">
          <JobStatsCard />
        </Container>
      </section>
      <nav className="mb-6">
        <Container className="px-6 container-fluid">
          <JobsMenu activeKey="archived" />
        </Container>
      </nav>
      <section className="content-body">
        <Container className="px-6 pb-6 container-fluid">
          <JobSearchForm
            setBusinessId={setBusinessId}
            setSearchTerms={setSearchTerms}
          />
          <Skeleton active loading={loading}>
            <List
              size="large"
              itemLayout="vertical"
              dataSource={Array.isArray(jobList) ? jobList : []}
              renderItem={(job: any) => (
                <JobCard
                  archive={true}
                  fetchJob={fetchJob}
                  job={job}
                  currentPage={currentPage}
                  menuTitle="archived"
                />
              )}
            />
          </Skeleton>
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
    </>
  );
};

export default MyJobArchives;
