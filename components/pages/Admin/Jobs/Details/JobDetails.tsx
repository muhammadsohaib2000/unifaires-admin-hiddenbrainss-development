"use client";
import React, { Fragment, useEffect, useState } from "react";
// next
import NextLink from "next/link";
// ants and icons
import { Typography, Breadcrumb, Avatar, Spin, Skeleton } from "antd";
import { BankOutlined } from "@ant-design/icons";
import { useParams, useRouter } from "next/navigation";
import { JobInt } from "../job.interface";

import Container from "@/components/shared/container";
import { Tabs } from "antd";
import type { TabsProps } from "antd";

import CandidatesList from "./components/CandidatesList";
import JobDetailsTab from "./components/JobDetailsTab";
import axiosInstance from "@/app/utils/axios-config";

import UserProfile from "./components/UserProfile";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import JobApplicantFilterForm from "./ApplicantFilterForm";
import { buildQuery } from "@/app/utils/buildQuery";

// icons and images

const JobDetail = () => {
  const dispatch: any = useAppDispatch();
  const [jobLoading, setJobLoading] = useState(false);
  const [job, setJob] = useState<JobInt>();
  const [veiwProfile, setViewProfile] = useState(false);
  const [candidateProifle, setCandidateProfile] = useState();
  const [applicantList, setApplicantList] = useState<any>();
  const [interviewingList, setInterviewingList] = useState<any>();
  const [acceptedList, setAcceptedList] = useState<any>();
  const [rejectedList, setRejectedList] = useState<any>();
  const [searchTerms, setSearchTerms] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [experienceLevel, setExperienceLevel] = useState<any>();
  const [skills, setSkills] = useState<any>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useParams();
  const jobId = params.slug;

  const fetchJobDetails = async () => {
    try {
      setJobLoading(true);
      const res = await axiosInstance.get(`/jobs/${params.slug}`);

      if (res.status) {
        // console.log(res.data);
        setJob(res?.data?.data);
      }
    } catch (error) {
      console.log("unable to fetch Jobs", error);
      // handleAxiosError(error);
    } finally {
      setJobLoading(false);
    }
  };

  const fetchApplicantList = async () => {
    try {
      setLoading(true);
      const query = buildQuery({
        firstname: searchTerms,
        lastname: searchTerms,
        country: country,
        skills: skills,
        experienceLevel: experienceLevel,
      });
      const res = await axiosInstance.get(
        `/jobs/user-job-applicants/${jobId}${query}`
      );

      console.log(res);

      if (res.status) {
        const dataRes = res.data.data;
        const jobEnrols = dataRes.applicants;
        const pending = jobEnrols.filter((j: any) => {
          if (j.jobUserStatus === "pending") {
            return j;
          }
          return null;
        });
        const interview = jobEnrols.filter((j: any) => {
          if (j.jobUserStatus === "interviewing") {
            return j;
          }
          return null;
        });
        const accepted = jobEnrols.filter((j: any) => {
          if (j.jobUserStatus === "accepted") {
            return j;
          }
          return null;
        });
        const rejected = jobEnrols.filter((j: any) => {
          if (j.jobUserStatus === "rejected") {
            return j;
          }
          return null;
        });
        setApplicantList(pending);
        setInterviewingList(interview);
        setAcceptedList(accepted);
        setRejectedList(rejected);
      }
    } catch (error) {
      console.log("fetching candidate error", error);
      // handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicantList();
  }, [searchTerms, country, skills, experienceLevel, jobId]);

  useEffect(() => {
    fetchJobDetails();
  }, [params]);

  const fetchCandidateProfile = async (candidateUsername: any) => {
    try {
      const res = await axiosInstance.get(
        `/users/profile/${candidateUsername}`
      );

      if (res.status) {
        setCandidateProfile(res.data.data);
      }
    } catch (error) {
      console.log("unable to fetch candidate profile", error);
      // handleAxiosError(error);
    }
  };

  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Unassigned Candidates (${
        applicantList ? applicantList.length : 0
      })`,
      children: (
        <CandidatesList
          listType="pending"
          fetchApplicantList={fetchApplicantList}
          applicantList={applicantList}
          setViewProfile={setViewProfile}
          fetchCandidateProfile={fetchCandidateProfile}
        />
      ),
    },
    {
      key: "2",
      label: "Job Details",
      children: <JobDetailsTab job={job} />,
    },
    {
      key: "3",
      label: `Interviewed (${interviewingList ? interviewingList.length : 0})`,
      children: (
        <CandidatesList
          listType="interviewing"
          fetchApplicantList={fetchApplicantList}
          applicantList={interviewingList}
          setViewProfile={setViewProfile}
          fetchCandidateProfile={fetchCandidateProfile}
        />
      ),
    },
    {
      key: "4",
      label: `Accepted (${acceptedList ? acceptedList.length : 0})`,
      children: (
        <CandidatesList
          listType="accepted"
          fetchApplicantList={fetchApplicantList}
          applicantList={acceptedList}
          setViewProfile={setViewProfile}
          fetchCandidateProfile={fetchCandidateProfile}
        />
      ),
    },
    {
      key: "5",
      label: `Rejected (${rejectedList ? rejectedList.length : 0})`,
      children: (
        <CandidatesList
          listType="rejected"
          fetchApplicantList={fetchApplicantList}
          applicantList={rejectedList}
          setViewProfile={setViewProfile}
          fetchCandidateProfile={fetchCandidateProfile}
        />
      ),
    },
  ];

  return (
    <Fragment>
      {!veiwProfile ? (
        <div>
          <section className="content-header">
            <Container fluid className="p-6">
              <Typography.Title level={2} className="mb-0">
                Jobs
              </Typography.Title>
              <Typography.Paragraph className="font-semibold ">
                Find, edit and delete jobs that you have posted for qualified
                candidates
              </Typography.Paragraph>
              <Breadcrumb
                items={[
                  { title: "Jobs", href: "/dashboard/jobs" },
                  { title: "Applicants" },
                ]}
                separator=">"
              />
            </Container>
          </section>
          <Skeleton active loading={jobLoading} className="p-4">
            <div className="m-6 p-4 rounded-md bg-gray-200 border border-purple-600">
              <div className="flex flex-row gap-4">
                <Typography.Title level={4}>{job?.title}</Typography.Title>
                <Typography.Paragraph className="text-sm text-purple-700 bg-gray-300 p-2 rounded-lg">
                  {job?.referenceNo}
                </Typography.Paragraph>
              </div>
              <div className="flex flex-row px-4 gap-4 mt-4">
                <div className="flex flex-row justify-center items-center">
                  <Avatar src={job?.mediaUrl} />
                  <Typography.Paragraph className="pt-4 pl-2">
                    {job?.organizationName}
                  </Typography.Paragraph>
                </div>
                <div className="flex flex-row">
                  <BankOutlined className="text-2xl text-purple-600" />
                  <Typography.Paragraph className="uppercase pt-4 pl-2">
                    {job?.state}, {job?.country}
                  </Typography.Paragraph>
                </div>
                {/* <div className="flex flex-row">
                <MoneyCollectOutlined className="text-2xl text-purple-600" />
                <Typography.Paragraph className="pt-4 pl-2">
                  Full time
                </Typography.Paragraph>
              </div>
              <div className="flex flex-row">
                <MoneyCollectOutlined className="text-2xl text-purple-600" />
                <Typography.Paragraph className="pt-4 pl-2">
                  Full time
                </Typography.Paragraph>
              </div> */}
              </div>
            </div>
            <div className="mx-6">
              <JobApplicantFilterForm
                setSearchTerms={setSearchTerms}
                setCountry={setCountry}
                setExperienceLevel={setExperienceLevel}
                setSkills={setSkills}
              />
            </div>
            <div className="m-6 mt-1">
              <Spin spinning={loading}>
                <Tabs
                  size="large"
                  defaultActiveKey="1"
                  items={items}
                  // onChange={onChange}
                  className="bg-white rounded-md px-4 pb-4"
                />
              </Spin>
            </div>
          </Skeleton>
        </div>
      ) : (
        <div>
          <section className="content-header">
            <Container fluid className="p-6">
              <Typography.Title level={2} className="mb-0">
                Jobs
              </Typography.Title>
              <Typography.Paragraph className="font-semibold ">
                Find, edit and delete jobs that you have posted for qualified
                candidates
              </Typography.Paragraph>
              <Breadcrumb
                items={[
                  { title: "Jobs", href: "/dashboard/jobs" },
                  {
                    title: "Applicants",
                    onClick: () => setViewProfile(false),
                    className: "hover:cursor-pointer",
                  },
                  { title: "Candidate Profile" },
                ]}
                separator=">"
              />
            </Container>
          </section>
          <div className="p-6">
            <UserProfile userInfo={candidateProifle} />
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default JobDetail;
