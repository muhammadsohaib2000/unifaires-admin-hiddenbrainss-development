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
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  ShareAltOutlined,
  EllipsisOutlined,
  SwapOutlined,
  CheckOutlined,
} from "@ant-design/icons";
//interface
// app components
import type { ColumnsType } from "antd/es/table";
import IconText from "@/components/shared/IconText";
// utils and int
import { UserInt } from "@/app/utils/interface";

import { useRouter } from "next/navigation";
import { handleAxiosError } from "@/app/utils/axiosError";
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
}
const UserList = ({ userData }: IUserData) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [userId, setUserId] = useState<any>();

  const handleChangeRole = async () => {
    try {
      const res = await axiosInstance.post("/roles/change-role", {
        userId: userId,
        roleId: "roleId",
      });
      if (res.status) {
        toast.success("Role Changed Successfully");
      }
    } catch (error) {
      handleAxiosError(error);
    }
  };

  const handleDeactivateAccount = async () => {
    try {
      const res = await axiosInstance.put(`/user/${userId}`, {
        status: false,
      });
      if (res.status) {
        toast.success("Deactivation Successful");
      }
    } catch (error) {
      handleAxiosError(error);
    }
  };
  const handleAtivateAccount = async () => {
    try {
      const res = await axiosInstance.put(`/user/${userId}`, {
        status: true,
      });
      if (res.status) {
        toast.success("Deactivation Successful");
      }
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
      onClick: handleDeactivateAccount,
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
      onClick: handleAtivateAccount,
    },
  ];

  const columns: ColumnsType<any> = [
    {
      title: "User",
      dataIndex: "user",
      key: "user",
      fixed: "left",
      width: 150,
      render: (_, { id, firstname, lastname, email }) => (
        <div className="flex justify-start items-center gap-3">
          <div className="">
            <NextLink href={`/dashboard/manage-accounts/users/${id}`}>
              <a className="leading-none text-base font-medium mb-1 block text-gray-800">
                {firstname} {lastname}
              </a>
            </NextLink>
            <Typography.Link href={`mailto:${email}`}>{email}</Typography.Link>
          </div>
        </div>
      ),
    },
    {
      title: "Phone number",
      dataIndex: "phone",
      key: "phoneNumber",
      width: 200,
      render: (_, { phone }) => (
        <Typography.Link href={`tel:${phone}`}>{phone}</Typography.Link>
      ),
    },
    {
      title: "Active",
      dataIndex: "status",
      key: "active",
      width: 100,

      render: (_, { status }) => (
        <Typography.Text className={status ? "text-purple-500" : ""}>
          {status ? "active" : "Deactivated"}
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
              onClick={() => setUserId(id)}
            />
          </Dropdown>
        </div>
      ),
    },
  ];

  return (
    <Fragment>
      <Form form={form} className="py-6">
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={10}>
            <Form.Item className="mb-0">
              <Input.Search size="large" placeholder="Search user" />
            </Form.Item>
          </Col>
          <Col xs={12} lg={4}>
            <Form.Item className="mb-0">
              <Select
                size="large"
                showSearch
                placeholder="Sort by"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={[
                  {
                    value: "organisation",
                    label: "Organisation",
                  },
                  {
                    value: "date-created",
                    label: "Date created",
                  },
                ]}
              />
            </Form.Item>
          </Col>
          <Col xs={12} lg={4}>
            <Form.Item className="mb-0">
              <Select
                showSearch
                size="large"
                placeholder="Filter by"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={[
                  {
                    value: "User Full Name",
                    label: "full-name",
                  },
                ]}
              />
            </Form.Item>
          </Col>
          <Col xs={24} lg={6}>
            <Form.Item className="mb-0">
              <DatePicker.RangePicker className="w-full" size="large" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <div className="bg-white rounded-lg pb-3 border overflow-hidden">
        <Table
          columns={columns}
          dataSource={userData}
          className="[&>div>div>ul.ant-table-pagination]:px-6"
          scroll={{ x: 1000, y: 500 }}
        />
      </div>
    </Fragment>
  );
};

export default UserList;
