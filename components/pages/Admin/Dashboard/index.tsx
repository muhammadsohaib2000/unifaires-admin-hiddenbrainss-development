"use client";
import React, { Fragment } from "react";
// next component
// antd components
import {
  Row,
  Col,
  Form,
  Space,
  Input,
  Button,
  Checkbox,
  Typography,
} from "antd";
import {
  PlusOutlined,
  TeamOutlined,
  AuditOutlined,
  WalletOutlined,
  SafetyOutlined,
  ProfileOutlined,
  SettingOutlined,
  CommentOutlined,
  UserSwitchOutlined,
  ExclamationCircleOutlined,
  BookOutlined,
} from "@ant-design/icons";
// app component
import Container from "@/components/shared/container";
import DashboardMenuCard, { DashboardMenuCardPops } from "./DashboardMenuCard";
import { checkBoxButtonLabelClass } from "@/components/shared/buttons/CheckboxButton";
import Skills from "./Skills";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";

const Dashboard = () => {
  const adminDashboardMenuItems: DashboardMenuCardPops[] = [
    {
      link: "/dashboard/manage-accounts",
      title: "Manage Account",
      icon: <SafetyOutlined />,
      description: (
        <Typography.Paragraph>
          See relevant insights about accounts
        </Typography.Paragraph>
      ),
    },
    {
      link: "/dashboard/courses",
      title: "Manage Contents",
      icon: <TeamOutlined />,
      description: (
        <Typography.Paragraph>
          See relevant insights about contents
        </Typography.Paragraph>
      ),
    },
    {
      link: "/dashboard/jobs",
      title: "Manage Jobs",
      icon: <AuditOutlined />,
      description: (
        <Typography.Paragraph>
          See relevant insights about jobs
        </Typography.Paragraph>
      ),
    },
    {
      link: "/dashboard/funding",
      title: "Manage Fundings",
      icon: <WalletOutlined />,
      description: (
        <Typography.Paragraph>
          See relevant insights about fundings
        </Typography.Paragraph>
      ),
    },
    {
      link: "/dashboard/payment",
      title: "Bills & Payments",
      icon: <ProfileOutlined />,
      description: (
        <Typography.Paragraph>
          See relevant insights about bills & payments
        </Typography.Paragraph>
      ),
    },
    {
      link: "/dashboard/settings",
      title: "Settings",
      icon: <SettingOutlined />,
      description: (
        <Typography.Paragraph>
          See relevant insights about settings
        </Typography.Paragraph>
      ),
    },
    {
      link: "/dashboard/help",
      title: "Help",
      icon: <ExclamationCircleOutlined />,
      description: (
        <Typography.Paragraph>
          See relevant insights about help
        </Typography.Paragraph>
      ),
    },
    {
      link: "/dashboard/pricing-system",
      title: "Pricing Index & System",
      icon: <BookOutlined />,
      description: (
        <Typography.Paragraph>
          See relevant insights about pricing index & system
        </Typography.Paragraph>
      ),
    },
  ];

  const myProfile: any = useAppSelector(
    (state: RootState) => state.user.myProfile
  );
  return (
    <Fragment>
      <section>
        <Container className="p-6 container-fluid">
          <Row gutter={16} className="w-full">
            <Col xs={24} lg={24}>
              <Typography.Title level={2} className="mb-0">
                Dashboard
              </Typography.Title>
              <Typography.Paragraph>
                Welcome {myProfile.firstname}, here are your daily analytics
              </Typography.Paragraph>
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container className="p-6 container-fluid">
          <Row gutter={[16, 16]}>
            {adminDashboardMenuItems.map((items, index) => (
              <Col key={`menu-items-${index}`} xs={24} sm={12} lg={8}>
                <DashboardMenuCard {...items} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </Fragment>
  );
};

export default Dashboard;
