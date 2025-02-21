"use client";
import {
  Typography,
  // Paragraph,
  Row,
  Col,
  Space,
  Tabs,
  Input,
  Form,
  Button,
  Modal,
  Divider,
} from "antd";
import { useEffect, useState } from "react";
import MobileView from "./tabs/MobileView";
import config from "@/app/utils/config";
import { signOut, useSession } from "next-auth/react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import axiosInstance from "@/app/utils/axios-config";
import { toast } from "react-toastify";
import { fetchUserProfile } from "@/redux/features/UserSlice";
import { handleAxiosError, showSuccess } from "@/app/utils/axiosError";
// import Paragraph from "antd/es/skeleton/Paragraph";

interface VerifyTokenProps {
  Token: string;
}

interface PasswordResetProps {
  OldPassword: string;
  Password: string;
  Confirm: string;
}

interface UserDetailsProps {
  FirstName: string;
  LastName: string;
}

const Account = () => {
  const { data: session, status, update: sessionUpdate } = useSession();
  const { Paragraph, Link } = Typography;
  const [editForm] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const { Title, Text } = Typography;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);
  const [deleteAccount, setDeleteAccount] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch: any = useAppDispatch();

  const openModal = () => {
    setIsModalVisible(true);
  };

  // Function to close the modal
  const closeModal = () => {
    editForm.resetFields();
    setIsModalVisible(false);
  };

  const closeDeleteAccount = () => {
    setDeleteAccount(false);
  };

  const openPasswordModal = () => {
    setIsPasswordModalVisible(true);
  };

  // Function to close the modal
  const closePasswordModal = () => {
    passwordForm.resetFields();
    setIsPasswordModalVisible(false);
  };

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768); // Adjust the breakpoint as needed
    };

    // console.log("Account page line 79 ===>", session);

    // Add an event listener for window resize
    window.addEventListener("resize", handleResize);

    // Initial check
    handleResize();

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    dispatch(fetchUserProfile("user"));
  }, []);

  const myProfile = useAppSelector((state: any) => state.user.myProfile);

  // console.log(myProfile);

  // GET TOKEN FOR ACCOUNT DEACTIVATION
  async function getAccountDeactivationToken() {
    const email = myProfile?.email;
    setLoading(true);
    try {
      const response = await axiosInstance.post("/auth/reset-user-token", {
        email: email,
      });

      if (response.status) {
        toast.success("Token Sent");
      }
    } catch (error) {
      handleAxiosError(error);
    }

    setLoading(false);
  }

  // VERIFY TOKEN FOR ACCOUNT DEACTIVATION
  const verifyTokenForAccountDeactivation = async (val: VerifyTokenProps) => {
    setLoading(true);
    const email = myProfile?.email;

    try {
      // setToken(val)
      const response = await axiosInstance.post("/auth/verify-user-token", {
        email: email,
        token: val.Token,
      });

      if (response.status) {
        toast.success(response.data.data.message);
        deactivateAccount(val.Token);
        setDeleteAccount(false);
      }
    } catch (error) {
      handleAxiosError(error);
    }
    setLoading(false);
    // console.log(response, data)
  };

  // DEACTIVATE USER ACCOUNT FUNCTION
  async function deactivateAccount(token: string) {
    // console.log(JSON.stringify({email,token}))
    setLoading(true);
    const email = myProfile?.email;
    try {
      const response = await axiosInstance.post("/auth/user-deactivate", {
        email: email,
        token: token,
      });
      if (response.status) {
        toast.success("Deactivation Successful");
        setDeleteAccount(false);
        signOut();
      }
    } catch (error) {
      handleAxiosError(error);
    }
    setLoading(false);
  }

  // PASSWORD RESET FUNCTIONALITY
  async function handlePasswordReset(val: PasswordResetProps) {
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        "/auth/old-reset-user-password",
        {
          oldPassword: val.OldPassword,
          password: val.Password,
        }
      );

      if (response.status) {
        closePasswordModal();
        toast.success("Your password has been reset successfully");
        val.Confirm = "";
        val.OldPassword = "";
        val.Password = "";
      }
    } catch (error) {
      handleAxiosError(error);
    }
    setLoading(false);
  }

  // UPDATE USER FIRST AND LAST NAME
  async function updateUserNames(val: UserDetailsProps) {
    setLoading(true);
    await axiosInstance
      .put(`/user/${session?.user?.id}`, {
        firstname: val.FirstName,
        lastname: val.LastName,
      })
      .then((res) => {
        dispatch(fetchUserProfile("user"));
        closeModal();
        showSuccess("Details Updated Successfully");
      })
      .catch((error) => {
        console.log("here is the error", error);
        handleAxiosError(error);
      });
    setLoading(false);
  }

  return (
    <>
      <Title level={4} className="py-4">
        Account Details
      </Title>
      <div className="p-4 border-gray-300 border-[1px] bg-gray-100 rounded-lg lg:w-1/2 md:w-1/2 my-3 sm-w-full">
        <div className="flex flex-row gap-8">
          <Typography.Paragraph className="font-semibold">
            First Name:
          </Typography.Paragraph>
          <Typography.Paragraph className="font-semibold">
            {myProfile?.firstname}
          </Typography.Paragraph>
        </div>
        <div className="flex flex-row gap-8">
          <Typography.Paragraph className="font-semibold">
            Last Name:
          </Typography.Paragraph>
          <Typography.Paragraph className="font-semibold">
            {myProfile?.lastname}
          </Typography.Paragraph>
        </div>
        <div className="flex flex-row gap-8">
          <Typography.Paragraph className="font-semibold">
            Email Address:
          </Typography.Paragraph>
          <Typography.Paragraph className="font-semibold">
            {myProfile?.email}
          </Typography.Paragraph>
        </div>

        <div className=" text-purple-50 font-small cursor-pointer">
          <Button
            type="text"
            size="middle"
            onClick={openModal}
            className="flex ml-auto border-none text-purple-50"
          >
            Edit
          </Button>
        </div>
      </div>

      <Space
        size={95}
        className="border-gray-300 border-[1px] bg-gray-100 p-3 rounded-lg lg:w-1/2 md:w-[50%] sm-w-full"
      >
        <Text className="font-small">Password</Text>
        <Text
          className="text-purple-50 font-small cursor-pointer"
          onClick={openPasswordModal}
        >
          Change Password
        </Text>
      </Space>
      <Divider />
      <div className="my-3">
        <Typography.Paragraph>
          <span className="font-bold">Warning: </span>
          this action can not be undone. Your information will be deleted.
        </Typography.Paragraph>
        {myProfile && myProfile?.status ? (
          <Button
            className="w-[45%] bg-transparent h-[50px] rounded-sm  text-red-500 border-red-500"
            onClick={getAccountDeactivationToken}
            loading={loading}
          >
            Deactivate Account
          </Button>
        ) : (
          <Button
            className="w-[45%] bg-transparent h-[50px] rounded-sm  text-green-500 border-green-500"
            onClick={getAccountDeactivationToken}
            loading={loading}
          >
            Activate Account
          </Button>
        )}

        <Modal
          onCancel={closeDeleteAccount}
          open={deleteAccount}
          onOk={closeDeleteAccount}
          footer={null}
        >
          <Typography className="text-red-500 font-semibold py-4">
            Do you want to deactivate your account?
          </Typography>

          <Paragraph className="capitalize pt-[1rem] font-bold">
            Please provide the 6 digit token sent to your email
          </Paragraph>
          <Form
            name="normal_login"
            initialValues={{ remember: true }}
            onFinish={verifyTokenForAccountDeactivation}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
          >
            <Row gutter={[8, 4]}>
              <Col xl={24} sm={24} xs={24} className="pt-5">
                <Form.Item
                  name="Token"
                  label="6-Digit Token"
                  rules={[
                    {
                      required: true,
                      message:
                        "Please provide the 6 digit token sent to your email for verification",
                    },
                    {
                      len: 6,
                      message: "Token must me a 6-Digit character",
                    },
                  ]}
                >
                  <Input placeholder="000000" size="large" />
                </Form.Item>
              </Col>
              <Col xl={24} xs={24} className="text-base font-semibold">
                <Form.Item>
                  <Button
                    className="text-base font-bold"
                    type="primary"
                    size="large"
                    block
                    htmlType="submit"
                    loading={loading}
                  >
                    Verify Token
                  </Button>
                </Form.Item>
              </Col>
              <Col
                xl={24}
                xs={24}
                className="text-center text-base font-semibold"
              ></Col>
            </Row>
          </Form>

          {/* <Form onFinish={verifyTokenForAccountDeactivation}>
            
            <Form.Item
              name="Token"
              className="block"
              label="Please provide the 6-digit code sent to your email"
              rules={[
                {
                  required: true,
                  message: "Please input your your 6-digit token!",
                },
              ]}
              >
              <Input placeholder="******" size="large" className="block"/>
            </Form.Item>
            <div className="flex flex-row gap-4 mt-6">
              <Button
                type="default"
                size="middle"
                className="flex ml-auto"
                onClick={closeDeleteAccount}
              >
                Cancel
              </Button>
              <Button type="primary" size="middle" className="bg-red-500">
                Yes
              </Button>
            </div>
          </Form> */}
        </Modal>
      </div>
      {/* Edit Name and Email Modal */}
      <Modal
        onCancel={closeModal}
        open={isModalVisible}
        onOk={closeModal}
        footer={null}
      >
        <Form
          layout="vertical"
          size="large"
          form={editForm}
          onFinish={updateUserNames}
        >
          <Form.Item
            required
            label="First Name"
            name="FirstName"
            className="mb-0"
          >
            <Input
              className="rounded-sm"
              placeholder="First Name"
              defaultValue={myProfile?.firstname}
            />
          </Form.Item>
          <Form.Item
            required
            label="Last Name"
            name="LastName"
            className="mb-0 mt-5"
          >
            <Input
              className="rounded-sm"
              placeholder="Last Name"
              defaultValue={myProfile?.lastname}
            />
          </Form.Item>
          {/* <Form.Item
            required
            label="Email Address"
            name="email"
            className="mb-0"
          >
            <Input className="rounded-sm" placeholder="example@gmail.com" />
          </Form.Item> */}
          <div className="mt-4">
            <Button
              type="primary"
              size="large"
              className="flex ml-auto"
              loading={loading}
              htmlType="submit"
            >
              Save
            </Button>
          </div>
        </Form>
      </Modal>
      <Modal
        onCancel={closePasswordModal}
        open={isPasswordModalVisible}
        onOk={closePasswordModal}
        footer={null}
      >
        <Form
          layout="vertical"
          size="large"
          form={passwordForm}
          onFinish={handlePasswordReset}
        >
          <Form.Item
            required
            label="Old Password"
            name="OldPassword"
            className="mb-0"
          >
            <Input.Password
              className="rounded-sm"
              placeholder="Enter Previous Password"
            />
          </Form.Item>
          <Form.Item
            name="Password"
            label="New Password"
            className="mb-0"
            rules={[
              {
                required: true,
                message:
                  "Password must contain one digit from 1 to 9, one lowercase letter, one uppercase letter, one special character, no space, and it must be 8-16 characters long.",
                pattern: new RegExp(
                  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/
                ),
              },
            ]}
            hasFeedback
          >
            <Input.Password
              placeholder="Password"
              className="rounded-sm"
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="Confirm"
            label="Confirm Password"
            dependencies={["Password"]}
            hasFeedback
            className="mb-0"
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("Password") === value) {
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
              className="rounded-sm"
              size="large"
            />
          </Form.Item>

          <div className="mt-4">
            <Button
              type="primary"
              size="large"
              className="flex ml-auto"
              loading={loading}
              htmlType="submit"
            >
              Change
            </Button>
          </div>
        </Form>
      </Modal>
      {isSmallScreen ? <MobileView /> : null}
    </>
  );
};
export default Account;
