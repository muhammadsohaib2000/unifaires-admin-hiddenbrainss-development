import AdminDashboardLayout from "@/components/layouts/AdminDashboard";
// app components
import MentorDetailsPage from "@/components/pages/Admin/ManageMentorApplications/Details";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires - Mentor Details",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const UserDetails = () => {
  return (
    <AdminDashboardLayout>
      <MentorDetailsPage />
    </AdminDashboardLayout>
  );
};

export default UserDetails;
