"use client";
import React, { Fragment } from "react";
// ant components
import { Col, List, Row, Skeleton, Spin } from "antd";
// App components
import { courses } from "../CourseList";
import ArchiveSearchForm from "./ArchiveSearchForm";
import ArchiveItems from "./ArchiveItems";
import { LoadingOutlined } from "@ant-design/icons";

const CourseList = ({
  coursesList,
  fetchCourses,
  setCourses,
  currentPage,
  loading,
  setLoading,
}: any) => {
  return (
    <Fragment>
      <ArchiveSearchForm
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
            className="[&>div.ant-list-pagination]:px-6 [&>div.ant-list-pagination]:pb-4"
            dataSource={coursesList ? coursesList : []}
            renderItem={(course) => (
              <ArchiveItems
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
