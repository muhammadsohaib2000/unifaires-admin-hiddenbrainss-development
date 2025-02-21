"use client";
import NextLink from "next/link";
import { Typography, List, Dropdown, Button, MenuProps, Tag } from "antd";
import {
  BankOutlined,
  EllipsisOutlined,
  DeleteOutlined,
  EditOutlined,
  SaveOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { CourseInt } from "@/app/utils/interface";
import IconText from "../IconText";
import { useRouter } from "next/navigation";
import axiosInstance from "@/app/utils/axios-config";
import { handleAxiosError, showSuccess } from "@/app/utils/axiosError";

export interface FundingCardProps extends CourseInt {}

const FundingCard = ({
  funding,
  fetchFunding,
  archive,
  currentPage,
  menuTitle = "my-funding",
}: any) => {
  const router = useRouter();
  const handleEdit = () => {
    router.push(`/dashboard/funding/create/${funding?.id}`);
  };

  const handleDelete = async () => {
    try {
      const response = await axiosInstance.delete(`/funding/${funding?.id}`);
      if (response?.status) {
        fetchFunding(currentPage);
        showSuccess("Funding Deleted Successfully");
      }
    } catch (error) {
      handleAxiosError(error);
    }
  };

  const handleArchivefunding = async () => {
    try {
      const res = await axiosInstance.put(`/funding/user/${funding?.id}`, {
        status: "archive",
      });

      if (res?.status) {
        fetchFunding(currentPage);
        showSuccess("Funding Archived Successfully");
      }
    } catch (error) {
      handleAxiosError(error);
    }
  };
  const handleOpenFunding = async () => {
    try {
      const res = await axiosInstance.put(`/funding/user/${funding?.id}`, {
        status: "active",
      });

      if (res?.status) {
        fetchFunding(currentPage);
        showSuccess("Funding Unarchived Successfully");
      }
    } catch (error) {
      handleAxiosError(error);
    }
  };

  const handleApproveFunding = async () => {
    try {
      const res = await axiosInstance.put(`/funding/user/${funding?.id}`, {
        status: "approve",
      });

      if (res?.status) {
        fetchFunding(currentPage);
        showSuccess("Funding Approved Successfully");
      }
    } catch (error) {
      handleAxiosError(error);
    }
  };

  const items: MenuProps["items"] = [
    {
      label: (
        <IconText text="Edit" title="Edit funding" icon={<EditOutlined />} />
      ),
      key: "edit",
      onClick: handleEdit,
    },
    {
      label: (
        <IconText
          text="Archive"
          title="Archive funding"
          icon={<SaveOutlined />}
        />
      ),
      key: "archive",
      onClick: handleArchivefunding,
    },
    {
      label: (
        <IconText
          text="Delete"
          title="Delete funding"
          icon={<DeleteOutlined />}
          className="text-accent-500"
        />
      ),
      key: "delete",
      onClick: handleDelete,
    },
  ];

  const archiveItems: MenuProps["items"] = [
    {
      label: (
        <IconText text="Edit" title="Edit funding" icon={<EditOutlined />} />
      ),
      key: "edit",
      onClick: handleEdit,
    },
    {
      label: (
        <IconText
          text="Unarchive"
          title="Unarchive funding"
          icon={<SaveOutlined />}
        />
      ),
      key: "open",
      onClick: handleOpenFunding,
    },
    {
      label: (
        <IconText
          text="Delete"
          title="Delete funding"
          icon={<DeleteOutlined />}
          className="text-accent-500"
        />
      ),
      key: "delete",
      onClick: handleDelete,
    },
  ];

  const pendingItems: MenuProps["items"] = [
    {
      label: (
        <IconText text="Edit" title="Edit funding" icon={<EditOutlined />} />
      ),
      key: "edit",
      onClick: handleEdit,
    },
    {
      label: (
        <IconText
          text="Archive"
          title="Archive funding"
          icon={<SaveOutlined />}
        />
      ),
      key: "archive",
      onClick: handleArchivefunding,
    },
    {
      label: (
        <IconText
          text="Approve"
          title="Approve funding"
          icon={<CheckOutlined />}
        />
      ),
      key: "approve",
      onClick: handleApproveFunding,
    },
    {
      label: (
        <IconText
          text="Delete"
          title="Delete funding"
          icon={<DeleteOutlined />}
        />
      ),
      key: "delete",
      onClick: handleDelete,
    },
  ];

  return (
    <>
      <List.Item
        className="flex gap-4 hover:bg-gray-50 cursor-pointer bg-white rounded-md"
        key={`funding-item-${funding?.id}`}
      >
        <div className="w-full">
          <div className="flex justify-between">
            <NextLink
              href={`/dashboard/funding/${funding?.id}`}
              passHref
              target={funding?.fundingUrl ? "_blank" : "_self"}
              rel="noopener noreferrer"
            >
              <Typography.Title ellipsis={{ rows: 2 }} level={5}>
                {funding?.title}
                <Tag className="capitalize text-[#5832DA] bg-[#D2C5FD] rounded-full border-none px-3 py-1 ml-2">
                  {funding?.status === "pending"
                    ? "Waiting for approval"
                    : funding?.status}
                </Tag>
              </Typography.Title>
            </NextLink>
            <Dropdown
              menu={
                menuTitle === "archived-funding"
                  ? { items: archiveItems }
                  : menuTitle === "my-funding"
                  ? { items }
                  : { items: pendingItems }
              }
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
          <Typography.Paragraph
            ellipsis
            className="flex items-center gap-1 mb-1"
          >
            <BankOutlined className="text-grey-400" />
            {funding?.organizationName}
          </Typography.Paragraph>
          <Typography.Paragraph
            ellipsis
            className="flex items-center gap-1 mb-1"
          >
            {funding?.location || funding?.state}
          </Typography.Paragraph>
        </div>
      </List.Item>
    </>
  );
};

export default FundingCard;
