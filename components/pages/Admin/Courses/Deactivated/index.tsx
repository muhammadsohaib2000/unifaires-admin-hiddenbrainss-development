"use client";
import React, { Fragment, useEffect, useState } from "react";
// next components
// import NextLink from "next/link";
// antd components
import { Divider, Pagination, Typography } from "antd";
// app components
import CourseList from "./CourseList";
import Container from "@/components/shared/container";
import LearningMenu from "@/components/pages/Admin/Learning/LearningMenu";
import axiosInstance from "@/app/utils/axios-config";
import { handleAxiosError, handleError } from "@/app/utils/axiosError";
import StatList from "../StatList";

const DeactivatedCourses = () => {
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState<any>();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCourses, setTotalCourses] = useState(0);
  const [pageSize, setPageSize] = useState(6);

  const fetchCourses = async (page: any) => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(
        `/course/all?status=deactivate&&page=${page}&&limit=${pageSize}`
      );
      if (res.status) {
        const resData = res.data.data;
        // console.log("here", resData);
        setCourses(resData.courses);
        setTotalCourses(resData.count);
        setCurrentPage(resData.currentPage);
      }
    } catch (error) {
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Fragment>
      <section className="content-header">
        <Container className="container-fluid p-6">
          <Typography.Title level={2} className="mb-0">
            Deactivated Courses
          </Typography.Title>
          <Typography.Paragraph className="mb-0">
            All Courses in the deactivated sessions will not be available to the
            general public
          </Typography.Paragraph>
        </Container>
      </section>
      <nav>
        <Container className="container-fluid px-6">
          <LearningMenu activeKey="deactivate" />
        </Container>
      </nav>
      <section className="content-header">
        <Container className="container-fluid p-6">
          <StatList />
        </Container>
      </section>
      <section className="content-body">
        <Container className="container-fluid px-6 pb-6">
          <Divider className="mb-0" />
          <CourseList
            fetchCourses={fetchCourses}
            courseList={courses}
            setLoading={setLoading}
            loading={loading}
            currentPage={currentPage}
            setCourses={setCourses}
          />
          <div className="flex justify-center items-center mt-2">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={totalCourses}
              onChange={handlePageChange}
            />
          </div>
        </Container>
      </section>
    </Fragment>
  );
};

export default DeactivatedCourses;
