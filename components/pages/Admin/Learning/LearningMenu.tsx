"use client";
import React from "react";
// next
import NextLink from "next/link";
// antd components
import { Menu, Typography } from "antd";

interface LearningMenuProps {
  activeKey: string;
}
const items = [
  {
    label: <NextLink href="/dashboard/courses">Published Courses</NextLink>,
    key: "published-courses",
  },
  {
    label: (
      <NextLink href="/dashboard/courses/deactivated-courses">
        Deactivated Courses
      </NextLink>
    ),
    key: "deactivate",
  },
  {
    label: <NextLink href="/dashboard/courses/archive">Archive</NextLink>,
    key: "archive",
  },
  {
    label: (
      <NextLink href="/dashboard/courses/pending">
        Waiting for approval
      </NextLink>
    ),
    key: "pending",
  },
];

const LearningMenu = ({ activeKey }: LearningMenuProps) => {
  return (
    <Menu
      items={items}
      mode="horizontal"
      className="bg-transparent w-full [&>li:first-child]:pl-0 [&>li:first-child:after]:left-0"
      defaultSelectedKeys={[activeKey]}
    />
  );
};

export default LearningMenu;
