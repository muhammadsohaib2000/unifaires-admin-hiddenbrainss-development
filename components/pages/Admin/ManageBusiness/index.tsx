/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { Fragment, useEffect, useState } from "react";
import { Typography, Breadcrumb, Pagination } from "antd";
import Container from "@/components/shared/container";
import ManageAccountsMenu from "@/components/pages/Admin/ManageAccounts/ManageAccountsMenu";
import { UserInt } from "@/app/utils/interface";
import BusinessUserList from "./BusinessUserList";
import axiosInstance from "@/app/utils/axios-config";

const BusinessPartner = () => {
  const [businessData, setBusinessData] = useState<UserInt[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalBusiness, setTotalBusiness] = useState(0);
  const [searchTerms, setSearchTerms] = useState<string>("");

  const fetchBusinessList = async (page: any) => {
    const query = buildQuery({
      firstname: searchTerms,
      lastname: searchTerms,
      companyName: searchTerms,
      page,
      limit: pageSize,
      email: searchTerms,
    });
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/admin/business${query}`);
      if (res.status) {
        const resData = res.data.data;
        setBusinessData(resData.results);
        setCurrentPage(resData.currentPage);
        setTotalBusiness(resData.count);
        // console.log(res);
      }
    } catch (error) {
      return null;
      // handleAxiosError(error);
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

  useEffect(() => {
    fetchBusinessList(currentPage);
  }, [currentPage, searchTerms]);

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
                All Business Partner
              </Typography.Title>
              <Typography.Paragraph className="mb-0">
                Manage Business Accounts
              </Typography.Paragraph>
            </div>
          </div>
        </Container>
      </section>
      <nav>
        <Container className="px-6 container-fluid">
          <ManageAccountsMenu activeKey="business-partners" />
        </Container>
      </nav>
      <section className="content-body">
        <Container className="px-6 pb-6 container-fluid">
          <BusinessUserList
            userData={businessData}
            fetchBusinessList={fetchBusinessList}
            currentPage={currentPage}
            setSearchTerms={setSearchTerms}
            loading={loading}
          />
          <div className="flex justify-center items-center mt-2">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={totalBusiness}
              onChange={handlePageChange}
            />
          </div>
        </Container>
      </section>
    </Fragment>
  );
};

export default BusinessPartner;
