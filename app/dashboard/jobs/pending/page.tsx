import AdminDashboardLayout from "@/components/layouts/AdminDashboard";
import JobPendingPage from "@/components/pages/Admin/Jobs/Pending";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires - Archived Jobs",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const JobPending = () => {
  return (
    <AdminDashboardLayout>
      <JobPendingPage />
    </AdminDashboardLayout>
  );
};

export default JobPending;
