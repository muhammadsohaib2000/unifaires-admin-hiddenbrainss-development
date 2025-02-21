"use client";
import React, { useState } from "react";
// next
import NextLink from "next/link";
// ant component and icons
import { Menu, MenuProps, Typography } from "antd";
import {
  HomeOutlined,
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
import ComingSoonModal from "@/components/shared/Soon/ComingSoonModal";
interface SidebarMenuProps {
  selectedKeys: string;
}

const SidebarMenu = ({ selectedKeys }: SidebarMenuProps) => {
  const [comingSoon, setComingSoon] = useState(false);
  const openComingSoon = () => {
    setComingSoon(true);
  };

  // admin dashboard sidebar menu items[]
  const items: MenuProps["items"] = [
    {
      label: <NextLink href="/dashboard/">Home</NextLink>,
      key: "/dashboard",
      icon: <HomeOutlined />,
    },
    {
      label: (
        <NextLink href="/dashboard/manage-accounts">Manage Accounts</NextLink>
      ),
      key: "/dashboard/manage-accounts",
      icon: <SafetyOutlined />,
    },
    {
      label: <NextLink href="/dashboard/courses">Manage Contents</NextLink>,
      key: "/dashboard/courses",
      icon: <TeamOutlined />,
    },
    {
      label: <NextLink href="/dashboard/jobs">Manage Jobs</NextLink>,
      key: "/dashboard/jobs",
      icon: <AuditOutlined />,
    },
    {
      label: <NextLink href="/dashboard/funding">Manage Funding</NextLink>,
      key: "/dashboard/funding",
      icon: <WalletOutlined />,
    },
    {
      label: (
        // <NextLink href="/dashboard/messages">Messages</NextLink>
        <Typography.Paragraph
          className=" m-0 cursor-pointer"
          onClick={openComingSoon}
        >
          Messages
        </Typography.Paragraph>
      ),

      key: "/dashboard/messages",
      icon: <CommentOutlined />,
    },
    {
      label: (
        // <NextLink href="/dashboard/talent-program">
        //   Vetted Talent Program
        // </NextLink>
        <Typography.Paragraph
          className=" m-0 cursor-pointer"
          onClick={openComingSoon}
        >
          Vetted Talent Program
        </Typography.Paragraph>
      ),
      key: "/dashboard/talent-program",
      icon: <UserSwitchOutlined />,
    },
    // {
    //   label: <NextLink href="/dashboard/orders">Orders</NextLink>,
    //   key: "/dashboard/orders",
    //   icon: <ShoppingCartOutlined />,
    // },
    {
      label: <NextLink href="/dashboard/payment">Bills & Payments</NextLink>,
      key: "/dashboard/payment",
      icon: <ProfileOutlined />,
    },
    {
      label: <NextLink href="/dashboard/settings">Settings</NextLink>,
      key: "/dashboard/settings",
      icon: <SettingOutlined />,
    },
    {
      label: <NextLink href="/dashboard/help">Help & Support Center</NextLink>,
      key: "/dashboard/help",
      icon: <ExclamationCircleOutlined />,
    },
    {
      label: (
        <NextLink href="/dashboard/pricing-system">
          Pricing Index & System
        </NextLink>
      ),
      key: "/dashboard/pricing-system",
      icon: <BookOutlined />,
    },
  ];

  return (
    <div>
      <Menu
        mode="inline"
        defaultSelectedKeys={[`${selectedKeys}`]}
        items={items}
      />
      <ComingSoonModal comingSoon={comingSoon} setComingSoon={setComingSoon} />
    </div>
  );
};

export default SidebarMenu;
