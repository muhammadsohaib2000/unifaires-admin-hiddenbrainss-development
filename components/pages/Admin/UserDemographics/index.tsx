"use client";
import React, { Fragment } from "react";
import { Tabs, Typography } from "antd";
import Container from "@/components/shared/container";
import ManageAccountsMenu from "@/components/pages/Admin/ManageAccounts/ManageAccountsMenu";
import ChartOverview from "./Overview";

const UserDemographics = () => {
  return (
    <Fragment>
      <section className="content-header">
        <Container className="p-6 container-fluid">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div className="flex-grow">
              <Typography.Title level={2} className="mb-0">
                User Demographics
              </Typography.Title>
            </div>
          </div>
        </Container>
      </section>
      <nav>
        <Container className="px-6 container-fluid">
          <ManageAccountsMenu activeKey="user-demographics" />
        </Container>
      </nav>
      <section className="content-body">
        <Container className="px-6 pb-6 container-fluid">
          <Tabs
            defaultActiveKey="1"
            className="mt-10 [&>div.ant-tabs-nav]:px-6 bg-white border rounded-lg"
            items={[
              {
                label: "Overview",
                key: "overview",
                children: <ChartOverview />,
              },
              // {
              //   label: "Age",
              //   key: "age",
              //   children: <AgeChart />,
              // },
              // {
              //   label: "Users Language",
              //   key: "users-language",
              //   children: <UsersLanguageChart />,
              // },
              // {
              //   label: "Gender",
              //   key: "gender",
              //   children: <GenderChart />,
              // },
              // {
              //   label: "Country",
              //   key: "country",
              //   children: <CountryChart />,
              // },
              // {
              //   label: "Occupation Area",
              //   key: "occupation-area",
              //   children: <OccupationAreaChart />,
              // },
              // {
              //   label: "Major Programs",
              //   key: "major-programs",
              //   children: <MajorPrograms />,
              // },
              // {
              //   label: "Industry Sector",
              //   key: "industry-sector",
              //   children: <IndustrySector />,
              // },
              // {
              //   label: "Job Title",
              //   key: "job-title",
              //   children: <JobTitle />,
              // },
            ]}
          />
        </Container>
      </section>
    </Fragment>
  );
};

export default UserDemographics;
