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
  Spin,
  Modal,
} from "antd";
import {
  DeleteOutlined,
  EllipsisOutlined,
  CheckOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import IconText from "@/components/shared/IconText";
import { UserInt } from "@/app/utils/interface";
import axiosInstance from "@/app/utils/axios-config";
import { handleAxiosError, showSuccess } from "@/app/utils/axiosError";

interface DataType extends UserInt {
  key: number;
  url: string;
  active: boolean;
  phone: any;
}

//
// export const userData: DataType[] = Array.from({ length: 20 }).map(
//   (_, index) => ({
//     key: index,
//     avatar: "",
//     id: String(index),
//     role: "Instructor",
//     active: index % 2 === 0,
//     firstname: "John",
//     surname: "Brown",
//     email: `john.brown${index}@gmail.com`,
//     phoneNumber: `+2340903355449${index}`,
//     url: "",
//   })
// );

interface IUserData {
  userData: Array<UserInt>;
  fetchBusinessList: any;
  currentPage: any;
  setSearchTerms: any;
  loading: any;
}
const BusinessUserList = ({
  userData,
  fetchBusinessList,
  currentPage,
  setSearchTerms,
  loading,
}: IUserData) => {
  const [form] = Form.useForm();
  const [isDeactiveShow, setIsDeactiveShow] = useState<boolean>(false);
  const [deactiveUserObj, setDeactiveUserObj] = useState<any>(undefined);

  const handleDeactivateAccount = async () => {
    try {
      const res = await axiosInstance.post(
        "/admin/deactivate-business-account",
        {
          businessId: deactiveUserObj?.id,
        }
      );
      if (res.status) {
        showSuccess("Account Deactivated");
        fetchBusinessList(currentPage);
      }
      setDeactiveUserObj(undefined);
      setIsDeactiveShow(false);
    } catch (error) {
      handleAxiosError(error);
    }
  };
  const handleAtivateAccount = async () => {
    try {
      const res = await axiosInstance.post("/admin/activate-business-account", {
        businessId: deactiveUserObj?.id,
      });
      if (res.status) {
        showSuccess("Account Activated");
        fetchBusinessList(currentPage);
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

  const columns: ColumnsType<any> = [
    {
      title: "User",
      dataIndex: "user",
      key: "user",
      fixed: "left",
      width: 150,
      render: (_, { id, firstname, lastname, email, companyName }) => (
        <div className="flex justify-start items-center gap-3">
          <div className="">
            <Typography.Paragraph className="leading-none text-base font-medium mb-1 block text-gray-800">
              {companyName}
            </Typography.Paragraph>
            <Typography.Paragraph className="m-0">
              {firstname} {lastname}
            </Typography.Paragraph>
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
      title: "Status",
      dataIndex: "active",
      key: "active",
      width: 100,

      render: (_, { status }) => (
        <Typography.Text className={status ? "text-purple-500" : ""}>
          <Button
            size="middle"
            className={`${
              status
                ? "bg-green-700"
                : "bg-red-500"
                
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
              isEmailVerify
                ? "bg-green-700"
                : "bg-red-500"
                
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
      <Spin
        spinning={loading}
        indicator={
          <LoadingOutlined className="flex items-center justify-center text-4xl" />
        }
      >
        <div className="bg-white rounded-lg pb-3 border overflow-hidden">
          <Table
            columns={columns}
            dataSource={userData}
            scroll={{ x: 1000, y: 500 }}
            pagination={false}
          />
        </div>
      </Spin>
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

export default BusinessUserList;
