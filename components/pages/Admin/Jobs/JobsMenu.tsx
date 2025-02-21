"use client";
import React from "react";
// next
import NextLink from "next/link";
// antd components
import { Menu } from "antd";

interface JobsMenuProps {
  activeKey: string;
}

const items = [
  {
    label: <NextLink href="/dashboard/jobs">My Jobs</NextLink>,
    key: "my-jobs",
  },
  {
    label: <NextLink href="/dashboard/jobs/archived">Archived</NextLink>,
    key: "archived",
  },
  {
    label: (
      <NextLink href="/dashboard/jobs/pending">Waiting for approval</NextLink>
    ),
    key: "pending",
  },
];

const JobsMenu = ({ activeKey }: JobsMenuProps) => {
  return (
    <Menu
      items={items}
      mode="horizontal"
      className="bg-transparent w-full [&>li:first-child]:pl-0 [&>li:first-child:after]:left-0"
      defaultSelectedKeys={[activeKey]}
    />
  );
};

export default JobsMenu;
