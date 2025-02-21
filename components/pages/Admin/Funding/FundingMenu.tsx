"use client";
import React from "react";
// next
import NextLink from "next/link";
// antd components
import { Menu } from "antd";

interface FundingMenuProps {
  activeKey: string;
}

const items = [
  {
    label: <NextLink href="/dashboard/funding">My Funding</NextLink>,
    key: "my-funding",
  },
  {
    label: <NextLink href="/dashboard/funding/archived">Archived</NextLink>,
    key: "archived-funding",
  },
  {
    label: <NextLink href="/dashboard/funding/pending">Waiting for approval</NextLink>,
    key: "pending-funding",
  },
];

const FundingMenu = ({ activeKey }: FundingMenuProps) => {
  return (
    <Menu
      items={items}
      mode="horizontal"
      className="bg-transparent w-full [&>li:first-child]:pl-0 [&>li:first-child:after]:left-0"
      defaultSelectedKeys={[activeKey]}
    />
  );
};

export default FundingMenu;
