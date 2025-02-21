import AdminDashboardLayout from "@/components/layouts/AdminDashboard";
import Settings from "@/components/pages/Admin/Settings";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires - Admin Settings",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const Account = () => {
  return (
    <AdminDashboardLayout>
      <Settings />
    </AdminDashboardLayout>
  );
};

export default Account;
