"use client";
import Image from "next/image";
import NextLink from "next/link";
import { Button, MenuProps, List, Space, Dropdown, Typography } from "antd";
import {
  StarFilled,
  UserOutlined,
  EditOutlined,
  DeleteOutlined,
  EllipsisOutlined,
  UsergroupAddOutlined,
  EyeOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import IconText from "@/components/shared/IconText";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { handleAxiosError } from "@/app/utils/axiosError";
import axiosInstance from "@/app/utils/axios-config";
import { toast } from "react-toastify";

interface ArchiveItemsProps {
  course: any;
  currentPage: any;
  fetchCourses: Function;
}

const PendingItems = ({
  course,
  fetchCourses,
  currentPage,
}: ArchiveItemsProps) => {
  const { data: session, status } = useSession();
  const courseImage = course?.image
    ? course.image
    : getJSONParse(course?.meta)?.image;
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
      if (status === "authenticated" && session?.user?.token) {
        const response = await axiosInstance.delete(`/course/${course?.id}`);
        if (response.status) {
          fetchCourses(currentPage);
          toast.success("Course deleted successfully");
        }
      }
    } catch (error) {
      handleAxiosError(error);
    }
  };

  const handleEdit = () => {
    router.push(`/dashboard/courses/withvideos/${course?.id}`);
  };

  const handleViewCourse = () => {
    router.push(`/dashboard/courses/view-course/${course?.id}`);
  };

  const handleApproveCourse = async () => {
    try {
      const res = await axiosInstance.put(`/course/${course?.id}`, {
        status: "approve",
      });
      if (res.status) {
        toast.success("Approved Successfully");
        fetchCourses();
      }
    } catch (error) {
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
      onClick: handleApproveCourse,
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
    <List.Item className="flex gap-4" key={`course-item-${course?.id}`}>
      <Link
        href={`/dashboard/courses/${course?.id}`}
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
            href={`/dashboard/courses/${course?.id}`}
            className="text-grey-900 hover:text-purple-500 font-semibold text-base flex-grow"
          >
            {course?.title}
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
            text={course?.organizationName}
            icon={<UserOutlined />}
          />
          <IconText
            title="students"
            text={`${
              !Number.isNaN(parseInt(course?.students))
                ? parseInt(course?.students)
                : "0"
            } students`}
            icon={<UsergroupAddOutlined />}
          />
          <IconText
            title="ratings"
            text={course?.averageRating}
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
              {course?.status === "pending"
                ? "Waiting for approval"
                : course?.status}
            </span>
          </Typography.Paragraph>
        </div>
      </div>
    </List.Item>
  );
};

export default PendingItems;
