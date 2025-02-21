"use client";
import React, { Fragment } from "react";
// next components
import NextLink from "next/link";
// antd components
import { Col, Row, Button, Typography } from "antd";
// app components
import FundingMenu from "../FundingMenu";
import FundingStatsCard from "../FundingStats";
import FundingSearchForm from "../FundingSearchForm";
import Container from "@/components/shared/container";
import FundingCard from "@/components/shared/cards/FundingCard";

const WishlistFunding = () => {
  return (
    <Fragment>
      <section className="content-header">
        <Container className="p-6 container-fluid">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div className="flex-grow">
              <Typography.Title level={2} className="mb-0">
                Wishlist Funding
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
          <FundingMenu activeKey="funding-wishlist" />
        </Container>
      </nav>
      <section className="content-body">
        <Container className="px-6 pb-6 container-fluid">
          <FundingSearchForm />
          <Row gutter={[16, 16]}>
            {Array.from({ length: 6 }).map((_, index) => (
              <Col key={`funding-card-${index}`} xl={8} md={12} xs={12}>
                <FundingCard />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </Fragment>
  );
};

export default WishlistFunding;
