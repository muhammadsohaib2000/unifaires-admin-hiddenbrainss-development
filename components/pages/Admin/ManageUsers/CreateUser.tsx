"use client";
import React, { useState } from "react";
import {
  Row,
  Col,
  Button,
  Form,
  Input,
  Typography,
  Select,
  DatePicker,
  Modal,
  message,
} from "antd";
import logo from "@/public/images/purple-logo.svg";
import Image from "next/image";
import moment from "moment";
import config from "@/app/utils/config";
import axios from "axios";
import { useSession } from "next-auth/react";

interface RegistrationProps {
  firstName: string;
  lastName: string;
  email: string;
  birthOfDate: string;
  gender: string;
  password: string;
  confirm: string;
  checkbox: boolean;
}

interface ModalInt {
  isModalOpen: boolean;
  setIsModalOpen: Function;
  fetchUsers: Function;
}

interface RoleInt {
  id: number;
  title: string;
}

const CreateUser: React.FC<ModalInt> = ({
  isModalOpen,
  setIsModalOpen,
  fetchUsers,
}) => {
  const { data: session, status } = useSession();
  const [form] = Form.useForm();
  const { Title, Paragraph } = Typography;
  const { Option } = Select;
  const [roleOptions, setRoleOptions] = useState<Array<RoleInt>>();
  const [loading, setLoading] = useState(false);

  //   const fetchRoleOptions = async () => {
  //     await axios
  //       .get(`${config.API.API_URL}/roles`, {
  //         headers: {
  //           "x-token": session?.user?.token,
  //         },
  //       })
  //       .then((res) => {
  //         const roleData = res.data.data;
  //         const formattedOptions = roleData.map((role) => {
  //           return role;
  //         });
  //         setRoleOptions(formattedOptions);
  //       });
  //   };

  //   useEffect(() => {
  //     fetchRoleOptions();
  //   }, []);

  const onFinish = async (val: RegistrationProps) => {
    setLoading(true);
    const formData = form.getFieldsValue();
    const fullName = formData.firstName + " " + formData.lastName;
    console.log(fullName);
    formData["fullname"] = fullName;
    formData["dateOfBirth"] = moment(val.birthOfDate).format("YYYY-MM-DD");
    delete formData.firstName;
    delete formData.lastName;
    await axios
      .post(`${config.API.API_URL}/auth/register`, {
        ...formData,
      })
      .then((res) => {
        console.log(res.data);
        if (res.status) {
          fetchUsers();
          closeModal();
          message.success("User Created Successfully");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    setLoading(false);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      open={isModalOpen}
      onOk={closeModal}
      onCancel={closeModal}
      width={800}
      footer={null}
    >
      <Row className="flex justify-center items-center">
        <Col xl={20} sm={24} xs={24} className="px-5 pt-5 xl:px-20 xl:pt-20">
          <Image src={logo} alt="logo" width={150} />

          <Form
            name="normal_login"
            initialValues={{ remember: true }}
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
          >
            <Row gutter={32}>
              <Col xl={12} sm={24} xs={24}>
                <Form.Item
                  name="firstName"
                  label="First name"
                  rules={[
                    {
                      required: true,
                      message: "Please input your First name!",
                    },
                  ]}
                >
                  <Input
                    placeholder="First name"
                    className="rounded-md"
                    size="large"
                  />
                </Form.Item>
              </Col>

              <Col xl={12} sm={24} xs={24}>
                <Form.Item
                  name="lastName"
                  label="Last name"
                  rules={[
                    {
                      required: true,
                      message: "Please input your last name!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Last name"
                    className="rounded-md"
                    size="large"
                  />
                </Form.Item>
              </Col>

              <Col xl={24} sm={24} xs={24}>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Email!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Email"
                    className="rounded-md"
                    size="large"
                  />
                </Form.Item>
              </Col>

              <Col xl={12} sm={24} xs={24}>
                <Form.Item
                  name="dateOfBirth"
                  label="Birth Date"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Birth Date!",
                    },
                  ]}
                >
                  <DatePicker
                    className="w-full"
                    size="large"
                    format="YYYY-MM-DD"
                  />
                </Form.Item>
              </Col>

              <Col xl={12} sm={24} xs={24}>
                <Form.Item
                  name="gender"
                  label="Gender"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Gender !",
                    },
                  ]}
                >
                  <Select
                    placeholder="Select a option and change input text above"
                    allowClear
                    size="large"
                  >
                    <Option value="male">male</Option>
                    <Option value="female">female</Option>
                    <Option value="other">other</Option>
                  </Select>
                </Form.Item>
              </Col>
              {/* <Col xl={12} sm={24} xs={24}>
                <Form.Item
                  name="role"
                  label="Role"
                  rules={[
                    {
                      required: true,
                      message: "Please select role !",
                    },
                  ]}
                >
                  <Select
                    placeholder="Select a option and change input text above"
                    allowClear
                    size="large"
                  >
                    {roleOptions?.map((role) => {
                      return (
                        <Option value={role.title} key={role.id}>
                          {role.title}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col> */}
              <Col lg={12} md={24} sm={24} xs={24}>
                <Form.Item
                  name="password"
                  //   rules={[
                  //     {
                  //       required: true,
                  //       message:
                  //         "Password must contain one digit from 1 to 9, one lowercase letter, one uppercase letter, one special character, no space, and it must be 8-16 characters long.",
                  //       pattern: new RegExp(
                  //         /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/
                  //       ),
                  //     },
                  //   ]}
                  hasFeedback
                >
                  <Input.Password
                    placeholder="Password"
                    className="rounded-md"
                    size="large"
                  />
                </Form.Item>
              </Col>

              <Col lg={12} md={24} sm={24} xs={24}>
                <Form.Item
                  //   name="confirm"
                  dependencies={["password"]}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your password!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(
                            "The two passwords that you entered do not match!"
                          )
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    placeholder=" Confrim Password"
                    className="rounded-md"
                    size="large"
                  />
                </Form.Item>
              </Col>

              <Col xl={24} className="py-5">
                <Form.Item>
                  <Button
                    loading={loading}
                    type="primary"
                    size="large"
                    block
                    htmlType="submit"
                  >
                    Create Account
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Modal>
  );
};

export default CreateUser;
