"use client";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { Typography, Spin, Pagination } from "antd";
import Container from "@/components/shared/container";
import ManageAccountsMenu from "@/components/pages/Admin/ManageAccounts/ManageAccountsMenu";
import UserList from "./UserList";
import axiosInstance from "@/app/utils/axios-config";
import { LoadingOutlined } from "@ant-design/icons";
import { debounce } from "lodash";

const Users = () => {
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalUsers, setTotalUsers] = useState(0);
  const [searchTerms, setSearchTerms] = useState<string>("");

  const fetchUsers = async (page: any) => {
    const query = buildQuery({
      username: searchTerms,
      email: searchTerms,
      page,
      // limit: pageSize,
    });
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/admin/users${query}`);
      if (res.status) {
        const resData = res.data.data;
        setAllUsers(resData.results);
        setCurrentPage(resData.currentPage);
        setTotalUsers(resData.count);
        // console.log(res);
      }
    } catch (error) {
      // handleAxiosError(error);
      return null;
    } finally {
      setLoading(false);
    }
  };
  const debounceFetchUsers = useCallback(debounce(fetchUsers, 300), [
    searchTerms,
  ]);

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
                All Users
              </Typography.Title>
              <Typography.Paragraph className="mb-0">
                Manage users
              </Typography.Paragraph>
            </div>
            {/* <div className="shrink-0 flex gap-2">
              <Button
                type="primary"
                size="large"
                className="rounded-md"
                onClick={() => setIsModalOpen(true)}
              >
                Create user
              </Button>
              {isModalOpen && (
                <CreateUser
                  isModalOpen={isModalOpen}
                  setIsModalOpen={setIsModalOpen}
                  fetchUsers={fetchUsers}
                />
              )}
            </div> */}
          </div>
        </Container>
      </section>
      <nav>
        <Container className="px-6 container-fluid">
          <ManageAccountsMenu activeKey="users" />
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
            <UserList
              fetchUsers={fetchUsers}
              userData={allUsers}
              currentPage={currentPage}
              setSearchTerms={setSearchTerms}
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

export default Users;
