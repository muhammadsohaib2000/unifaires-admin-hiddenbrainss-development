"use client";
import React from "react";
// next
import NextLink from "next/link";
// antd components
import { Menu } from "antd";

interface LearningMenuProps {
  activeKey: string;
}

const items = [
  {
    label: (
      <NextLink href="/dashboard/manage-accounts">In House Unifaires</NextLink>
    ),
    key: "in-house-unifaires",
  },
  {
    label: (
      <NextLink href="/dashboard/manage-accounts/invitations">
        Invitations
      </NextLink>
    ),
    key: "invitations",
  },
  {
    label: (
      <NextLink href="/dashboard/manage-accounts/business-partners">
        Business Partners
      </NextLink>
    ),
    key: "business-partners",
  },
  {
    label: <NextLink href="/dashboard/manage-accounts/users">Users</NextLink>,
    key: "users",
  },
  {
    label: (
      <NextLink href="/dashboard/manage-accounts/news-letter-subscribers">
        News Letter Subscribers
      </NextLink>
    ),
    key: "news-letter-subscribers",
  },
  {
    label: (
      <NextLink href="/dashboard/manage-accounts/mentorApplications">
        Mentor Applications
      </NextLink>
    ),
    key: "mentor-applications",
  },
  {
    label: (
      <NextLink href="/dashboard/manage-accounts/user-demographics">
        User Demographics
      </NextLink>
    ),
    key: "user-demographics",
  },
];

const ManageAccountsMenu = ({ activeKey }: LearningMenuProps) => {
  return (
    <Menu
      items={items}
      mode="horizontal"
      className="bg-transparent w-full [&>li:first-child]:pl-0 [&>li:first-child:after]:left-0"
      defaultSelectedKeys={[activeKey]}
    />
  );
};

export default ManageAccountsMenu;
