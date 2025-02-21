"use client";
import React, { Fragment } from "react";
import { Form, Input, Table, Button, Typography } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import IconText from "@/components/shared/IconText";
import { UserInt } from "@/app/utils/interface";

interface DataType extends UserInt {
  key: number;
  url: string;
  active: boolean;
  phone: any;
}

interface IUserData {
  userData: Array<UserInt>;
  setSearchTerms: any;
  handleDownloadCSV: any;
}

const EmailList = ({
  userData,
  setSearchTerms,
  handleDownloadCSV,
}: IUserData) => {
  const [form] = Form.useForm(); 

  const columns: ColumnsType<UserInt> = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      fixed: "left",
      width: 150,
      render: (_, { email }) => (
        <div className="flex justify-start items-center gap-3">
          <div className="">
            <Typography.Link href={`mailto:${email}`}>{email}</Typography.Link>
          </div>
        </div>
      ),
    },

    // {
    //   title: "Active",
    //   dataIndex: "status",
    //   key: "active",
    //   width: 100,

    //   render: (_, { status }) => (
    //     <Typography.Text className={status ? "text-purple-500" : ""}>
    //       {status ? "active" : "Deactivated"}
    //     </Typography.Text>
    //   ),
    // },
  ];

  return (
    <Fragment>
      <Form form={form} className="py-6">
        <div className="flex justify-between">
          <div className="gap-2 w-full pe-4">
            <Form.Item className="mb-0">
              <Input.Search
                size="large"
                placeholder="Search email"
                onSearch={(value) => setSearchTerms(value)}
                onChange={(e) => setSearchTerms(e.target.value)}
              />
            </Form.Item>
          </div>
          <div className="flex ml-auto">
            <Button
              size="large"
              className="rounded-md bg-transparent hover:bg-purple-500 hover:text-purple-60"
              onClick={(event) => {
                event.preventDefault();
                handleDownloadCSV();
              }}
            >
              <IconText
                text="Export"
                icon={<DownloadOutlined />}
                className=""
              />
            </Button>
          </div>
        </div>
      </Form>
      <div className="bg-white rounded-lg pb-3 border overflow-hidden">
        <Table
          columns={columns}
          dataSource={userData}
          pagination={false}
          // scroll={{ x: 1000, y: 500 }}
        />
      </div>
    </Fragment>
  );
};

export default EmailList;
