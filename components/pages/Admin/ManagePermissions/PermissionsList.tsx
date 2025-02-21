/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { SetStateAction, useEffect, useState } from "react";
import {
  Col,
  Row,
  Form,
  Table,
  Switch,
  Select,
  Typography,
  Spin,
  MenuProps,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { handleAxiosError } from "@/app/utils/axiosError";
import { toast } from "react-toastify";
import axiosInstance from "@/app/utils/axios-config";
import { DeleteOutlined, LoadingOutlined } from "@ant-design/icons";
import IconText from "@/components/shared/IconText";
import Config from "@/app/utils/config";

interface DataType {
  key: number;
  permissionList: string;
  record: any;
  access: boolean;
  projectManager: boolean;
  accessRolePermissionId: any;
  user: boolean;
  guest: boolean;
}

const PermissionsList = ({
  allRoles,
  allPermissions,
  rolesAccessPermissions,
  fetchAllRoles,
  fetchAccessPermissionRoles,
  fetchAllPermissions,
  permissionLoading,
}: any) => {
  const [form] = Form.useForm();
  const [dataSource, setDataSource]: [
    any,
    React.Dispatch<SetStateAction<any>>
  ] = useState([]);
  const [loading, setLoading] = useState(false);
  const [roleId, setRoleId]: [
    string,
    React.Dispatch<React.SetStateAction<string>>
  ] = useState("");
  const [roleTitle, setRoleTitle]: [
    string,
    React.Dispatch<React.SetStateAction<string>>
  ] = useState("");
  const [permissionId, setPerimissionId] = useState<any>("");

  const handlePermissionToggle = async (permission: any) => {
    setLoading(true);
    if (permission.access) {
      try {
        const res = await axiosInstance.delete(
          `/access-roles-permissions/${permission.accessRolePermissionId.id}`
        );
        if (res.status) {
          toast.success("Permission Removed Successfully");
          await fetchAccessPermissionRoles();
          //getDynamicSource({ roleId: roleId });
        }
      } catch (error) {
        handleAxiosError(error);
      }
    } else {
      try {
        const res = await axiosInstance.post("/access-roles-permissions", {
          roleId: roleId,
          permissionId: permission.key,
        });
        if (res.status) {
          toast.success("Permission Assigned Successfully");
          await fetchAccessPermissionRoles();
          //getDynamicSource({ roleId: roleId });
        }
      } catch (error) {
        handleAxiosError(error);
      }
    }
    setLoading(false);
  };

  const handleDeletePermission = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.delete(
        `/access-permissions/${permissionId}`
      );
      if (res.status) {
        toast.success("Permission Deleted Successfully");
        await fetchAccessPermissionRoles();
        fetchAllPermissions();
        getDynamicSource({ roleId: roleId });
      }
    } catch (error) {
      handleAxiosError(error);
    }
    setLoading(false);
  };

  const items: MenuProps["items"] = [
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
      onClick: handleDeletePermission,
    },
  ];

  const columns: ColumnsType<DataType> = [
    {
      title: "Permission List",
      dataIndex: "permission",
      key: "permissionList",
      render: (text) => (
        <Typography.Paragraph className="m-0 capitalize">
          {text.replace(/_/g, " ")}
        </Typography.Paragraph>
      ),
    },
    // {
    //   title: "Access Permission",
    //   dataIndex: "access",
    //   key: "access-permission",
    //   render: (_, record) => {
    //     return (
    //       <Switch
    //         checked={record?.access}
    //         loading={loading}
    //         onChange={() => handlePermissionToggle(record)}
    //         disabled={true}
    //       />
    //     );
    //   },
    // },
    // {
    //   title: "Action",
    //   dataIndex: "action",
    //   key: "action",
    //   render: (_, record) => (
    //     <div>
    //       <Dropdown
    //         menu={{ items }}
    //         trigger={["click"]}
    //         placement="bottomRight"
    //         overlayClassName="p-2 rounded-lg"
    //       >
    //         <Button
    //           type="text"
    //           shape="circle"
    //           icon={<EllipsisOutlined rotate={90} />}
    //           onClick={() => setPerimissionId(record.key)}
    //         />
    //       </Dropdown>
    //     </div>
    //   ),
    // },
  ];

  const handleRoleChange = async (value: any) => {
    const getRoleTitle = allRoles.find((role: any) => role?.id === value);
    const roleStr: string = typeof value === "string" ? value : "";
    setRoleId(roleStr);
    if (getRoleTitle) {
      const rTitle: string =
        typeof getRoleTitle?.title === "string" ? getRoleTitle.title : "";
      setRoleTitle(rTitle);
      await fetchAccessPermissionRoles();
      getDynamicSource({ roleId: roleStr });
    }
  };

  const getDynamicSource = (dataObj: { roleId: string }) => {
    const dynamicSource = (Array.isArray(allPermissions) ? allPermissions : [])
      .filter((perObj: any) => {
        let pTitle: string = (
          typeof perObj?.title === "string" ? perObj.title : ""
        ).replace(/_/g, " ");
        if (
          roleTitle.toLowerCase().trim() === Config.ROLE_LIST.contributor &&
          (pTitle.toLowerCase().includes("delete") ||
            pTitle.toLowerCase().includes("approve") ||
            pTitle.toLowerCase().includes("help support assign ticket"))
        ) {
          return false;
        }

        return true;
      })
      .map((permission: any) => {
        let pTitle: string = (
          typeof permission?.title === "string" ? permission.title : ""
        ).replace(/_/g, " ");
        if (
          !["help support assign ticket", "job approve"].includes(pTitle) &&
          roleTitle.toLowerCase().trim() === Config.ROLE_LIST.contributor
        ) {
          pTitle += " (Own Content)";
        }
        return {
          key: permission?.id,
          permission: pTitle,
          access: getAccessStatus({
            permissionId: permission?.id,
            roleId: dataObj?.roleId,
          }),
          accessRolePermissionId: getAccessRolePermissionId({
            permissionId: permission?.id,
            roleId: dataObj?.roleId,
          }),
        };
      });
    setDataSource(dynamicSource);
  };

  useEffect(() => {
    getDynamicSource({ roleId: roleId });
  }, [rolesAccessPermissions, allPermissions]);

  const getAccessStatus = (dataObj: {
    permissionId: string;
    roleId: string;
  }) => {
    const data = (
      Array.isArray(rolesAccessPermissions) ? rolesAccessPermissions : []
    ).find((r: any) => r?.id === dataObj?.roleId);

    if (!data) return false; // Return false if data is not found

    const accessRolePermissions = Array.isArray(data?.accessrolepermissions)
      ? data.accessrolepermissions
      : [];
    const findIndex: number = accessRolePermissions.findIndex(
      (itemObj: any) => {
        return itemObj?.accessPermissionId === dataObj?.permissionId;
      }
    );

    return findIndex > -1;
  };

  const getAccessRolePermissionId = (dataObj: {
    permissionId: string;
    roleId: string;
  }) => {
    const data = (
      Array.isArray(rolesAccessPermissions) ? rolesAccessPermissions : []
    ).find((r: any) => r.id === dataObj?.roleId);
    if (!data) return false;
    const accessRolePermissions = Array.isArray(data?.accessrolepermissions)
      ? data.accessrolepermissions
      : [];
    const allRolePermissionsObj = accessRolePermissions.find(
      (p: any) => p.accessPermissionId === dataObj?.permissionId
    );

    return allRolePermissionsObj;
  };

  const rolesSelectOption = (Array.isArray(allRoles) ? allRoles : []).map(
    (role: any) => {
      return {
        label: role.title,
        value: role.id,
      };
    }
  );

  const handleDeleteRole = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.delete(`/access-roles/${roleId}`);
      if (res.status) {
        toast.success("Role Deleted Successfully");
        await fetchAllRoles();
        await fetchAllPermissions();
        await fetchAccessPermissionRoles();
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form form={form} className="pb-6" layout="vertical">
        <div>
          <Typography.Paragraph className="text-base text-red-400 italic">
            Select a role to assign neccesary permissions to the role
          </Typography.Paragraph>
        </div>
        <Row gutter={[16, 16]}>
          {/* <Col xs={12} lg={4}>
            <Form.Item label="Permission Groups" className="mb-0">
              <Select
                size="large"
                showSearch
                placeholder="Select Group"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={[
                  {
                    value: "courses",
                    label: "Courses",
                  },
                  {
                    value: "jobs",
                    label: "Jobs",
                  },
                  {
                    value: "funding",
                    label: "Funding",
                  },
                ]}
              />
            </Form.Item>
          </Col> */}

          <Col xs={12} lg={4}>
            <Form.Item className="mb-0">
              <Select
                showSearch
                allowClear
                size="large"
                placeholder="Select Role"
                onChange={(value) => {
                  handleRoleChange(value);
                }}
                optionFilterProp="children"
                filterOption={(input: any, option: any) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={rolesSelectOption}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      {typeof roleTitle === "string" && roleTitle.trim() !== "" && (
        <Typography.Paragraph className="flex items-center gap-2 text-lg font-bold ">
          {roleTitle}
          {/* <DeleteOutlined className="text-red-600" onClick={handleDeleteRole} /> */}
        </Typography.Paragraph>
      )}
      <div className="bg-white rounded-lg mb-6 border overflow-hidden">
        {typeof roleTitle === "string" && roleTitle.trim() !== "" && (
          <div>
            <Spin
              spinning={loading || permissionLoading}
              indicator={
                <LoadingOutlined className="flex items-center justify-center text-5xl " />
              }
            >
              <Table
                columns={columns}
                dataSource={dataSource}
                className="[&>div>div>ul.ant-table-pagination]:px-6"
                loading={loading || permissionLoading}
                pagination={{
                  pageSize: 100,
                }}
              />
            </Spin>
          </div>
        )}
      </div>
    </>
  );
};

export default PermissionsList;
