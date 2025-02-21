"use client";
import { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Divider,
  Typography,
  Breadcrumb,
  Space,
} from "antd";
import Container from "@/components/shared/container";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import axiosInstance from "@/app/utils/axios-config";
import { handleAxiosError } from "@/app/utils/axiosError";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Config from "@/app/utils/config";

const CreateInvitations = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [allRoles, setAllRoles] = useState<any>();
  const [allRolePermissions, setAllRolePermissions] = useState<any>();
  const [permissionsSelectOption, setPermissionsSelectOption] = useState<any>(
    []
  );
  console;

  const fetchAllRoles = async () => {
    try {
      const res = await axiosInstance.get("/access-roles");

      if (Array.isArray(res?.data?.data)) {
        setAllRoles(res.data.data);
      }
    } catch (error) {
      handleAxiosError(error);
    }
  };
  const fetchAllPermissions = async () => {
    try {
      const res = await axiosInstance.get("/access-roles-permissions");
      if (Array.isArray(res?.data?.data)) {
        setAllRolePermissions(res.data.data);
      }
    } catch (error) {
      handleAxiosError(error);
    }
  };

  const handleFinish = async () => {
    const formData = form.getFieldsValue();
    await form.validateFields();

    if (formData.users.length > 0) {
      const modifiedFormData = (
        Array.isArray(formData?.users) ? formData.users : []
      ).map((user: any) => {
        return {
          ...user,
          roleIds: [user?.roleIds],
          permissionIds: (Array.isArray(user?.permissionIds)
            ? user.permissionIds
            : []
          ).map((itemObj1: any) => {
            return itemObj1?.value;
          }),
          text: formData?.text || "Invitation",
        };
      });
      const reqBody = {
        invites: modifiedFormData,
      };

      try {
        setLoading(true);
        const res = await axiosInstance.post("/invite", {
          ...reqBody,
        });
        if (res.status) {
          toast.success("Invite Sent Successfully");
          router.push("/dashboard/manage-accounts/invitations");
        }
      } catch (error) {
        handleAxiosError(error);
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Please add at least one user");
    }
  };

  /**
   * Create permission select options
   */
  function createPermissionSelectOptions(dataObj: {
    roleId: string;
    rowKey: number;
  }) {
    if (
      !(
        typeof dataObj?.roleId === "string" &&
        typeof dataObj?.rowKey !== "undefined" &&
        dataObj.roleId.trim() !== ""
      )
    ) {
      setPermissionsSelectOption([]);
      setPermissionFieldValues({ key: dataObj.rowKey, permissions: [] });
      return;
    }
    const roleObj: any = (
      Array.isArray(allRolePermissions) ? allRolePermissions : []
    ).find((itemObj: any) => {
      return (
        typeof itemObj?.id === "string" &&
        itemObj.id.toLowerCase().trim() === dataObj.roleId.toLowerCase().trim()
      );
    });
    if (
      !(
        Array.isArray(roleObj?.accessrolepermissions) &&
        roleObj.accessrolepermissions.length > 0
      )
    ) {
      setPermissionsSelectOption([]);
      setPermissionFieldValues({ key: dataObj.rowKey, permissions: [] });
      return;
    }
    const roleTitle: string =
      typeof roleObj?.title === "string" ? roleObj.title : "";
    const resultArr = roleObj.accessrolepermissions.map((itemObj: any) => {
      let pTitle: string = (
        typeof itemObj?.accesspermission?.title === "string"
          ? itemObj.accesspermission.title
          : ""
      ).replace(/_/g, " ");
      if (
        !["help support assign ticket", "job approve"].includes(pTitle) &&
        roleTitle.toLowerCase().trim() === Config.ROLE_LIST.contributor
      ) {
        pTitle += " (Own Content)";
      }

      return {
        label: pTitle,
        value: itemObj?.accesspermissionId,
      };
    });
    setPermissionFieldValues({ key: dataObj.rowKey, permissions: resultArr });
    setPermissionsSelectOption(resultArr);
  }

  /**
   * Setting the permission field values
   */
  function setPermissionFieldValues(dataObj: { key: any; permissions: any }) {
    const currentUsers = form.getFieldValue("users") || [];
    currentUsers[dataObj.key] = {
      ...currentUsers[dataObj?.key],
      permissionIds: dataObj?.permissions,
    };
    form.setFieldsValue({ users: currentUsers });
  }

  useEffect(() => {
    fetchAllRoles();
    fetchAllPermissions();
  }, []);

  const rolesSelectOption =
    allRoles &&
    allRoles.map((role: any) => {
      return {
        label: role?.title,
        value: role?.id,
      };
    });

  return (
    <>
      <div>
        <section className="content-header">
          <Container className="px-6 pt-6 container-fluid">
            <Breadcrumb
              items={[
                {
                  title: "Manage Accounts",
                  href: "/dashboard/manage-accounts",
                },
                {
                  title: "Invitations",
                  href: "/dashboard/manage-accounts/invitations",
                },
                { title: "Create Invitations" },
              ]}
            />
            <div className="mt-3">
              <Typography.Title level={2} className="mb-0">
                Invite Users To Your Account
              </Typography.Title>
              <Typography.Paragraph className="mb-0 max-w-2xl">
                Invite users into your account by entering semi-colon separated
                email addresses below and we’ll send them an email with a link
                they can use to set up their login details.
              </Typography.Paragraph>
            </div>
          </Container>
        </section>
        <Divider />

        <section className="content-body">
          <Container className="px-6 pb-6 container-fluid">
            <Form
              name="dynamic_form_nest_item"
              size="large"
              form={form}
              layout="vertical"
              onFinish={handleFinish}
              autoComplete="off"
              className="mt-4"
              initialValues={{
                users: [{}],
              }}
            >
              <Form.List name="users">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space
                        key={key}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: 8,
                        }}
                        align="baseline"
                      >
                        <Form.Item
                          name={[name, "email"]}
                          label="Email"
                          required
                          tooltip="This is a required field"
                          rules={[
                            {
                              required: true,
                              message: "Please enter email",
                            },
                          ]}
                        >
                          <Input size="large" placeholder="Email" />
                        </Form.Item>

                        <Form.Item
                          name={[name, "invitedUserType"]}
                          label="User Type  "
                          required
                          tooltip="This is a required field"
                          rules={[
                            {
                              required: true,
                              message: "Please select user type ",
                            },
                          ]}
                        >
                          <Select
                            allowClear
                            showSearch
                            size="large"
                            placeholder="Select user type "
                            options={[
                              {
                                value: "user",
                                label: "User",
                              },
                              // {
                              //   value: "business",
                              //   label: "Business",
                              // },
                            ]}
                          />
                        </Form.Item>
                        <Form.Item
                          name={[name, "roleIds"]}
                          label="Role"
                          required
                          tooltip="This is a required field"
                          rules={[
                            {
                              required: true,
                              message:
                                "Please select roles you desire to give to user",
                            },
                          ]}
                        >
                          <Select
                            allowClear
                            showSearch
                            size="large"
                            className="min-w-[170px]"
                            placeholder="Select users role"
                            options={rolesSelectOption}
                            onChange={(value) => {
                              createPermissionSelectOptions({
                                roleId: value,
                                rowKey: key,
                              });
                            }}
                          />
                        </Form.Item>
                        <Form.Item
                          name={[name, "permissionIds"]}
                          label="Permissions"
                          required
                          tooltip="This is a required field"
                        >
                          <Select
                            mode="tags"
                            allowClear
                            showSearch
                            size="large"
                            className="min-w-[300px]"
                            placeholder="Select users permission"
                            options={permissionsSelectOption}
                          />
                        </Form.Item>
                        <div className="flex items-center justify-center ">
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </div>
                      </Space>
                    ))}
                    <Form.Item>
                      <Button
                        type="link"
                        onClick={() => add()}
                        className="text-purple-50 mt-6"
                        icon={
                          <PlusOutlined
                            style={{ color: "#5832DA" }}
                            className="rounded-full p-2 bg-purple-60"
                          />
                        }
                      >
                        Add User
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
              <Form.Item name="text" label="Add a Personal Message (Optional) ">
                <Input.TextArea
                  rows={6}
                  size="large"
                  placeholder="Personal invitation message"
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Send Invite
                </Button>
              </Form.Item>
            </Form>
          </Container>
        </section>
      </div>
    </>
  );
};

export default CreateInvitations;
