import AdminDashboardLayout from "@/components/layouts/AdminDashboard";
import Dashboard from "@/components/pages/Admin/Dashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires - Admin Dashboard",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const AdminHome = () => {
  return (
    <AdminDashboardLayout>
      <Dashboard />
    </AdminDashboardLayout>
  );
};

export default AdminHome;
