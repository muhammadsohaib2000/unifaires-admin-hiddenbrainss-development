import AdminDashboardLayout from "@/components/layouts/AdminDashboard";
// app components
import UserDemographicsPage from "@/components/pages/Admin/UserDemographics";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires - User Demographics",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const UserDemographics = () => {
  return (
    <AdminDashboardLayout>
      <UserDemographicsPage />
    </AdminDashboardLayout>
  );
};

export default UserDemographics;
