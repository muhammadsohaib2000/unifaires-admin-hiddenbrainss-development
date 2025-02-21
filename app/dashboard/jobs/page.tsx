import AdminDashboardLayout from "@/components/layouts/AdminDashboard";
// app components
import JobsPage from "@/components/pages/Admin/Jobs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires - All Jobs",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const Jobs = () => {
  return (
    <AdminDashboardLayout>
      <JobsPage />
    </AdminDashboardLayout>
  );
};

export default Jobs;
