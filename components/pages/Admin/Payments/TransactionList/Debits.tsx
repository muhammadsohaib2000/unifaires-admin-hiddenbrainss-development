"use client";
import React, { Fragment, useEffect, useState } from "react";
import NextLink from "next/link";
// ant components
import {
  Col,
  Row,
  Form,
  Input,
  Table,
  Avatar,
  Select,
  MenuProps,
  Typography,
  DatePicker,
  Pagination,
  Spin,
  TabsProps,
  Tabs,
} from "antd";

// app components
import type { ColumnsType } from "antd/es/table";
import IconText from "@/components/shared/IconText";
// utils and int
import { UserInt } from "@/app/utils/interface";
import TransactionOverview from "./TransactionOverview";
import TransactionFilterForm from "./TransactionFilterForm";
import axiosInstance from "@/app/utils/axios-config";
import { buildQuery } from "@/app/utils/buildQuery";

interface DataType extends UserInt {
  completed: string;
  invoiceId: string;
  date: string;
  paidFor: any;
  amount: any;
  paymentId: number;
  user: UserInt;
  business: any;
}

const DebitsTransactionList = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [transactionList, setTransactionList] = useState<any>();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [selectedStartDate, setSelectedStartDate] = useState<any>();
  const [selectedEndDate, setSelectedEndDate] = useState<any>();
  const [selectedStatus, setSelectedStatus] = useState<any>();
  const [searchQuery, setSearchQuery] = useState<any>();

  const fetchTransactions = async (page: any) => {
    try {
      setLoading(true);
      const queryParams = {
        page,
        limit: pageSize,
        // status: accountType,
        from: selectedStartDate,
        to: selectedEndDate,
        status: selectedStatus,
        paidFor: searchQuery,
        firstname: searchQuery,
        lastname: searchQuery,
      };
      const query = buildQuery(queryParams);
      const res = await axiosInstance.get(`/earnings${query}`);

      if (res.status) {
        const resData = res.data.data;
        // console.log(resData);
        setTotalTransactions(resData.count);
        setCurrentPage(resData.currentPage);
        setTransactionList(resData.transactions);
      }
    } catch (error) {
      console.log("here is the error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions(currentPage);
  }, [currentPage, searchQuery, selectedStartDate, selectedStatus]);

  const formatCurrency = (value: any) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  function formatDate(dateString: string | number | Date) {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "Product",
      dataIndex: "paidFor",
      key: "paidFor",
      width: 300,
      render: (_, { paidFor, business, user }) => (
        <div className="flex justify-start items-center gap-3">
          <div className="">
            <Typography.Paragraph className="leading-none text-base font-medium mb-1 block text-gray-800">
              {user
                ? `${user?.firstname} ${user?.lastname}`
                : `${business?.companyName}`}
            </Typography.Paragraph>
            <Typography.Paragraph className="leading-none italic font-medium mb-1 block text-gray-400">
              {paidFor}
            </Typography.Paragraph>
          </div>
        </div>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (_, { amount }) => (
        <div className="flex justify-start items-center gap-3">
          <div className="">
            <Typography.Paragraph className="leading-none text-base font-medium mb-1 block text-gray-800">
              {formatCurrency(JSON.parse(amount))}
            </Typography.Paragraph>
          </div>
        </div>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (_, { createdAt }) => (
        <Typography.Paragraph>{formatDate(createdAt)}</Typography.Paragraph>
      ),
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, { status }) => (
        <Typography.Text
          className={
            status
              ? "text-white p-2 bg-green-600 rounded-md px-4"
              : "text-white p-2 bg-orange-600 rounded-md px-4"
          }
        >
          {status ? "Successful" : "pending"}
        </Typography.Text>
      ),
    },
  ];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Fragment>
      <div className="mb-4">
        <TransactionFilterForm
          setSearchQuery={setSearchQuery}
          setSelectedStartDate={setSelectedStartDate}
          setSelectedEndDate={setSelectedEndDate}
          setSelectedStatus={setSelectedStatus}
        />
      </div>
      <div className="bg-white rounded-lg pb-3 border overflow-hidden">
        <Spin spinning={loading} size="large">
          <Table
            columns={columns}
            dataSource={transactionList}
            // className="[&>div>div>ul.ant-table-pagination]:px-6"
            pagination={false}
          />
        </Spin>
      </div>
      <div className="flex items-center justify-center mt-2">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={totalTransactions}
          onChange={handlePageChange}
        />
      </div>
    </Fragment>
  );
};

export default DebitsTransactionList;
