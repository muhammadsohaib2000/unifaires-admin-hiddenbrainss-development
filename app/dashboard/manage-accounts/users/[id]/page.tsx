import AdminDashboardLayout from "@/components/layouts/AdminDashboard";
// app components
import UserDetailsPage from "@/components/pages/Admin/Users/Details";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires - User Details",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const UserDetails = () => {
  return (
    <AdminDashboardLayout>
      <UserDetailsPage />
    </AdminDashboardLayout>
  );
};

export default UserDetails;
