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
  BookOutlined,
  CheckOutlined,
} from "@ant-design/icons";
// app components
import IconText from "@/components/shared/IconText";
// interface and types
import config from "@/app/utils/config";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Link from "next/link";
import { handleAxiosError } from "@/app/utils/axiosError";
import axiosInstance from "@/app/utils/axios-config";
import { toast } from "react-toastify";
import { CourseInt } from "../course.interface";

interface ArchiveItemsProps {
  course: any;
  currentPage: any;
  fetchCourses: Function;
}

const ArchiveItems = ({
  course,
  fetchCourses,
  currentPage,
}: ArchiveItemsProps) => {
  const { data: session, status } = useSession();
  const courseImage =
    course && course.image ? course.image : JSON.parse(course.meta).image;
  const router = useRouter();

  const handleDelete = async () => {
    try {
      if (status === "authenticated" && session?.user?.token) {
        const response = await axiosInstance.delete(`/course/${course.id}`);
        if (response.status) {
          fetchCourses(currentPage);
          toast.success("Course deleted successfully");
        }
      }
    } catch (error) {
      handleAxiosError(error);
      message.error("An error occured while deleting the course");
    }
  };

  const handleEdit = () => {
    router.push(`/dashboard/courses/withvideos/${course.id}`);
  };

  const handleViewCourse = () => {
    router.push(`/dashboard/courses/view-course/${course.id}`);
  };

  const handleOpenCourse = async () => {
    try {
      const res = await axiosInstance.put(`/course/${course.id}`, {
        status: "active",
      });
      if (res.status) {
        toast.success("Unarchived Successfully");
        fetchCourses();
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
          text="Activate Course"
          title="Activate  course"
          icon={<CheckOutlined />}
        />
      ),
      key: "activate",
      onClick: handleOpenCourse,
    },
    // {
    //   label: (
    //     <IconText
    //       text="Share"
    //       title="Share course"
    //       icon={<ShareAltOutlined />}
    //     />
    //   ),
    //   key: "share",
    // },
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
  return (
    <List.Item className="flex gap-4" key={`course-item-${course.id}`}>
      <Link
        href={`/dashboard/courses/${course.id}`}
        passHref
        className="rounded-lg overflow-hidden w-24 h-20"
      >
        <Image
          alt="logo"
          width={96}
          height={80}
          objectFit="cover"
          src={courseImage}
        />
      </Link>
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
            // text={`${course.rating} (${course.ratingsCount})`}
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
              ${course?.pricing?.amount}
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

export default ArchiveItems;
