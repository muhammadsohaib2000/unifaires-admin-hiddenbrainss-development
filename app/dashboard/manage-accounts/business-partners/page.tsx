import AdminDashboardLayout from "@/components/layouts/AdminDashboard";

import ManageBusiness from "@/components/pages/Admin/ManageBusiness";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires - Business Partners",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const BusinessPartners = () => {
  return (
    <AdminDashboardLayout>
      <ManageBusiness />
    </AdminDashboardLayout>
  );
};

export default BusinessPartners;
