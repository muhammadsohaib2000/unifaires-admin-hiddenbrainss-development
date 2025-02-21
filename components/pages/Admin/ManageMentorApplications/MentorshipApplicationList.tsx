"use client";
import React, { useState } from "react";
import {
  Button,
  Dropdown,
  Form,
  Input,
  Select,
  Table,
  Typography,
  Modal,
} from "antd";
import type { TableColumnsType } from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import IconText from "@/components/shared/IconText";
import { MenuProps } from "antd/lib";
import { handleAxiosError, showSuccess } from "@/app/utils/axiosError";
import axiosInstance from "@/app/utils/axios-config";
import Link from "next/link";

interface DataType {
  key: React.Key;
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  title: string;
  status: string;
  lastSeen: string;
}

const FacilitatorApplicationList = ({
  applicantList,
  fetchApplications,
  currentPage,
  setSearchTerms,
  setApplicationStatus,
}: any) => {
  const [form] = Form.useForm();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [applicantID, setApplicantID] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [isDeleteShow, setIsDeleteShow] = useState<boolean>(false);
  const [isBulkDeleteShow, setIsBulkDeleteShow] = useState<boolean>(false);

  const handleAccept = async () => {
    try {
      const res = await axiosInstance.put(`/mentorships/${applicantID}`, {
        status: "accepted",
      });
      if (res.status) {
        showSuccess("Application Accepted");
        fetchApplications(currentPage);
      }
    } catch (error) {
      handleAxiosError(error);
    }
  };

  const handleReject = async () => {
    try {
      const res = await axiosInstance.put(`/mentorships/${applicantID}`, {
        status: "rejected",
      });
      if (res.status) {
        showSuccess("Application Rejected");
        fetchApplications(currentPage);
      }
    } catch (error) {
      handleAxiosError(error);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await axiosInstance.post("/mentorships/bulk-delete", {
        ids: [applicantID],
      });
      if (res.status) {
        showSuccess("Application Deleted");
        fetchApplications(currentPage);
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setApplicantID(0);
      setIsDeleteShow(false);
    }
  };

  const items: MenuProps["items"] = [
    {
      label: <IconText text="Accept" title="Accept" icon={<CheckOutlined />} />,
      key: "accepted",
      title: "accept",
      onClick: handleAccept,
    },
    {
      label: (
        <IconText
          text="Reject"
          title="Reject"
          icon={<CloseOutlined />}
          className="text-accent-500"
        />
      ),
      key: "rejected",
      title: "Reject",
      onClick: handleReject,
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
      onClick: () => {
        setIsDeleteShow(true);
      },
    },
  ];

  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      render: (_, record) => (
        <div className="flex justify-start items-center gap-3">
          <div>
            <Link
              href={`/dashboard/manage-accounts/mentorApplications/${record?.id}`}
              className="leading-none text-base font-medium mb-1 block text-gray-800"
            >
              {record?.firstname} {record?.lastname}
            </Link>
            <Typography.Link href={`mailto:${record?.email}`}>
              {record?.email}
            </Typography.Link>
          </div>
        </div>
      ),
    },

    // {
    //   title: "Email",
    //   dataIndex: "email",
    // },
    {
      title: "Status",
      dataIndex: "status",
      width: 150,
      render: (text) => (
        <div>
          <Button
            size="middle"
            className={`${
              text === "pending"
                ? "bg-orange-400"
                : text === "rejected"
                ? "bg-red-600"
                : "bg-green-700"
            } capitalize text-white font-semibold  rounded-full border-none`}
          >
            {text}
          </Button>
        </div>
      ),
    },
    {
      title: "Job Title",
      dataIndex: "currentJobTitle",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "role",
      width: 100,
      render: (_, { id, status }) => {
        const menuArr = items.filter((itemObj: any) => {
          return !(
            typeof itemObj?.key === "string" &&
            typeof status === "string" &&
            itemObj.key.toLowerCase().trim() === status.toLowerCase().trim()
          );
        });
        return (
          <div className="flex items-center">
            <Dropdown
              menu={{ items: menuArr }}
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
                  setApplicantID(id);
                }}
              />
            </Dropdown>
          </div>
        );
      },
    },
  ];

  const handleBulkDelete = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.post("/mentorships/bulk-delete", {
        ids: selectedRowKeys,
      });
      if (res.status) {
        showSuccess("Applicants Deleted");
        fetchApplications(currentPage);
      }
      setSelectedRowKeys([]);
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setIsBulkDeleteShow(false);
      setLoading(false);
    }
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  return (
    <div>
      <Form form={form} className="pt-6 pb-2">
        <Typography.Title level={4}>
          List of Mentors & Facilitators
        </Typography.Title>

        <div className="flex justify-between">
          <div className="flex flex-wrap gap-2 w-full">
            <Form.Item className="mb-0 ">
              <Input.Search
                size="large"
                placeholder="Search user"
                onSearch={(value) => setSearchTerms(value)}
                onChange={(e) => setSearchTerms(e.target.value)}
              />
            </Form.Item>
            <Form.Item className="mb-0 ">
              <Select
                showSearch
                allowClear
                size="large"
                placeholder="Filter by Status"
                optionFilterProp="children"
                filterOption={(input, option: any) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                onChange={(value) => setApplicationStatus(value)}
                options={[
                  {
                    lable: "Pending",
                    value: "pending",
                  },
                  {
                    lable: "Accepted",
                    value: "accepted",
                  },
                  {
                    lable: "Rejected",
                    value: "rejected",
                  },
                ]}
              />
            </Form.Item>
          </div>

          <div style={{ marginBottom: 4 }} className="flex ml-auto">
            <Button
              type="primary"
              onClick={(event) => {
                event.preventDefault();
                setIsBulkDeleteShow(true);
              }}
              disabled={!hasSelected}
              loading={loading}
              className="flex text-white ml-auto items-center bg-red-600"
            >
              Delete
            </Button>
            <span style={{ marginLeft: 8 }}>
              {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
            </span>
          </div>
        </div>
      </Form>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={applicantList}
        scroll={{ x: 1000, y: 500 }}
        pagination={false}
        className="parent-overflow-auto-ant-table-body-convert"
      />
      {isDeleteShow ? (
        <>
          <Modal
            title="Are you sure you want to perform this action?"
            open={isDeleteShow}
            centered={true}
            cancelText="Cancel"
            okText="Ok"
            okType="danger"
            onCancel={(event) => {
              event.preventDefault();
              setApplicantID(0);
              setIsDeleteShow(false);
            }}
            onOk={(event) => {
              event.preventDefault();
              handleDelete();
            }}
          ></Modal>
        </>
      ) : (
        <></>
      )}
      {isBulkDeleteShow ? (
        <>
          <Modal
            title="Are you sure you want to perform this action?"
            open={isBulkDeleteShow}
            centered={true}
            cancelText="Cancel"
            okText="Ok"
            okType="danger"
            onCancel={(event) => {
              event.preventDefault();
              setIsBulkDeleteShow(false);
            }}
            onOk={(event) => {
              event.preventDefault();
              handleBulkDelete();
            }}
          ></Modal>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default FacilitatorApplicationList;
