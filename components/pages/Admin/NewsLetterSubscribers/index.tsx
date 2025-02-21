/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { Fragment, useCallback, useEffect, useState } from "react";
// next components
import NextLink from "next/link";
// antd components
import { Button, Typography, Breadcrumb, Spin, Pagination } from "antd";
// app components
import Container from "@/components/shared/container";
import ManageAccountsMenu from "@/components/pages/Admin/ManageAccounts/ManageAccountsMenu";
import EmailList from "./EmailList";
import axiosInstance from "@/app/utils/axios-config";
import { LoadingOutlined } from "@ant-design/icons";
import { debounce } from "lodash";
import { handleAxiosError } from "@/app/utils/axiosError";

const NewsLetterSubscribers = () => {
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalUsers, setTotalUsers] = useState(0);
  const [searchTerms, setSearchTerms] = useState<string>("");

  const fetchUsers = async (page: any) => {
    const query = buildQuery({
      email: searchTerms,
      page,
      limit: pageSize,
    });
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/newsletter-subscriber${query}`);
      if (res.status) {
        const resData = res.data.data;
        setAllUsers(resData.subscribers);
        setCurrentPage(resData.currentPage);
        setTotalUsers(resData.count);
      }
    } catch (error) {
      // handleAxiosError(error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const buildQuery = (params: { [key: string]: any }) => {
    const query = Object.entries(params)
      .filter(
        ([_, value]) => value !== undefined && value !== null && value !== ""
      )
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join("&");
    return query ? `?${query}` : "";
  };

  /**
   * Handling download csv file functionality
   */
  const handleDownloadCSV = async (page: any) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `/newsletter-subscriber/export`,
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response?.data]));
      const link: any = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "data.csv");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  };

  const debounceFetchUsers = useCallback(debounce(fetchUsers, 300), [
    searchTerms,
  ]);

  useEffect(() => {
    debounceFetchUsers(currentPage);
    return () => debounceFetchUsers.cancel();
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1);
    debounceFetchUsers(currentPage);
    return () => debounceFetchUsers.cancel();
  }, [searchTerms]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <Fragment>
      <section className="content-header">
        <Container className="p-6 container-fluid">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div className="flex-grow">
              <Typography.Title level={2} className="mb-0">
                All News Letter Subscribers
              </Typography.Title>
              <Typography.Paragraph className="mb-0">
                Manage News Letter Subscription
              </Typography.Paragraph>
            </div>
          </div>
        </Container>
      </section>
      <nav>
        <Container className="px-6 container-fluid">
          <ManageAccountsMenu activeKey="news-letter-subscribers" />
        </Container>
      </nav>
      <section className="content-body">
        <Container className="px-6 pb-6 container-fluid">
          <Spin
            spinning={loading}
            indicator={
              <LoadingOutlined className="flex items-center justify-center text-4xl" />
            }
          >
            <EmailList
              userData={allUsers}
              setSearchTerms={setSearchTerms}
              handleDownloadCSV={handleDownloadCSV}
            />
          </Spin>

          <div className="flex justify-center items-center mt-2">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={totalUsers}
              onChange={handlePageChange}
            />
          </div>
        </Container>
      </section>
    </Fragment>
  );
};

export default NewsLetterSubscribers;
