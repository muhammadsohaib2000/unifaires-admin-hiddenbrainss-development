import AdminDashboardLayout from "@/components/layouts/AdminDashboard";
// app components
import FundingDetailsPage from "@/components/pages/Admin/Funding/Details";
import { Metadata } from "next";

export const metadata: Metadata = {
  referrer: "no-referrer",
};

const FundingDetails = () => {
  return (
    <AdminDashboardLayout>
      <FundingDetailsPage />
    </AdminDashboardLayout>
  );
};

export default FundingDetails;
