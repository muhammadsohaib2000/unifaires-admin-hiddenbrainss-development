import AdminDashboardLayout from "@/components/layouts/AdminDashboard";
// app components
import FundingPage from "@/components/pages/Admin/Funding";
import { Metadata } from "next";

export const metadata: Metadata = {
  referrer: "no-referrer",
};

const Funding = () => {
  return (
    <AdminDashboardLayout>
      <FundingPage />
    </AdminDashboardLayout>
  );
};

export default Funding;
