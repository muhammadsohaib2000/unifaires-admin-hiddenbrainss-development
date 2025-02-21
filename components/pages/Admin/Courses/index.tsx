/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useState, useEffect } from "react";
import NextLink from "next/link";
// antd components
import { Button, Divider, Pagination, Typography } from "antd";
//interface
import { CourseInt } from "./course.interface";
// app components
import StatList from "./StatList";
import CourseList from "./CourseList";
import LearningMenu from "../Learning/LearningMenu";
import Container from "@/components/shared/container";
import { useSession } from "next-auth/react";
import axiosInstance from "@/app/utils/axios-config";

const Courses = () => {
  const [userName, setUserName] = useState<string>();
  const { data: session } = useSession();
  const [courses, setCourses] = useState<CourseInt[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCourses, setTotalCourses] = useState(0);
  const [pageSize, setPageSize] = useState(6);
  const [loading, setLoading] = useState(false);

  const fetchCourses = async (page: any) => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(
        `/course/all?status=active&&page=${page}&&limit=${pageSize}`
      );

      if (res.status) {
        const resData = res.data.data;
        setCourses(resData.courses);
        setTotalCourses(resData.count);
        setCurrentPage(resData.currentPage);
        // setCourses(res.data.data.courses);
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

  useEffect(() => {
    const name = session?.user?.fullname;
    setUserName(name);
  }, [session]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <section className="content-header">
        <Container className="container-fluid p-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div className="flex-grow">
              <Typography.Title level={2} className="mb-0">
                My Courses
              </Typography.Title>
              <Typography.Paragraph className="mb-0">
                Welcome {userName}, here are your daily analytics
              </Typography.Paragraph>
            </div>
            <NextLink href="/dashboard/courses/create" passHref>
              <Button type="primary" size="large" className="rounded-md">
                Create course
              </Button>
            </NextLink>
          </div>
        </Container>
      </section>
      <nav>
        <Container className="container-fluid px-6">
          <LearningMenu activeKey="published-courses" />
        </Container>
      </nav>
      <section className="content-header">
        <Container className="container-fluid p-6">
          <StatList />
        </Container>
      </section>
      <section className="content-body">
        <Container className="container-fluid px-6 pb-6">
          <Divider className="my-0" />
          <CourseList
            coursesList={courses}
            setLoading={setLoading}
            loading={loading}
            currentPage={currentPage}
            fetchCourses={fetchCourses}
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
    </>
  );
};

export default Courses;
