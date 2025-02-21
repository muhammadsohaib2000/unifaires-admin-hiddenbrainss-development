import AdminDashboardLayout from "@/components/layouts/AdminDashboard";
// app components
import JobDetail from "@/components/pages/Admin/Jobs/Details/JobDetails";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires - Course Details",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const JobsDetails = () => {
  return (
    <AdminDashboardLayout>
      <JobDetail />
    </AdminDashboardLayout>
  );
};

export default JobsDetails;
