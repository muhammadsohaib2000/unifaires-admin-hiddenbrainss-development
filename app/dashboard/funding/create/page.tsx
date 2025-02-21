import AdminDashboardLayout from "@/components/layouts/AdminDashboard";
import CreateFundingPage from "@/components/pages/Admin/Funding/Create";
import { Metadata } from "next";

export const metadata: Metadata = {
  referrer: "no-referrer",
};

const CreateFunding = () => {
  return (
    <AdminDashboardLayout>
      <CreateFundingPage />
    </AdminDashboardLayout>
  );
};

export default CreateFunding;
