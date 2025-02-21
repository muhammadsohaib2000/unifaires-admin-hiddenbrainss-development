"use client";
import React, { Fragment, useState } from "react";
import NextLink from "next/link";
// ant components
import {
  Form,
  Input,
  Table,
  Button,
  Dropdown,
  MenuProps,
  Typography,
  Modal,
} from "antd";
import {
  DeleteOutlined,
  EllipsisOutlined,
  SwapOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import IconText from "@/components/shared/IconText";
import { UserInt } from "@/app/utils/interface";
import { handleAxiosError, showSuccess } from "@/app/utils/axiosError";
import axiosInstance from "@/app/utils/axios-config";
import { toast } from "react-toastify";

interface DataType extends UserInt {
  key: number;
  url: string;
  active: boolean;
  phone: any;
}

interface IUserData {
  userData: Array<UserInt>;
  fetchUsers: any;
  currentPage: any;
  setSearchTerms: any;
}
const UserList = ({
  userData,
  fetchUsers,
  currentPage,
  setSearchTerms,
}: IUserData) => {
  const [form] = Form.useForm();
  const [isDeactiveShow, setIsDeactiveShow] = useState<boolean>(false);
  const [deactiveUserObj, setDeactiveUserObj] = useState<any>(undefined);

  const handleChangeRole = async () => {
    try {
      const res = await axiosInstance.post("/admin/change-user-role", {
        userId: deactiveUserObj?.id,
        role: "admin",
      });
      if (res.status) {
        toast.success("Role Changed Successfully");
        fetchUsers();
      }
      setDeactiveUserObj(undefined);
    } catch (error) {
      handleAxiosError(error);
    }
  };

  const handleDeactivateAccount = async () => {
    try {
      const res = await axiosInstance.post("/admin/deactivate-user-account", {
        userId: deactiveUserObj?.id,
      });
      if (res.status) {
        showSuccess("Account Deactivated");
        fetchUsers(currentPage);
      }
      setDeactiveUserObj(undefined);
      setIsDeactiveShow(false);
    } catch (error) {
      handleAxiosError(error);
    }
  };

  const handleAtivateAccount = async () => {
    try {
      const res = await axiosInstance.post("/admin/activate-user-account", {
        userId: deactiveUserObj?.id,
      });
      if (res.status) {
        showSuccess("Account Activated");
        fetchUsers();
      }
      setDeactiveUserObj(undefined);
      setIsDeactiveShow(false);
    } catch (error) {
      handleAxiosError(error);
    }
  };

  const items: MenuProps["items"] = [
    {
      label: (
        <IconText
          text="Change to Admin"
          title="Change to Admin"
          icon={<SwapOutlined />}
        />
      ),
      key: "change role",
      onClick: handleChangeRole,
    },
    {
      label: (
        <IconText
          text="Deactivate"
          title="Deactivate"
          icon={<DeleteOutlined />}
          className="text-accent-500"
        />
      ),
      key: "deactivate",
      onClick: () => {
        setIsDeactiveShow(true);
      },
    },
  ];

  const activateItem: MenuProps["items"] = [
    {
      label: (
        <IconText
          text="Change to Admin"
          title="Change to Admin"
          icon={<SwapOutlined />}
        />
      ),
      key: "change role",
      onClick: handleChangeRole,
    },
    {
      label: (
        <IconText
          text="Activate"
          title="Actifvate"
          icon={<CheckOutlined />}
          className="text-green-500"
        />
      ),
      key: "activate",
      onClick: () => {
        setIsDeactiveShow(true);
      },
    },
  ];

  const columns: ColumnsType<UserInt> = [
    {
      title: "User",
      dataIndex: "user",
      key: "user",
      fixed: "left",
      width: 150,
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
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 100,

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
      title: "Is email verified?",
      dataIndex: "emailIsVerified",
      key: "isEmailVerify",
      width: 100,

      render: (_, { isEmailVerify }) => (
        <Typography.Text className={isEmailVerify ? "text-purple-500" : ""}>
          <Button
            size="middle"
            className={`${
              isEmailVerify ? "bg-green-700" : "bg-red-500"
            } capitalize text-white font-semibold  rounded-full border-none`}
          >
            {isEmailVerify ? "Verified" : "Not Verified"}
          </Button>
        </Typography.Text>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "role",
      width: 150,
      render: (_, { id, status }) => (
        <div className="flex items-center">
          <Dropdown
            menu={status ? { items } : { items: activateItem }}
            trigger={["click"]}
            placement="bottomRight"
            overlayClassName="p-2 rounded-lg"
          >
            <Button
              type="text"
              shape="circle"
              className="grid place-items-center"
              icon={<EllipsisOutlined rotate={90} />}
              onClick={(event) => {
                event.preventDefault();
                setDeactiveUserObj({ id, status });
              }}
            />
          </Dropdown>
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
        <Table
          columns={columns}
          dataSource={userData}
          // className="[&>div>div>ul.ant-table-pagination]:px-6"
          pagination={false}
          scroll={{ x: 1000, y: 500 }}
        />
      </div>
      {isDeactiveShow ? (
        <>
          <Modal
            title="Are you sure you want to perform this action?"
            open={isDeactiveShow}
            centered={true}
            cancelText="Cancel"
            okText="Ok"
            okType="danger"
            onCancel={(event) => {
              event.preventDefault();
              setDeactiveUserObj(undefined);
              setIsDeactiveShow(false);
            }}
            onOk={(event) => {
              event.preventDefault();
              if (deactiveUserObj?.status) {
                handleDeactivateAccount();
              } else {
                handleAtivateAccount();
              }
            }}
          ></Modal>
        </>
      ) : (
        <></>
      )}
    </Fragment>
  );
};

export default UserList;
