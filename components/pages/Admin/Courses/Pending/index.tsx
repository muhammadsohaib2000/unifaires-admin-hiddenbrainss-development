"use client";
import { useEffect, useState } from "react";
import { Pagination, Typography } from "antd";
import CourseList from "./CourseList";
import Container from "@/components/shared/container";
import LearningMenu from "@/components/pages/Admin/Learning/LearningMenu";
import axiosInstance from "@/app/utils/axios-config";
import { handleAxiosError } from "@/app/utils/axiosError";
import StatList from "../StatList";

const PendingPage = () => {
  const [courses, setCourses] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCourses, setTotalCourses] = useState(0);
  const pageSize = 10;
  const [loading, setLoading] = useState(false);

  const fetchCourses = async (page: any) => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/course/all`, {
        params: { status: "pending", page, limit: pageSize },
      });
      if (res?.data?.data) {
        const courseArr = Array.isArray(res.data.data?.courses)
          ? res.data.data.courses
          : [];
        const count = !Number.isNaN(parseInt(res.data.data?.count))
          ? parseInt(res.data.data.count)
          : 0;
        const currPage = !Number.isNaN(parseInt(res.data.data?.currentPage))
          ? parseInt(res.data.data.currentPage)
          : 0;
        setCourses(courseArr);
        setTotalCourses(count);
        setCurrentPage(currPage);
      }
    } catch (error) {
      handleAxiosError(error);
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
    <>
      <section className="content-header">
        <Container className="container-fluid p-6">
          <Typography.Title level={2} className="mb-0">
            Waiting for approval
          </Typography.Title>
          <Typography.Paragraph className="mb-0">
            Check out Organisations that are making the most impact on Funding,
            Grants, & Scholarships
          </Typography.Paragraph>
        </Container>
      </section>
      <nav>
        <Container className="container-fluid px-6">
          <LearningMenu activeKey="pending" />
        </Container>
      </nav>
      <section className="content-header">
        <Container className="container-fluid p-6">
          <StatList />
        </Container>
      </section>
      <section className="content-body">
        <Container className="container-fluid px-6 pb-6">
          <CourseList
            fetchCourses={fetchCourses}
            coursesList={courses}
            currentPage={currentPage}
            setCourses={setCourses}
            loading={loading}
            setLoading={setLoading}
          />
          <div className="flex justify-center items-center mt-2">
            {typeof totalCourses === "number" && totalCourses > 0 ? (
              <>
                <Pagination
                  current={currentPage}
                  pageSize={pageSize}
                  total={totalCourses}
                  onChange={handlePageChange}
                />
              </>
            ) : (
              <></>
            )}
          </div>
        </Container>
      </section>
    </>
  );
};

export default PendingPage;
