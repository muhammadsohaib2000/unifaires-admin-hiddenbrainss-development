/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";
import NextLink from "next/link";
import { Button, Typography, List, Skeleton, Pagination } from "antd";
import FundingMenu from "../FundingMenu";
import FundingStatsCard from "../FundingStats";
import FundingSearchForm from "../FundingSearchForm";
import Container from "@/components/shared/container";
import FundingCard from "@/components/shared/cards/FundingCard";
import axiosInstance from "@/app/utils/axios-config";
import { handleAxiosError } from "@/app/utils/axiosError";

const PendingFunding = () => {
  const [fundingList, setFundingList] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalFundings, setTotalFundings] = useState(0);
  const pageSize = 10;
  const [loading, setLoading] = useState(true);
  const [searchTerms, setSearchTerms] = useState();
  const [businessId, setBusinessId] = useState();

  const fetchFunding = async (page: any) => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/funding/all`, {
        params: {
          title: searchTerms,
          page,
          limit: pageSize,
          businessId: businessId,
          status: "pending",
        },
      });

      if (res.data.data) {
        setLoading(false);
        const resData = res.data.data;
        const fundArr = Array.isArray(resData?.fundings)
          ? resData.fundings
          : [];
        setFundingList(fundArr);
        setTotalFundings(resData?.count);
        setCurrentPage(resData?.currentPage);
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFunding(currentPage);
  }, [currentPage, searchTerms, businessId]);

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  return (
    <>
      <section className="content-header">
        <Container className="p-6 container-fluid">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div className="flex-grow">
              <Typography.Title level={2} className="mb-0">
                Waiting For Approval Funding
              </Typography.Title>
              <Typography.Paragraph className="mb-0">
                Check out Organisations that are making the most impact on
                Funding, Grants, & Scholarships
              </Typography.Paragraph>
            </div>
            <NextLink href="/admin/funding/create" passHref>
              <Button type="primary" size="large" className="rounded-md">
                + Create funding
              </Button>
            </NextLink>
          </div>
        </Container>
      </section>
      <section className="content-header">
        <Container className="p-6 container-fluid">
          <FundingStatsCard />
        </Container>
      </section>
      <nav className="mb-6">
        <Container className="px-6 container-fluid">
          <FundingMenu activeKey="pending-funding" />
        </Container>
      </nav>
      <section className="content-body">
        <Container className="px-6 pb-6 container-fluid">
          <FundingSearchForm
            setBusinessId={setBusinessId}
            setSearchTerms={setSearchTerms}
          />
          <Skeleton active loading={loading}>
            <List
              size="large"
              itemLayout="vertical"
              dataSource={Array.isArray(fundingList) ? fundingList : []}
              renderItem={(funding: any) => (
                <FundingCard
                  archive={true}
                  fetchFunding={fetchFunding}
                  funding={funding}
                  currentPage={currentPage}
                  menuTitle="pending-funding"
                />
              )}
            />
          </Skeleton>
          {typeof totalFundings === "number" && totalFundings > 0 ? (
            <>
              <div className="flex justify-center items-center">
                <Pagination
                  current={currentPage}
                  pageSize={pageSize}
                  total={totalFundings}
                  onChange={handlePageChange}
                  className="flex ml-auto pt-4"
                />
              </div>
            </>
          ) : (
            <></>
          )}
        </Container>
      </section>
    </>
  );
};

export default PendingFunding;
