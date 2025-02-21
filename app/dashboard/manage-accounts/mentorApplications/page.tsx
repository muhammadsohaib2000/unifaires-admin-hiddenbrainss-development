import AdminDashboardLayout from "@/components/layouts/AdminDashboard";
// app components
import ManageMentorApplications from "@/components/pages/Admin/ManageMentorApplications";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires - Mentorships Application",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const InstructorApplications = () => {
  return (
    <AdminDashboardLayout>
      <ManageMentorApplications />
    </AdminDashboardLayout>
  );
};

export default InstructorApplications;
