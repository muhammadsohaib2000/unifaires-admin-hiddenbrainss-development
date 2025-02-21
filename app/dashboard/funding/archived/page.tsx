import AdminDashboardLayout from "@/components/layouts/AdminDashboard";
// app components
import ArchivedFundingPage from "@/components/pages/Admin/Funding/Archive";
import { Metadata } from "next";

export const metadata: Metadata = {
  referrer: "no-referrer",
};

const ArchivedFunding = () => {
  return (
    <AdminDashboardLayout>
      <ArchivedFundingPage />
    </AdminDashboardLayout>
  );
};

export default ArchivedFunding;
