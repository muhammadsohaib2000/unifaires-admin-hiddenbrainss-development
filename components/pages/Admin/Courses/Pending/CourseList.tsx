"use client";
import { List, Spin } from "antd";
import PendingSearchForm from "./PendingSearchForm";
import PendingItems from "./PendingItems";
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
    <>
      <PendingSearchForm
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
              <PendingItems
                currentPage={currentPage}
                course={course}
                fetchCourses={fetchCourses}
              />
            )}
          />
        </Spin>
      </div>
    </>
  );
};

export default CourseList;
