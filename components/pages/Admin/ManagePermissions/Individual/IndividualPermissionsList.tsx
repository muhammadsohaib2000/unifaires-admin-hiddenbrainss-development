/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useState, useEffect } from "react";
import { Col, Row, Form, Table, Switch, Select, Typography, Spin } from "antd";
import type { ColumnsType } from "antd/es/table";
import axiosInstance from "@/app/utils/axios-config";
import { toast } from "react-toastify";
import { handleAxiosError } from "@/app/utils/axiosError";
import { useParams } from "next/navigation";
import Config from "@/app/utils/config";
import { LoadingOutlined } from "@ant-design/icons";

interface DataType {
  key: number;
  id: string;
  permissionList: string;
  administrator: boolean;
  groupManager: boolean;
  projectManager: boolean;
  user: boolean;
  guest: boolean;
}

const PermissionsList = ({
  allRoles,
  allPermissions,
  userPermissions,
  fetchUserInviteDetail,
  userRoles,
  loading,
  setLoading,
}: any) => {
  const [form] = Form.useForm();
  const params = useParams();
  const [tblDatas, setTblDatas] = useState([]);
  const inviteId = params?.inviteId;

  const createTblDatas = () => {
    let newDataArr: any = Array.isArray(allPermissions) ? allPermissions : [];
    newDataArr = newDataArr
      .filter((perObj: any) => {
        let pTitle: string = (
          typeof perObj?.title === "string" ? perObj.title : ""
        ).replace(/_/g, " ");
        if (
          typeof userRoles?.[0]?.title === "string" &&
          userRoles[0].title.toLowerCase().trim() ===
            Config.ROLE_LIST.contributor &&
          (pTitle.toLowerCase().includes("delete") ||
            pTitle.toLowerCase().includes("approve") ||
            pTitle.toLowerCase().includes("help support assign ticket"))
        ) {
          return false;
        }

        return true;
      })
      .map((itemObj: any) => {
        return { ...itemObj, status: getPermissionStatus(itemObj?.id) };
      });
    setTblDatas(newDataArr);
  };

  function getPermissionStatus(id: any) {
    const status = (Array.isArray(userPermissions) ? userPermissions : []).find(
      (p: any) => p?.id === id
    );
    return status ? true : false;
  }

  const handlePermissionToggle = async (record: any) => {
    setLoading(true);
    if (record?.status) {
      try {
        let newPermissionIds = (
          Array.isArray(userPermissions) ? userPermissions : []
        ).map((itemObj: any) => {
          return itemObj?.id;
        });
        newPermissionIds = newPermissionIds.filter(
          (p: any) => p !== record?.id
        );
        const res = await axiosInstance.put(`/invite/${inviteId}`, {
          permissionIds: newPermissionIds,
        });
        if (res?.status) {
          toast.success("Permission Removed Successfully");
          await fetchUserInviteDetail();
        }
      } catch (error) {
        handleAxiosError(error);
      }
    } else {
      try {
        let newPermissionIds: any = (
          Array.isArray(userPermissions) ? userPermissions : []
        ).map((itemObj: any) => {
          return itemObj?.id;
        });
        newPermissionIds = [...newPermissionIds, record?.id];
        const res = await axiosInstance.put(`/invite/${inviteId}`, {
          permissionIds: newPermissionIds,
        });
        if (res.status) {
          toast.success("Permission Assigned Successfully");
          fetchUserInviteDetail();
        }
      } catch (error) {
        handleAxiosError(error);
      }
    }
    setLoading(false);
  };

  const getContributorPermissionTitle = (inputTxt: string = "") => {
    let pTitle: string = (typeof inputTxt === "string" ? inputTxt : "").replace(
      /_/g,
      " "
    );
    if (
      !["help support assign ticket", "job approve"].includes(pTitle) &&
      typeof userRoles?.[0]?.title === "string" &&
      userRoles[0].title.toLowerCase().trim() === Config.ROLE_LIST.contributor
    ) {
      pTitle += " (Own Content)";
    }

    return pTitle;
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Permission List",
      dataIndex: "title",
      key: "permissionList",
      render: (text) => {
        return (
          <Typography.Paragraph className="m-0 capitalize">
            {getContributorPermissionTitle(text)}
          </Typography.Paragraph>
        );
      },
    },
    {
      title: "Access Permission",
      dataIndex: "access",
      key: "access-permission",
      render: (_, record: any) => (
        <Switch
          checked={record?.status}
          loading={loading}
          onChange={() => handlePermissionToggle(record)}
        />
      ),
    },
  ];
  const currentRoles = (Array.isArray(userRoles) ? userRoles : []).map(
    (role: any) => {
      return {
        label: role?.title,
        value: role?.id,
      };
    }
  );

  const rolesSelectOption = (Array.isArray(allRoles) ? allRoles : []).map(
    (role: any) => {
      return {
        label: role?.title,
        value: role?.id,
      };
    }
  );

  const handleRoleChange = async (value: any) => {
    try {
      let permissionArr: any = (Array.isArray(allRoles) ? allRoles : []).find(
        (itemObj: any) => {
          return (
            typeof itemObj?.id === "string" &&
            typeof value === "string" &&
            itemObj.id.toLowerCase().trim() === value.toLowerCase().trim()
          );
        }
      );
      permissionArr = (
        Array.isArray(permissionArr?.accessrolepermissions)
          ? permissionArr.accessrolepermissions
          : []
      ).map((itemObj1: any) => {
        return itemObj1?.accessPermissionId;
      });
      if (permissionArr.length < 1) {
        return;
      }
      const res = await axiosInstance.put(`/invite/${inviteId}`, {
        roleIds: [value],
        permissionIds: permissionArr,
      });
      if (res.status) {
        toast.success("Role Modified Successfully");
        await fetchUserInviteDetail();
        createTblDatas();
      }
    } catch (error) {
      handleAxiosError(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    createTblDatas();
  }, [allPermissions, userPermissions]);

  return (
    <>
      <Form form={form} className="pb-6" layout="vertical">
        <Row gutter={[16, 16]}>
          <Col xs={12} lg={4}>
            <Form.Item label="Roles" className="mb-0">
              <Select
                allowClear
                value={currentRoles}
                showSearch
                size="large"
                placeholder="Select Role"
                optionFilterProp="children"
                filterOption={(input: any, option: any) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                onChange={handleRoleChange}
                options={rolesSelectOption}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <div className="bg-white rounded-lg mb-6 border overflow-hidden">
        <Spin
          spinning={loading}
          indicator={
            <LoadingOutlined className="flex items-center justify-center text-2xl" />
          }
        >
          <Table
            columns={columns}
            dataSource={tblDatas}
            className="[&>div>div>ul.ant-table-pagination]:px-6"
            pagination={{ pageSize: 100 }}
          />
        </Spin>
      </div>
    </>
  );
};

export default PermissionsList;
