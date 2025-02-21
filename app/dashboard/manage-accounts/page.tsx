import AdminDashboardLayout from "@/components/layouts/AdminDashboard";
// app components
import ManageAccountsPage from "@/components/pages/Admin/ManageAccounts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires - Manage Accounts",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const ManageAccounts = () => {
  return (
    <AdminDashboardLayout>
      <ManageAccountsPage />
    </AdminDashboardLayout>
  );
};

export default ManageAccounts;
