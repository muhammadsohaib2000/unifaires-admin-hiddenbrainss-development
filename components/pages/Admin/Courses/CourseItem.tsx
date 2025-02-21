"use client";
import React from "react";
// next components
import Image from "next/image";
import NextLink from "next/link";
// ant components and icons
import {
  Button,
  MenuProps,
  List,
  Space,
  Dropdown,
  message,
  Typography,
} from "antd";
import {
  StarFilled,
  UserOutlined,
  EditOutlined,
  DeleteOutlined,
  ShareAltOutlined,
  EllipsisOutlined,
  UsergroupAddOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  BookOutlined,
} from "@ant-design/icons";
// app components
import IconText from "@/components/shared/IconText";
// interface and types
import config from "@/app/utils/config";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { CourseInt } from "./course.interface";
import axiosInstance from "@/app/utils/axios-config";
import { toast } from "react-toastify";
import {
  handleAxiosError,
  handleError,
  showSuccess,
} from "@/app/utils/axiosError";

interface CourseItemProps {
  course: CourseInt;
  currentPage: any;
  fetchCourses: Function;
}

const CourseItem = ({ course, fetchCourses, currentPage }: CourseItemProps) => {
  const { data: session, status } = useSession();
  const courseVideo =
    course && course.video ? course.video : JSON.parse(course.meta).video;
  const courseImage =
    course && course.image ? course.image : JSON.parse(course.meta).image;
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const response = await axiosInstance.delete(`/course/${course.id}`);
      if (response.status) {
        fetchCourses(currentPage);
        showSuccess("Course deleted successfully");
      }
    } catch (error) {
      handleAxiosError(error);
    }
  };

  const handleEdit = () => {
    router.push(`/dashboard/courses/withvideos/${course.id}`);
  };

  const handleViewCourse = () => {
    router.push(`/dashboard/view-course/${course.id}`);
  };

  const handleDeactivateCourse = async () => {
    try {
      const deactivate = await axiosInstance.put(`/course/${course.id}`, {
        status: "deactivate",
      });

      if (deactivate.status) {
        toast.success("Course Deactivated");
        fetchCourses();
      }
    } catch (error) {
      handleAxiosError(error);
      handleError(error);
      console.log("Error deactivating course", error);
    }
  };

  const handleArchive = async () => {
    try {
      const res = await axiosInstance.put(`/course/${course.id}`, {
        status: "archive",
      });
      if (res.status) {
        showSuccess("Archived Successfully");
        fetchCourses(currentPage);
      }
    } catch (error) {
      console.log("error archiving", error);
      handleAxiosError(error);
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
        <IconText
          text="Archive"
          title="Archive  course"
          icon={<BookOutlined />}
        />
      ),
      key: "archive",
      onClick: handleArchive,
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
          text="Deactivate"
          title="Deactivate Course"
          icon={<EyeInvisibleOutlined />}
          className="text-accent-500"
        />
      ),
      key: "deactivate",
      onClick: handleDeactivateCourse,
    },
    {
      label: (
        <IconText
          text="Delete"
          title="Delete course"
          icon={<DeleteOutlined />}
          className="text-accent-500"
        />
      ),
      key: "delete",
      onClick: handleDelete,
    },
  ];

  const formatCurrency = (value: any) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const salesPrice =
    course &&
    course?.pricing &&
    course?.pricing?.amount -
      course?.pricing?.amount * (course?.pricing?.discount / 100);

  return (
    <List.Item className="flex gap-4" key={`course-item-${course.id}`}>
      <NextLink
        className="rounded-lg overflow-hidden w-24 h-20"
        href={`/dashboard/courses/${course.id}`}
        passHref
      >
        <Image
          alt="logo"
          width={96}
          height={80}
          objectFit="cover"
          src={courseImage}
        />
      </NextLink>
      <div className="flex-grow">
        <div className="flex items-start justify-between">
          <NextLink
            passHref
            href={`/dashboard/courses/${course.id}`}
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
              icon={<EllipsisOutlined rotate={90} />}
            />
          </Dropdown>
        </div>
        <Space className="gap-3 flex-wrap mb-2">
          <IconText
            title="course author"
            text={course.organizationName}
            icon={<UserOutlined />}
          />
          <IconText
            title="students"
            text={`${course.students ? course.students : "0"} students`}
            icon={<UsergroupAddOutlined />}
          />
          <IconText
            title="ratings"
            text={course.averageRating}
            icon={<StarFilled className="text-yellow-500" />}
          />
        </Space>
        <div className="flex gap-3">
          {!course?.pricing || course?.pricing?.type === "free" ? (
            <Typography.Paragraph className="text-base font-bold text-gray-600 mb-0">
              Free
            </Typography.Paragraph>
          ) : (
            <Typography.Paragraph className="text-base font-bold text-gray-600 mb-0">
              {formatCurrency(salesPrice || 0)}{" "}
              <span className="line-through font-semibold text-sm">
                ${course?.pricing?.amount}
              </span>
            </Typography.Paragraph>
          )}
          <Typography.Paragraph>
            Status:{" "}
            <span className="font-bold italic text-blue-500">
              {course.status}
            </span>
          </Typography.Paragraph>
        </div>
      </div>
    </List.Item>
  );
};

export default CourseItem;
