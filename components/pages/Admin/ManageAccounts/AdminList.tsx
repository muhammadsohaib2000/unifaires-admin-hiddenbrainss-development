"use client";
import React, { Fragment, useState } from "react";
import NextLink from "next/link";
// ant components
import {
  Col,
  Row,
  Form,
  Input,
  Table,
  Avatar,
  Select,
  Button,
  Dropdown,
  MenuProps,
  Typography,
  DatePicker,
  Divider,
  message,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  EllipsisOutlined,
  SwapOutlined,
} from "@ant-design/icons";
//interface
// app components
import type { ColumnsType } from "antd/es/table";
import IconText from "@/components/shared/IconText";
// utils and int
import { UserInt } from "@/app/utils/interface";

import AdminDetails from "./AdminDetails";
import config from "@/app/utils/config";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import axiosInstance from "@/app/utils/axios-config";
import { toast } from "react-toastify";
import { handleAxiosError, showSuccess } from "@/app/utils/axiosError";

interface IUserData {
  userData: UserInt[];
  fetchAdmin: any;
  currentPage: any;
  setSearchTerms: any;
}

const AdminList = ({
  userData,
  fetchAdmin,
  currentPage,
  setSearchTerms,
}: IUserData) => {
  const [form] = Form.useForm();
  const { data: session } = useSession();
  const [adminModal, setAdminModal] = useState(false);
  const router = useRouter();
  const [userId, setUserId] = useState<any>();

  const handleChangeRole = async () => {
    try {
      const res = await axiosInstance.post("/admin/change-user-role", {
        userId: userId,
        role: "user",
      });
      if (res.status) {
        showSuccess("Role Changed Successfully");
        fetchAdmin(currentPage);
      }
    } catch (error) {
      handleAxiosError(error);
    }
  };

  const handleAdminDetail = () => {
    console.log(userId);
    setAdminModal(true);
  };

  const handleDeleteAccount = async () => {
    await axios
      .delete(`${config.API.API_URL}/users/${userId}`, {
        headers: {
          "x-token": session?.user?.token,
        },
      })
      .then((res) => {
        if (res) {
          message.success("Deleted Successfully");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const items: MenuProps["items"] = [
    {
      label: (
        <IconText
          text="Change to User"
          title="Change to User"
          icon={<SwapOutlined />}
        />
      ),
      key: "change role",
      onClick: handleChangeRole,
    },
  ];

  const columns: ColumnsType<UserInt> = [
    {
      title: "User",
      dataIndex: "user",
      key: "user",
      fixed: "left",
      // width: 150,
      render: (_, { id, firstname, lastname, email }) => (
        <div className="flex justify-start items-center gap-3">
          <div className="">
            <NextLink
              href={`/dashboard/manage-accounts/users/${id}`}
              className="leading-none text-base font-medium mb-1 block text-gray-800"
            >
              {firstname} {lastname}
            </NextLink>
            <Typography.Link href={`mailto:${email}`}>{email}</Typography.Link>
          </div>
        </div>
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (_, { roleId }) => <Typography.Text>Admin</Typography.Text>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, { status }) => (
        <Typography.Text className={status ? "text-purple-500" : ""}>
          <Button
            size="middle"
            className={`${
              status ? "bg-green-700" : "bg-red-500"
            } capitalize text-white font-semibold  rounded-full border-none`}
          >
            {status ? "Active" : "Deactivated"}
          </Button>
        </Typography.Text>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "role",
      render: (_, { id, email }) => (
        <div className="flex items-center">
          <Divider type="vertical" />
          {email !== "admin@tryunifaires.com" && (
            <Dropdown
              menu={{ items }}
              trigger={["click"]}
              placement="bottomRight"
              overlayClassName="p-2 rounded-lg"
            >
              <Button
                type="text"
                shape="circle"
                className="grid place-items-center"
                icon={<EllipsisOutlined rotate={90} />}
                onClick={() => setUserId(id)}
              />
            </Dropdown>
          )}
        </div>
      ),
    },
  ];

  return (
    <Fragment>
      <Form form={form} className="py-6">
        <Form.Item className="mb-0">
          <Input.Search
            size="large"
            placeholder="Search user"
            onSearch={(value) => setSearchTerms(value)}
            onChange={(e) => setSearchTerms(e.target.value)}
          />
        </Form.Item>
      </Form>
      <div className="bg-white rounded-lg pb-3 border overflow-hidden">
        <Table columns={columns} dataSource={userData} pagination={false} />
      </div>
      {adminModal && (
        <AdminDetails
          userId={userId}
          adminModal={adminModal}
          setAdminModal={setAdminModal}
        />
      )}
    </Fragment>
  );
};

export default AdminList;
