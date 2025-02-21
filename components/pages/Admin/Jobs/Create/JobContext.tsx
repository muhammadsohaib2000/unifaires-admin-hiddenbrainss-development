"use client";
import React, { createContext, useEffect, useState } from "react";
import config from "@/app/utils/config";
import { useSession } from "next-auth/react";
import CreateJobForm from "@/components/pages/Admin/Jobs/Create/JobSteps";
import axios from "axios";
import { JobInt } from "../job.interface";
import axiosInstance from "@/app/utils/axios-config";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export interface JobContextType {
  jobData: JobInt | any;
  fetchJobData: Function;
}

export const JobContext = createContext({} as JobContextType);

export const JobProvider = ({ jobId }: any) => {
  const { data: session, status } = useSession();
  const [jobData, setJobData] = useState<JobInt | null>();
  const [loading, setLoading] = useState(false);

  const fetchJobData = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/jobs/${jobId}`);
      if (res.status) {
        if (res.status) {
          const data = res;
          setJobData(data.data);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobData();
  }, [jobId]);

  return (
    <JobContext.Provider value={{ jobData, fetchJobData }}>
      {/* {children} */}
      <Spin
        spinning={loading}
        indicator={
          <LoadingOutlined className="flex items-center justify-center text-5xl" />
        }
      >
        <CreateJobForm />
      </Spin>
    </JobContext.Provider>
  );
};
