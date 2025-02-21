import AdminDashboardLayout from "@/components/layouts/AdminDashboard";
// app components
import UsersPage from "@/components/pages/Admin/ManageUsers";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires - All Users",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const Users = () => {
  return (
    <AdminDashboardLayout>
      <UsersPage />
    </AdminDashboardLayout>
  );
};

export default Users;
