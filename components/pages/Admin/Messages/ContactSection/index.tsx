"use client";
import React, { useState } from "react";
// next components
import NextLink from "next/link";
// antd components and icons
import {
  Tag,
  List,
  Form,
  Menu,
  Input,
  Avatar,
  Select,
  Button,
  MenuProps,
  Typography,
} from "antd";
import {
  MailOutlined,
  SendOutlined,
  SearchOutlined,
  CommentOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";

const ContactSection = () => {
  const [form] = Form.useForm();
  const [current, setCurrent] = useState("messages");
  //
  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  const data = [
    {
      title: "Ant Design Title 1",
    },
    {
      title: "Ant Design Title 2",
    },
    {
      title: "Ant Design Title 3",
    },
    {
      title: "Ant Design Title 4",
    },
  ];

  const items: MenuProps["items"] = [
    {
      label: "All Messages",
      key: "messages",
      icon: <CommentOutlined />,
    },
    {
      label: "Unread",
      key: "unread",
      icon: <MailOutlined />,
    },
    {
      label: "Sent",
      key: "sent",
      icon: <SendOutlined rotate={-45} />,
    },
  ];

  return (
    <div className="h-screen p-5 bg-white border-x">
      <Form form={form} className="">
        <Input
          size="large"
          className="rounded-lg"
          placeholder="Search Messages"
          prefix={<SearchOutlined />}
        />
        <div className="flex items-center gap-4 mt-4">
          <Typography.Text>Sort by</Typography.Text>
          <Select
            defaultValue="recent"
            className="w-40 rounded-full"
            options={[
              {
                value: "recent",
                label: "Recent Access",
              },
            ]}
          />
        </div>
      </Form>
      <div className="py-2">
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={items}
        />
      </div>
      <div className="">
        <List
          dataSource={data}
          itemLayout="horizontal"
          className="divide-y divide-slate-200"
          renderItem={(item, index) => (
            <List.Item className="px-0 rounded-lg relative group/item transition-all hover:bg-gray-100 hover:px-2">
              <div className="flex items-start gap-3">
                <Avatar className="grid w-10 h-10 bg-purple-500 shrink-0 place-items-center">
                  MS
                </Avatar>
                <div className="grow">
                  <div className="flex items-center gap-2 mb-0">
                    <Typography.Title
                      level={5}
                      ellipsis
                      className="max-w-[64%]  leading-5 mb-0 grow"
                    >
                      {item.title}
                    </Typography.Title>
                    <time className="text-gray-500">Aug 29</time>
                    <Button
                      type="text"
                      className="relative z-[2] grid place-items-center"
                      icon={<EllipsisOutlined rotate={90} />}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <NextLink href={`/admin/messages/${index}`}>
                      <Typography.Link
                        ellipsis
                        className="stretched-link max-w-[64%] text-gray-500 grow"
                      >
                        Ant Design, a design language for background
                      </Typography.Link>
                    </NextLink>
                    <Tag className="text-white bg-purple-500 rounded-full">
                      2
                    </Tag>
                  </div>
                </div>
              </div>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default ContactSection;
