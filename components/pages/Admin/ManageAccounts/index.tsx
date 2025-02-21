"use client";
import React, { Fragment, useCallback, useEffect, useState } from "react";
// next components
import NextLink from "next/link";
// antd components
import { Button, Pagination, Spin, Typography } from "antd";

// app components
import ManageAccountsMenu from "./ManageAccountsMenu";
import Container from "@/components/shared/container";
import axios, { AxiosResponse } from "axios";
import config from "@/app/utils/config";
import { useSession } from "next-auth/react";
import AdminList from "./AdminList";
import { UserInt } from "@/app/utils/interface";
import { handleAxiosError } from "@/app/utils/axiosError";
import axiosInstance from "@/app/utils/axios-config";
import { LoadingOutlined } from "@ant-design/icons";
import { debounce } from 'lodash';

const ManageAccounts = () => {
  const { data: session, status } = useSession();
  const [adminList, setAdminList] = useState<UserInt[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalAdmin, setTotalAdmin] = useState(0);
  const [searchTerms, setSearchTerms] = useState<string>("");

  const fetchAdmin = async (page: any) => {
    const query = buildQuery({
      username: searchTerms,
      email: searchTerms,
      page,
      // limit: pageSize,
    });
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/admin${query}`);
      if (res.status) {
        const resData = res.data.data;
        setAdminList(resData.results);
        setCurrentPage(resData.currentPage);
        setTotalAdmin(resData.count);
        // console.log(res);
      }
    } catch (error) {
      // handleAxiosError(error);
      return null;
    } finally {
      setLoading(false);
    }
  };
  const debounceFetchAdmin = useCallback(debounce(fetchAdmin, 300), [searchTerms]);

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

  useEffect(() => {
    debounceFetchAdmin(currentPage);
    return () => debounceFetchAdmin.cancel();
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1);
    debounceFetchAdmin(currentPage);
    return () => debounceFetchAdmin.cancel();
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
                Manage Accounts
              </Typography.Title>
              <Typography.Paragraph className="mb-0">
                Check out Organisations that are making the most impact on
                Funding, Grants, & Scholarships
              </Typography.Paragraph>
            </div>
            <div className="shrink-0 flex gap-2">
              <NextLink
                href="/dashboard/manage-accounts/manage-permissions"
                passHref
              >
                <Button type="primary" size="large" className="rounded-md">
                  Manage permissions
                </Button>
              </NextLink>
              {/* <NextLink href="/admin/users/create" passHref>
                <Button type="primary" size="large" className="rounded-md">
                  + Add user
                </Button>
              </NextLink> */}
            </div>
          </div>
        </Container>
      </section>
      <nav>
        <Container className="px-6 container-fluid">
          <ManageAccountsMenu activeKey="in-house-unifaires" />
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
            <AdminList
              userData={adminList}
              fetchAdmin={fetchAdmin}
              currentPage={currentPage}
              setSearchTerms={setSearchTerms}
            />
          </Spin>
          <div className="flex justify-center items-center mt-2">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={totalAdmin}
              onChange={handlePageChange}
            />
          </div>
        </Container>
      </section>
    </Fragment>
  );
};

export default ManageAccounts;
