"use client";
import React, { Fragment, useEffect, useState } from "react";
// next components
import NextLink from "next/link";
// antd components
import { Button, Avatar, Typography, Card, Divider } from "antd";
import {
  EditOutlined,
  MailOutlined,
  PhoneOutlined,
  CommentOutlined,
  UserOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
// app components
import IconText from "@/components/shared/IconText";
import Container from "@/components/shared/container";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { UserListInt } from "@/components/pages/Admin/ManageUsers/user.interface";
import config from "@/app/utils/config";
import { useSession } from "next-auth/react";
import axiosInstance from "@/app/utils/axios-config";
import { handleAxiosError } from "@/app/utils/axiosError";
import Image from "next/image";

const UserDetails = () => {
  const { data: session, status } = useSession();
  const [userDetail, setUserDetail] = useState<UserListInt>();
  const router = useRouter();
  const params = useParams();
  const userId = params.id;
  console.log(userId);
  const fetchUserDetails = async () => {
    try {
      const res = await axiosInstance.get(`/users/${userId}`);
      if (res.status) {
        // console.log(res.data);
        setUserDetail(res.data.data);
      }
    } catch (error) {
      handleAxiosError(error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <Fragment>
      <section className="content-header pt-6">
        <Container className="container-fluid px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex-grow">
              <Button type="link" className="p-0" onClick={() => router.back()}>
                <ArrowLeftOutlined /> Back
              </Button>
              <Typography.Title level={3} className="mb-0">
                User Details
              </Typography.Title>
            </div>
            <div className="shrink">
              <Divider type="vertical" />
              {/* <NextLink href="/admin/messages/2" passHref> */}
              <Button
                size="large"
                className="rounded-md bg-transparent hover:bg-purple-500 hover:text-purple-60"
              >
                <IconText
                  text="Message"
                  title={`Chat with ${userDetail?.firstname}`}
                  icon={<CommentOutlined />}
                  className=""
                />
              </Button>
              {/* </NextLink> */}
            </div>
          </div>
        </Container>
      </section>
      <Divider />
      <section className="content-title">
        <Container className="container-fluid px-6 pb-6">
          <div className="flex justify-between items-start gap-4">
            {userDetail?.imageUrl ? (
              <div className="">
                <Avatar
                  size={64}
                  icon={
                    <Image
                      src={userDetail?.imageUrl}
                      alt="profile picture"
                      className="rounded-full justify-self-start"
                      width={60}
                      height={60}
                    />
                  }
                />
              </div>
            ) : (
              <Avatar
                size={64}
                className="bg-purple-400 shrink-0"
                icon={<UserOutlined />}
              />
            )}
            <div className="grow">
              <Typography.Title level={4} className="mb-1">
                {userDetail?.firstname} {userDetail?.lastname}
              </Typography.Title>
              <div className="">
                <NextLink href="mailto:emma.smith@gmail.com" passHref>
                  <Typography.Link>
                    <IconText
                      text={userDetail?.email || "N/A"}
                      title="Mail emma"
                      icon={<MailOutlined />}
                      className="text-gray-500 w-full gap-2 mb-0.5 hover:text-purple-500 transition"
                    />
                  </Typography.Link>
                </NextLink>
                <NextLink href={`tel:${userDetail?.phone}`} passHref>
                  <Typography.Link>
                    <IconText
                      text={userDetail?.phone || "N/A"}
                      title="call emma"
                      icon={<PhoneOutlined />}
                      className="text-gray-500 w-full gap-2 hover:text-purple-500 transition"
                    />
                  </Typography.Link>
                </NextLink>
              </div>
            </div>
          </div>
        </Container>
      </section>
      <section className="content-header">
        <Container className="container-fluid px-6 pb-6">
          <Card>
            <Typography.Title level={5} className="mb-0">
              Details
            </Typography.Title>
            <Divider />
            <div className="">
              <Typography.Text type="secondary">
                Email Verified:
              </Typography.Text>
              <Typography.Paragraph>
                {`${userDetail?.isEmailVerify ? "True" : "False"}`}
              </Typography.Paragraph>
            </div>
            <div className="">
              <Typography.Text type="secondary">Status:</Typography.Text>
              <Typography.Paragraph>
                {userDetail?.status ? "Active" : "Inactive"}
              </Typography.Paragraph>
            </div>
            <div className="">
              <Typography.Text type="secondary">Date Created:</Typography.Text>
              <Typography.Paragraph>
                {userDetail?.createdAt ? new Date(`${userDetail?.createdAt}`).toDateString() : "N/A"}
              </Typography.Paragraph>
            </div>
            {/* <div className="">
              <Typography.Text type="secondary">Last Login:</Typography.Text>
              <Typography.Paragraph>05 July, 2022</Typography.Paragraph>
            </div> */}
            <div className="">
              <Typography.Text type="secondary">Country:</Typography.Text>
              <Typography.Paragraph>{userDetail?.country || "N/A"}</Typography.Paragraph>
            </div>
            <div className="">
              <Typography.Text type="secondary">City:</Typography.Text>
              <Typography.Paragraph>{userDetail?.city || "N/A"}</Typography.Paragraph>
            </div>
          </Card>
        </Container>
      </section>
    </Fragment>
  );
};

export default UserDetails;
