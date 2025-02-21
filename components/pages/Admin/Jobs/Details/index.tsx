"use client";
import React, { Fragment } from "react";
// next
import NextLink from "next/link";
// antd and Icon components
import { Col, Row, Typography, Breadcrumb } from "antd";
import {
  GlobalOutlined,
  ClockCircleOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
// icons and images
import JobsImage from "@/public/images/courses/laravel.jpg";
// app components
import DetailsCard from "./DetailsCard";
import DetailsContent from "./DetailsContent";
import Container from "@/components/shared/container";
import ImageComponent from "@/components/shared/image";

const JobsDetails = () => {
  return (
    <Fragment>
      <section className="content-header">
        <Container fluid className="p-6">
          <Breadcrumb>
            <Breadcrumb.Item>
              <NextLink href="/dashboard/Jobs">Jobs</NextLink>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Jobs details</Breadcrumb.Item>
          </Breadcrumb>
        </Container>
      </section>
      <section className="content-hero border-b mb-6">
        <Container fluid className="px-6 pb-6">
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={16} xxl={18}>
              <div className="flex justify-start items-start gap-4">
                <div className="relative shrink-0 rounded-md aspect-square w-24 h-24 bg-grey-200 overflow-hidden">
                  <ImageComponent
                    layout="fill"
                    objectFit="cover"
                    src={JobsImage}
                    alt="paris picture"
                  />
                </div>
                <div className="grow">
                  <Typography.Title level={1} className="mb-2 text-3xl">
                    Agriculture, Food & Rural Development
                  </Typography.Title>
                  <Typography.Paragraph className="mb-2 max-w-xl text-lg opacity-90">
                    Lander & Fitch - Hamburg, Germany.
                  </Typography.Paragraph>
                  <div className="flex gap-3 flex-wrap items-center mb-4">
                    <Typography.Text className="flex items-center gap-1 flex-nowrap">
                      <ClockCircleOutlined className="" />
                      12 June 2022 - 30th June 2022
                    </Typography.Text>
                    <Typography.Text className="flex items-center gap-1 flex-nowrap">
                      <UsergroupAddOutlined type="secondary" /> 122 Funded
                    </Typography.Text>
                    <Typography.Text className="flex items-center gap-1 flex-nowrap">
                      <GlobalOutlined type="secondary" /> Academic issues
                    </Typography.Text>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="content-body">
        <Container fluid className="px-6">
          <Row gutter={[16, 16]}>
            <Col
              xs={{ span: 24, order: 2 }}
              lg={{ span: 16, order: 1 }}
              xxl={{ span: 18, order: 1 }}
            >
              <DetailsContent />
            </Col>
            <Col
              xs={{ span: 24, order: 1 }}
              lg={{ span: 8, order: 2 }}
              xxl={{ span: 6, order: 2 }}
            >
              <DetailsCard />
            </Col>
          </Row>
        </Container>
      </section>
    </Fragment>
  );
};

export default JobsDetails;
