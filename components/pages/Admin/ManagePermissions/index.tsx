"use client";
import React, { Fragment, useEffect, useState, memo } from "react";
// next
import NextLink from "next/link";
// antd and Icon components
import {
  Divider,
  Breadcrumb,
  Typography,
  Button,
  Form,
  Input,
  Select,
} from "antd";
// app components
import PermissionsList from "./PermissionsList";
import Container from "@/components/shared/container";
import { PlusOutlined } from "@ant-design/icons";
import { handleAxiosError, handleError } from "@/app/utils/axiosError";
import axiosInstance from "@/app/utils/axios-config";
import { toast } from "react-toastify";
import Config from "@/app/utils/config";

const ManagePermissions = () => {
  const [form] = Form.useForm();
  const [allRoles, setAllRoles] = useState([]);
  const [allPermissions, setAllPermissions] = useState([]);
  const [createRole, setCreateRole] = useState(false);
  const [createPermission, setCreatePermission] = useState(false);
  const [rolesAccessPermissions, setRolesAccessPermissions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllRoles = async () => {
    try {
      const res = await axiosInstance.get("/access-roles");

      if (res.status) {
        setAllRoles(res.data.data);
      }
    } catch (error) {
      return null;
    }
  };

  const fetchAllPermissions = async () => {
    try {
      const res = await axiosInstance.get("/access-permissions");

      if (Array.isArray(res?.data?.data)) {
        setAllPermissions(res.data.data);
      }
    } catch (error) {
      return null;
    }
  };

  const fetchAccessPermissionRoles = async () => {
    try {
      const res = await axiosInstance.get("/access-roles-permissions");

      if (Array.isArray(res?.data?.data)) {
        setRolesAccessPermissions(res.data.data);
      }
    } catch (error) {
      return null;
    }
  };

  useEffect(() => {
    fetchAllPermissions();
    fetchAllRoles();
    fetchAccessPermissionRoles();
  }, []);

  const handleCreateRole = async () => {
    await form.validateFields();
    const formData = form.getFieldsValue();
    setLoading(true);
    try {
      const res = await axiosInstance.post("/access-roles", {
        ...formData,
      });

      if (res.status) {
        toast.success("Role Created Successfully");
        setCreateRole(!createRole);
        fetchAllRoles();
        form.resetFields();
      }
    } catch (error) {
      handleAxiosError(error);
    }
    setLoading(false);
  };

  const handleCreatePermission = async () => {
    try {
      setLoading(true);
      await form.validateFields();
      const formData = form.getFieldsValue();
      const inputedTitle = formData.title;
      const title = inputedTitle.toLowerCase().replace(/\s/g, "_");
      const meta = formData.description;
      const res = await axiosInstance.post("/access-permissions", {
        title: title,
        meta: meta,
      });

      if (res.status) {
        toast.success("Permission Created Successfully");
        setCreatePermission(!createPermission);
        fetchAllPermissions();
        form.resetFields();
      }
    } catch (error) {
      handleAxiosError(error);
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <section className="content-header">
        <Container fluid className="px-6 pt-6">
          <Breadcrumb>
            <Breadcrumb.Item>
              <NextLink href="/dashboard/manage-accounts">
                In House Unifaires
              </NextLink>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Permissions details</Breadcrumb.Item>
          </Breadcrumb>
          <div className="mt-6">
            <Typography.Title level={2} className="mb-0">
              Manage Permissions
            </Typography.Title>
            <Typography.Paragraph className="mb-0">
              Add or edit permissions for various permission groups
            </Typography.Paragraph>
          </div>
        </Container>
      </section>
      <Divider />
      <section className="content-header">
        <Container fluid className="px-6">
          {createRole ? (
            <Form layout="vertical" form={form}>
              <Form.Item
                name="title"
                required
                rules={[
                  {
                    required: true,
                    message: "Please enter role title",
                  },
                ]}
              >
                <Input
                  placeholder="Enter Role title"
                  size="large"
                  className="rounded-sm"
                />
              </Form.Item>
              <Form.Item name="userLevel">
                <Select
                  placeholder="Select level"
                  showSearch
                  allowClear
                  size="large"
                  optionFilterProp="children"
                  filterOption={(input: any, option: any) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={[
                    {
                      label: "Business",
                      value: "business",
                    },
                    {
                      label: "Admin",
                      value: "admin",
                    },
                  ]}
                />
              </Form.Item>

              <div className="flex gap-4">
                <Button
                  icon={<PlusOutlined />}
                  type="primary"
                  className="flex ml-auto items-center rounded-sm"
                  onClick={handleCreateRole}
                  loading={loading}
                >
                  Create
                </Button>
                <Button
                  type="primary"
                  className="rounded-sm bg-red-500"
                  onClick={() => setCreateRole(!createRole)}
                >
                  Cancel
                </Button>
              </div>
            </Form>
          ) : createPermission ? (
            <Form layout="vertical" form={form}>
              <Form.Item
                name="title"
                required
                rules={[
                  {
                    required: true,
                    message: "Please enter permission title",
                  },
                ]}
              >
                <Input
                  placeholder="Enter Permission title (i.e Create-Course)"
                  size="large"
                  className="rounded-sm"
                />
              </Form.Item>
              <Form.Item name="userLevel">
                <Select
                  placeholder="Select level"
                  showSearch
                  allowClear
                  size="large"
                  optionFilterProp="children"
                  filterOption={(input: any, option: any) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={[
                    {
                      label: "Business",
                      value: "business",
                    },
                    {
                      label: "Admin",
                      value: "admin",
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item
                name="description"
                required
                rules={[
                  {
                    required: true,
                    message: "Please enter permission description",
                  },
                ]}
              >
                <Input.TextArea
                  rows={4}
                  placeholder="Description"
                  size="large"
                  className="rounded-sm"
                />
              </Form.Item>

              <div className="flex gap-4">
                <Button
                  icon={<PlusOutlined />}
                  type="primary"
                  className="flex ml-auto items-center rounded-sm"
                  onClick={handleCreatePermission}
                  loading={loading}
                >
                  Create
                </Button>
                <Button
                  type="primary"
                  className="rounded-sm bg-red-500"
                  onClick={() => setCreatePermission(!createPermission)}
                >
                  Cancel
                </Button>
              </div>
            </Form>
          ) : Config.API.HOME_URL === "http://localhost:3000" ? (
            <div className="flex gap-4">
              <Button
                type="primary"
                className="flex ml-auto rounded-sm"
                onClick={() => setCreateRole(!createRole)}
              >
                Create Role
              </Button>
              <Button
                type="primary"
                className=" rounded-sm"
                onClick={() => {
                  setCreatePermission(!createPermission);
                }}
              >
                Create Permission
              </Button>
            </div>
          ) : (
            <></>
          )}
        </Container>
      </section>
      <section className="content-header">
        <Container fluid className="px-6">
          <PermissionsList
            allRoles={allRoles}
            allPermissions={allPermissions}
            fetchAllRoles={fetchAllRoles}
            rolesAccessPermissions={rolesAccessPermissions}
            fetchAccessPermissionRoles={fetchAccessPermissionRoles}
            fetchAllPermissions={fetchAllPermissions}
            permissionLoading={loading}
          />
        </Container>
      </section>
    </Fragment>
  );
};

export default memo(ManagePermissions);
