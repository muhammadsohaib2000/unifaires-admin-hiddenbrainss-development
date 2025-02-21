/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import NextLink from "next/link";
import { Button, Typography,  Pagination, Spin } from "antd";
import Container from "@/components/shared/container";
import ManageAccountsMenu from "@/components/pages/Admin/ManageAccounts/ManageAccountsMenu";
import InviteList from "./InviteList";
import axiosInstance from "@/app/utils/axios-config";
import { LoadingOutlined } from "@ant-design/icons";
import { debounce } from 'lodash';

const Invitations = () => {
  const [inviteList, setInviteList] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalInvites, setTotalInvites] = useState(0);
  const [searchTerms, setSearchTerms] = useState<string>("");
  const [inviteStatus, setInviteStatus] = useState<any>();

  const fetchInvites = async (page: any) => {
    const query = buildQuery({
      email: searchTerms,
      firstname: searchTerms,
      lastname: searchTerms,
      page,
      limit: pageSize,
      inviteStatus: inviteStatus,
    });
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/invite/user-invites${query}`);
      if (res.status) {
        const resData = res.data.data;
        setCurrentPage(resData.currentPage);
        setTotalInvites(resData.totalItem);
        setInviteList(resData.invites);
      }
    } catch (error) {
      console.log("Error fetching Invite List", error);
    } finally {
      setLoading(false);
    }
  };
  const debounceFetchInvites = useCallback(debounce(fetchInvites, 300), [searchTerms]);

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
    debounceFetchInvites(currentPage);
    return () => debounceFetchInvites.cancel();
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1);
    debounceFetchInvites(currentPage);
    return () => debounceFetchInvites.cancel();
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
                Invitations
              </Typography.Title>
              <Typography.Paragraph className="mb-0">
                Manage invitations
              </Typography.Paragraph>
            </div>
            <div className="shrink-0 flex gap-2">
              <NextLink
                href="/dashboard/manage-accounts/invitations/create"
                passHref
              >
                <Button type="primary" size="large" className="rounded-md">
                  Invite
                </Button>
              </NextLink>
            </div>
          </div>
        </Container>
      </section>
      <nav>
        <Container className="px-6 container-fluid">
          <ManageAccountsMenu activeKey="invitations" />
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
            <InviteList
              inviteList={inviteList}
              fetchInvites={fetchInvites}
              currentPage={currentPage}
              setSearchTerms={setSearchTerms}
              setInviteStatus={setInviteStatus}
            />
          </Spin>
          <div className="flex justify-center items-center mt-2">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={totalInvites}
              onChange={handlePageChange}
            />
          </div>
        </Container>
      </section>
    </Fragment>
  );
};

export default Invitations;
