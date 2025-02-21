import AdminDashboardLayout from "@/components/layouts/AdminDashboard";
// app components
import JobArchivedPage from "@/components/pages/Admin/Jobs/Archived";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires - Archived Jobs",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const JobArchived = () => {
  return (
    <AdminDashboardLayout>
      <JobArchivedPage />
    </AdminDashboardLayout>
  );
};

export default JobArchived;
