import AdminDashboardLayout from "@/components/layouts/AdminDashboard";
import PendingFundingPage from "@/components/pages/Admin/Funding/Pending";
import { Metadata } from "next";

export const metadata: Metadata = {
  referrer: "no-referrer",
};

const ArchivedFunding = () => {
  return (
    <AdminDashboardLayout>
      <PendingFundingPage />
    </AdminDashboardLayout>
  );
};

export default ArchivedFunding;
