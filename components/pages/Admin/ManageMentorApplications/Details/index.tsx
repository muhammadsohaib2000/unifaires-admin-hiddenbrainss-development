/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState, useCallback } from "react";
import NextLink from "next/link";
import { Button, Avatar, Typography, Card, Divider, Spin, Tag } from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  CommentOutlined,
  UserOutlined,
  ArrowLeftOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import IconText from "@/components/shared/IconText";
import Container from "@/components/shared/container";
import { useParams, useRouter } from "next/navigation";
import axiosInstance from "@/app/utils/axios-config";
import { handleAxiosError } from "@/app/utils/axiosError";
import Image from "next/image";

const MentorDetails = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [mentorObj, setMentorObj] = useState<any>();
  const router = useRouter();
  const params = useParams();
  const userId = params?.id;

  const fetchUserDetails = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/mentorships/${userId}`);
      console.log({ res });
      if (res?.data?.data) {
        setMentorObj(res.data.data);
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Get mentor full name
   */
  const getFullName = useCallback(() => {
    let result = "";
    if (
      typeof mentorObj?.firstname === "string" &&
      mentorObj.firstname.trim() !== ""
    ) {
      result += mentorObj.firstname;
    }
    if (
      typeof mentorObj?.firstname === "string" &&
      mentorObj.firstname.trim() !== "" &&
      typeof mentorObj?.lastname === "string" &&
      mentorObj.lastname.trim() !== ""
    ) {
      result += " ";
    }
    if (
      typeof mentorObj?.lastname === "string" &&
      mentorObj.lastname.trim() !== ""
    ) {
      result += mentorObj.lastname;
    }

    return result;
  }, [mentorObj]);

  /**
   * Get mentor skills
   */
  const getSkills = useCallback(() => {
    if (!(Array.isArray(mentorObj?.skills) && mentorObj.skills.length > 0)) {
      return <>N/A</>;
    }
    const result = mentorObj.skills.map((skill: any) => {
      return (
        <Tag
          key={skill?.id}
          className="text-[#5832DA] bg-[#D2C5FD] rounded-full border-none px-4 py-1 mt-2"
        >
          {skill?.name}
        </Tag>
      );
    });

    return result;
  }, [mentorObj]);

  useEffect(() => {
    fetchUserDetails();
  }, [userId]);

  return (
    <>
      <section className="content-header pt-6">
        <Container className="container-fluid px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex-grow">
              <Button type="link" className="p-0" onClick={() => router.back()}>
                <ArrowLeftOutlined /> Back
              </Button>
              <Typography.Title level={3} className="mb-0">
                Mentor Details
              </Typography.Title>
            </div>
            <div className={`shrink ${loading ? "hidden" : ""}`}>
              <Divider type="vertical" />
              <Button
                size="large"
                className="rounded-md bg-transparent hover:bg-purple-500 hover:text-purple-60"
              >
                <IconText
                  text="Message"
                  title={`Chat with ${
                    typeof mentorObj?.firstname === "string"
                      ? mentorObj.firstname
                      : ""
                  }`}
                  icon={<CommentOutlined />}
                  className=""
                />
              </Button>
            </div>
          </div>
        </Container>
      </section>
      <Divider />
      <Spin
        spinning={loading}
        indicator={
          <LoadingOutlined className="flex items-center justify-center text-4xl" />
        }
      >
        <section className="content-title">
          <Container className="container-fluid px-6 pb-6">
            <div className="flex justify-between items-start gap-4">
              {typeof mentorObj?.mediaUrl === "string" &&
              mentorObj.mediaUrl.trim() !== "" ? (
                <div className="">
                  <Avatar
                    size={64}
                    icon={
                      <img
                        src={mentorObj.mediaUrl}
                        alt="profile picture"
                        className="rounded-full justify-self-start w-[60px] h-[60px]"
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
                  {getFullName()}
                </Typography.Title>
                <div className="">
                  <NextLink
                    href={`mailto:${
                      typeof mentorObj?.email === "string"
                        ? mentorObj.email
                        : ""
                    }`}
                    passHref
                  >
                    <Typography.Link>
                      <IconText
                        text={
                          typeof mentorObj?.email === "string" &&
                          mentorObj.email.trim() !== ""
                            ? mentorObj.email
                            : "N/A"
                        }
                        title={`Mail ${getFullName()}`}
                        icon={<MailOutlined />}
                        className="text-gray-500 w-full gap-2 mb-0.5 hover:text-purple-500 transition"
                      />
                    </Typography.Link>
                  </NextLink>
                  <NextLink
                    href={`tel:${
                      typeof mentorObj?.phonenumber === "string" &&
                      mentorObj.phonenumber.trim() !== ""
                        ? mentorObj.phonenumber
                        : ""
                    }`}
                    passHref
                  >
                    <Typography.Link>
                      <IconText
                        text={
                          typeof mentorObj?.phonenumber === "string" &&
                          mentorObj.phonenumber.trim() !== ""
                            ? mentorObj.phonenumber
                            : "N/A"
                        }
                        title={`call ${getFullName()}`}
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
              <div>
                <Typography.Text type="secondary">Job:</Typography.Text>
                <Typography.Paragraph>
                  {`${
                    typeof mentorObj?.currentJobTitle === "string" &&
                    mentorObj.currentJobTitle.trim() !== ""
                      ? mentorObj.currentJobTitle
                      : "N/A"
                  }`}
                </Typography.Paragraph>
              </div>
              <div>
                <Typography.Text type="secondary">
                  Organization:
                </Typography.Text>
                <Typography.Paragraph>
                  {`${
                    typeof mentorObj?.currentOrganization === "string" &&
                    mentorObj.currentOrganization.trim() !== ""
                      ? mentorObj.currentOrganization
                      : "N/A"
                  }`}
                </Typography.Paragraph>
              </div>
              <div>
                <Typography.Text type="secondary">Country:</Typography.Text>
                <Typography.Paragraph>
                  {typeof mentorObj?.country === "string" &&
                  mentorObj.country.trim() !== ""
                    ? mentorObj.country
                    : "N/A"}
                </Typography.Paragraph>
              </div>
              <div>
                <Typography.Text type="secondary">
                  Date Created:
                </Typography.Text>
                <Typography.Paragraph>
                  {mentorObj?.createdAt
                    ? new Date(`${mentorObj?.createdAt}`).toDateString()
                    : "N/A"}
                </Typography.Paragraph>
              </div>
              <div>
                <Typography.Text type="secondary">
                  Skills & Expertises:
                </Typography.Text>
                <Typography.Paragraph>{getSkills()}</Typography.Paragraph>
              </div>
              <div>
                <Typography.Text type="secondary">About:</Typography.Text>
                <Typography.Paragraph>
                  {typeof mentorObj?.about === "string" &&
                  mentorObj.about.trim() !== ""
                    ? mentorObj.about
                    : "N/A"}
                </Typography.Paragraph>
              </div>
            </Card>
          </Container>
        </section>
      </Spin>
    </>
  );
};

export default MentorDetails;
