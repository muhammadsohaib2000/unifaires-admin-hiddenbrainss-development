"use client";
import { CountryListOption } from "@/components/shared/CountryList/countryList";
import {
  Col,
  Form,
  Input,
  Row,
  Select,
  Tabs,
  TabsProps,
  Typography,
} from "antd";
import form from "antd/es/form";
import { Fragment } from "react";
import VAT from "./VAT";
import FundingPricing from "./FundingPricing";
import JobsPricing from "./JobPricing";
import AssociateUserPricing from "./AssociateUserPricing";
import BusinessInvitePricing from "./BusinessInvitePricing";
import CoursePostingPricing from "./CoursePostingPricing";
import SubscriptionPricing from "./SubsriptionPricing";
import CoursePayout from "./CoursePayout.tsx";

const PricingIndex = () => {
  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "VAT",
      children: <VAT />,
    },
    {
      key: "2",
      label: "Associate User",
      children: <AssociateUserPricing />,
    },
    {
      key: "3",
      label: "Subscriptions",
      children: <SubscriptionPricing />,
    },
    {
      key: "4",
      label: "Funding",
      children: <FundingPricing />,
    },
    {
      key: "5",
      label: "Jobs",
      children: <JobsPricing />,
    },
    {
      key: "6",
      label: "Business Invite",
      children: <BusinessInvitePricing />,
    },
    {
      key: "7",
      label: "Course Posting",
      children: <CoursePostingPricing />,
    },
    {
      key: "8",
      label: "Course Payout",
      children: <CoursePayout />,
    },
  ];

  return (
    <Fragment>
      <div className="m-8">
        {/* <section>
          <Typography.Title level={2}>Pricing Index & System</Typography.Title>
          <Typography.Paragraph>
            Checkout Organisation Pricingt indexes
          </Typography.Paragraph>
        </section> */}
        <section>
          <Typography.Title level={2}>Manage Pricing Indexes</Typography.Title>
          <Typography.Paragraph>
            Edit Pricing indexes of various organizations across time frame.
          </Typography.Paragraph>
        </section>
        {/* Tabs */}
        <div>
          <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </div>
      </div>
    </Fragment>
  );
};

export default PricingIndex;
