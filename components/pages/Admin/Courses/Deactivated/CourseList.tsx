"use client";
import { useState } from "react";
import {
  Button,
  Col,
  Dropdown,
  List,
  MenuProps,
  Row,
  Space,
  Spin,
  message,
} from "antd";
// App components
import NextLink from "next/link";
import SearchForm from "./SearchForm";
import {
  EllipsisOutlined,
  UserOutlined,
  UsergroupAddOutlined,
  StarFilled,
  EditOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import IconText from "@/components/shared/IconText";
import Image from "next/image";
import axiosInstance from "@/app/utils/axios-config";
import {
  handleAxiosError,
  handleError,
  showSuccess,
} from "@/app/utils/axiosError";
import { useRouter } from "next/navigation";

const CourseList = ({
  courseList,
  loading,
  setLoading,
  currentPage,
  fetchCourses,
  setCourses,
}: any) => {
  const [courseId, setCourseId] = useState<any>();
  const router = useRouter();

  /**
   * Get JSON parse object
   */
  function getJSONParse(inputStr: any = undefined) {
    try {
      return JSON.parse(inputStr);
    } catch (error) {
      return undefined;
    }
  }

  const handleDelete = async () => {
    try {
      const response = await axiosInstance.delete(`/course/${courseId}`);
      if (response.status) {
        // fetchCourses();
        message.success("Course deleted successfully");
      }
    } catch (error) {
      handleAxiosError(error);
      handleError(error);
      console.log("An error occured while deleting the course", error);
    }
  };

  const handleEdit = () => {
    router.push(`/dashboard/courses/withvideos/${courseId}`);
  };

  const handleViewCourse = () => {
    router.push(`/dashboard/view-course/${courseId}`);
  };

  const handleActivateCourse = async () => {
    try {
      setLoading(true);
      const activate = await axiosInstance.put(`/course/${courseId}`, {
        status: "active",
      });

      if (activate.status) {
        showSuccess("Course Activated");
        fetchCourses(currentPage);
      }
    } catch (error) {
      handleAxiosError(error);
      console.log("Error activating course", error);
    } finally {
      setLoading(false);
    }
  };

  const items: MenuProps["items"] = [
    {
      label: (
        <IconText text="Edit" title="Edit course" icon={<EditOutlined />} />
      ),
      key: "edit",
      onClick: handleEdit,
    },
    {
      label: (
        <IconText text="View" title="View Course" icon={<EyeOutlined />} />
      ),
      key: "view",
      onClick: handleViewCourse,
    },
    {
      label: (
        <IconText
          text="activate"
          title="Activate Course"
          icon={<EyeInvisibleOutlined />}
          className="text-accent-500"
        />
      ),
      key: "activate",
      onClick: handleActivateCourse,
    },
  ];

  return (
    <>
      <SearchForm
        setLoading={setLoading}
        currentPage={currentPage}
        fetchCourses={fetchCourses}
        setCourses={setCourses}
      />
      <Spin
        spinning={loading}
        indicator={
          <LoadingOutlined className="flex items-center justify-center text-5xl" />
        }
      >
        <div className="bg-white rounded-lg pb-3">
          <List
            size="large"
            itemLayout="vertical"
            dataSource={Array.isArray(courseList) ? courseList : []}
            renderItem={(course: any) => {
              const courseImage = course?.image
                ? course.image
                : getJSONParse(course?.meta)?.image;
              return (
                <List.Item
                  className="flex gap-4"
                  key={`course-item-${course?.id}`}
                >
                  <NextLink href={`/dashboard/courses/${course?.id}`} passHref>
                    <span className="rounded-lg overflow-hidden w-24 h-20">
                      <Image
                        alt="logo"
                        width={96}
                        height={80}
                        objectFit="cover"
                        src={courseImage}
                      />
                    </span>
                  </NextLink>
                  <div className="flex-grow">
                    <div className="flex items-start justify-between">
                      <NextLink
                        passHref
                        href={`/dashboard/courses/${course?.id}`}
                        className="text-grey-900 hover:text-purple-500 font-semibold text-base flex-grow"
                      >
                        {course.title}
                      </NextLink>
                      <Dropdown
                        menu={{ items }}
                        trigger={["click"]}
                        placement="bottomRight"
                        overlayClassName="p-2 rounded-lg"
                      >
                        <Button
                          type="text"
                          shape="circle"
                          onClick={() => setCourseId(course?.id)}
                          icon={<EllipsisOutlined rotate={90} />}
                        />
                      </Dropdown>
                    </div>
                    <Space className="gap-3 flex-wrap mb-2">
                      <IconText
                        title="course author"
                        text={course?.organizationName}
                        icon={<UserOutlined />}
                      />
                      <IconText
                        title="students"
                        text={`${
                          !Number.isNaN(parseInt(course?.students))
                            ? parseInt(course.students)
                            : "0"
                        } students`}
                        icon={<UsergroupAddOutlined />}
                      />
                      <IconText
                        title="ratings"
                        text={4.5}
                        icon={<StarFilled className="text-yellow-500" />}
                      />
                    </Space>
                  </div>
                </List.Item>
              );
            }}
          />
        </div>
      </Spin>
    </>
  );
};

export default CourseList;
