/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { Fragment, useEffect, useState } from "react";
import { Pagination, Spin, Typography } from "antd";
import ManageAccountsMenu from "../ManageAccounts/ManageAccountsMenu";
import Container from "@/components/shared/container";
import { handleAxiosError } from "@/app/utils/axiosError";
import axiosInstance from "@/app/utils/axios-config";
import FacilitatorApplicationList from "./MentorshipApplicationList";
import { LoadingOutlined } from "@ant-design/icons";

const ManageMentorApplications = () => {
  const [applicantList, setApplicantList] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalMentor, setTotalMentor] = useState(0);
  const [searchTerms, setSearchTerms] = useState<string>("");
  const [applicationStatus, setApplicationStatus] = useState<any>();

  const fetchApplications = async (page: any) => {
    const query = buildQuery({
      firstname: searchTerms,
      lastname: searchTerms,
      page,
      limit: pageSize,
      status: applicationStatus,
      email: searchTerms,
    });
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/mentorships${query}`);
      if (res.status) {
        const resData = res.data.data;

        const mentorship = resData.mentorship;
        const applicantsWithKey = mentorship.map((applicant: any) => {
          return {
            ...applicant,
            key: applicant.id,
          };
        });
        setApplicantList(applicantsWithKey);
        setCurrentPage(resData.currentPage);
        setTotalMentor(resData.count);
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
    fetchApplications(currentPage);
  }, [currentPage, searchTerms, applicationStatus]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Fragment>
      <section className="content-header">
        <Container className="p-6 container-fluid">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div className="flex-grow">
              <Typography.Title level={2} className="mb-0">
                Mentor Applications
              </Typography.Title>
              <Typography.Paragraph className="mb-0">
                Check out Organisations that are making the most impact on
                Funding, Grants, & Scholarships
              </Typography.Paragraph>
            </div>
            {/* <div className="shrink-0 flex gap-2">
              <NextLink
                href="/dashboard/manage-accounts/manage-permissions"
                passHref
              >
                <Button type="primary" size="large" className="rounded-md">
                  Manage permissions
                </Button>
              </NextLink>
              <NextLink href="/admin/users/create" passHref>
                <Button type="primary" size="large" className="rounded-md">
                  + Add user
                </Button>
              </NextLink>
            </div> */}
          </div>
        </Container>
      </section>
      <nav>
        <Container className="px-6 container-fluid">
          <ManageAccountsMenu activeKey="mentor-applications" />
        </Container>
      </nav>
      <section className="content-body">
        <Container className="px-6 pb-6 container-fluid">
          <Spin
            spinning={loading}
            indicator={
              <LoadingOutlined className="flex items-center justify-center text-4xl" />
            }
          >
            <FacilitatorApplicationList
              applicantList={applicantList}
              fetchApplications={fetchApplications}
              currentPage={currentPage}
              setSearchTerms={setSearchTerms}
              setApplicationStatus={setApplicationStatus}
            />
          </Spin>
          <div className="flex justify-center items-center mt-2">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={totalMentor}
              onChange={handlePageChange}
            />
          </div>
        </Container>
      </section>
    </Fragment>
  );
};

export default ManageMentorApplications;
