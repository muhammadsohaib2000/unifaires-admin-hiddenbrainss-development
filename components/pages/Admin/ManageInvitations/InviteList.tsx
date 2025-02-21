"use client";
import { Fragment, useState, useCallback, useMemo } from "react";
// ant components
import {
  Col,
  Row,
  Form,
  Input,
  Table,
  Select,
  Button,
  Dropdown,
  MenuProps,
  Typography,
  Divider,
  Modal,
} from "antd";
import {
  ControlOutlined,
  DeleteOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
//interface
// app components
import type { ColumnsType } from "antd/es/table";
import IconText from "@/components/shared/IconText";
// utils and int
import { UserInt } from "@/app/utils/interface";
import { useRouter } from "next/navigation";
import axiosInstance from "@/app/utils/axios-config";
import { handleAxiosError } from "@/app/utils/axiosError";
import { toast } from "react-toastify";
import NextLink from "next/link";

interface DataType {
  key: number;
  url: string;
  status: string;
  email: string;
  id: string;
  user: any;
  roles: any;
}

const InviteList = ({
  inviteList,
  fetchInvites,
  currentPage,
  setSearchTerms,
  setInviteStatus,
}: any) => {
  // console.log("this the invite list");
  const router = useRouter();
  const [inviteId, setInviteId] = useState<any>();
  const [form] = Form.useForm();
  const INVITE_CONFIGS_OBJECT: any = useMemo(() => {
    return {
      pending: "Pending",
      accepted: "Active",
    };
  }, []);
  const [isShowDelete, setIsShowDelete] = useState(false);

  /**
   * Get invite status title
   */
  const getInviteStatusTitle = useCallback(
    (keyVal: unknown = "") => {
      if (
        typeof keyVal === "string" &&
        typeof INVITE_CONFIGS_OBJECT?.[keyVal.toLowerCase().trim()] ===
          "string" &&
        INVITE_CONFIGS_OBJECT[keyVal.toLowerCase().trim()].trim() !== ""
      ) {
        return INVITE_CONFIGS_OBJECT[keyVal.toLowerCase().trim()].trim();
      }
      return "";
    },
    [INVITE_CONFIGS_OBJECT]
  );

  const handleDelete = async () => {
    try {
      const res = await axiosInstance.delete(`/invite/${inviteId}`);
      if (res.status) {
        toast.success("Invite Deleted Successfully");
        await fetchInvites(currentPage);
      }
      setInviteId(0);
      setIsShowDelete(false);
    } catch (error) {
      handleAxiosError(error);
    }
  };
  const items: MenuProps["items"] = [
    {
      label: (
        <IconText
          text="Manage Permission"
          title="Manage Permission"
          icon={<ControlOutlined />}
          className="text-base text-blue-700 font-bold"
        />
      ),
      key: "permission",
      onClick: () =>
        router.push(
          `/dashboard/manage-accounts/manage-permissions/${inviteId}`
        ),
    },
    {
      label: (
        <IconText
          text="Delete"
          title="Delete course"
          icon={<DeleteOutlined />}
          className="text-base text-accent-500"
        />
      ),
      key: "delete",
      onClick: () => {
        setIsShowDelete(true);
      },
    },
  ];

  const columns: ColumnsType<DataType> = [
    {
      title: "Email",
      dataIndex: "ownerDetails",
      key: "user",
      render: (_, { user }) => (
        <div className="flex justify-start items-center gap-3">
          <div className="">
            <NextLink
              href={`/dashboard/manage-accounts/users/${user?.id}`}
              className="leading-none text-base font-medium mb-1 block text-gray-800"
            >
              {user?.firstname} {user?.lastname}
            </NextLink>

            <Typography.Link href={`mailto:${user?.email}`}>
              {user?.email}
            </Typography.Link>
          </div>
        </div>
      ),
    },
    {
      title: "Roles",
      dataIndex: "roles",
      key: "roles",
      render: (_, { roles }) => (
        <div className="">
          {roles &&
            roles.map((role: any) => {
              return <span key={role?.id}>{role?.title}</span>;
            })}
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, { status }) => (
        <Button
          size="middle"
          className={`${
            status === "pending"
              ? "bg-orange-400"
              : status === "accepted"
              ? "bg-green-700"
              : ""
          } capitalize text-white font-semibold  rounded-full border-none`}
        >
          {getInviteStatusTitle(status)}
        </Button>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "role",
      render: (_, { id }) => (
        <div className="flex items-center justify-center">
          {/* <NextLink href="/admin/manage-accounts/manage-permissions" passHref>
            <Button>Permissions</Button>
          </NextLink> */}
          <Divider type="vertical" />
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
              onClick={(event) => {
                event.preventDefault();
                setInviteId(id);
              }}
            />
          </Dropdown>
        </div>
      ),
    },
  ];

  return (
    <Fragment>
      <Form form={form} className="py-6 w-full">
        <div className="flex flex-wrap gap-2 w-full">
          <Form.Item className="mb-0 lg:w-2/4 md:1/3 w-full">
            <Input.Search
              size="large"
              placeholder="Search user"
              onSearch={(value) => setSearchTerms(value)}
              onChange={(e) => setSearchTerms(e.target.value)}
            />
          </Form.Item>
          <Form.Item className="mb-0 lg:w-1/3 md:w-1/3 w-full">
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
              onChange={(value) => setInviteStatus(value)}
              options={[
                {
                  label: "Pending",
                  value: "pending",
                },
                {
                  label: "Active",
                  value: "accepted",
                },
              ]}
            />
          </Form.Item>
        </div>
      </Form>
      <div className="bg-white rounded-lg pb-3 border overflow-hidden">
        <Table columns={columns} dataSource={inviteList} pagination={false} />
      </div>
      {isShowDelete ? (
        <>
          <Modal
            title="Are you sure you want to delete this item?"
            open={isShowDelete}
            centered={true}
            cancelText="Cancel"
            okText="Ok"
            okType="danger"
            onCancel={(event) => {
              event.preventDefault();
              setInviteId(0);
              setIsShowDelete(false);
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
    </Fragment>
  );
};

export default InviteList;
