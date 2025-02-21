"use client";
import React, { Fragment } from "react";
// ant components
import { List, Skeleton, Spin } from "antd";
import CourseItem from "./CourseItem";
import CourseSearchForm from "./CourseSearchForm";
//interface
import { CourseInt } from "./course.interface";
import { LoadingOutlined } from "@ant-design/icons";

export const courses = Array.from({ length: 20 }).map((_, index) => ({
  id: `${index}`,
  title: `Product of a rigorous system design  ${index}`,
  slug: `product-of-a-rigorous-system-design-${index}`,
  creator: "Samuel Jackson",
  students: 240,
  price: `${1 + index}5${index + 2}0`,
  rating: 4.5,
  ratingsCount: 550,
  organizationName: "unifaires",
  type: "free",
  instructors: [{}],
  meta: "",
  pricing: [],
  image: "/images/courses/laravel.jpg",
  description:
    "Ant Design, a design language for background applications, is refined by Ant UED Team.",
}));

const CourseList = ({
  coursesList,
  loading,
  setLoading,
  currentPage,
  fetchCourses,
  setCourses,
}: {
  coursesList: Array<CourseInt>;
  currentPage: any;
  setLoading: any;
  loading: any;
  fetchCourses: Function;
  setCourses: any;
}) => {
  return (
    <Fragment>
      <CourseSearchForm
        setLoading={setLoading}
        currentPage={currentPage}
        fetchCourses={fetchCourses}
        setCourses={setCourses}
      />
      <div className="bg-white rounded-lg pb-3">
        <Spin
          spinning={loading}
          indicator={
            <LoadingOutlined className="flex items-center justify-center text-5xl " />
          }
        >
          <List
            size="large"
            itemLayout="vertical"
            dataSource={coursesList ? coursesList : []}
            renderItem={(course) => (
              <CourseItem
                currentPage={currentPage}
                course={course}
                fetchCourses={fetchCourses}
              />
            )}
          />
        </Spin>
      </div>
    </Fragment>
  );
};

export default CourseList;
