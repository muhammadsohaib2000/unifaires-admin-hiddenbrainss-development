import AdminDashboardLayout from "@/components/layouts/AdminDashboard";
// app components
import CreateJobPage from "@/components/pages/Admin/Jobs/Create";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires - Create Jobs",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const CreateJob = () => {
  return (
    <AdminDashboardLayout>
      <CreateJobPage />
    </AdminDashboardLayout>
  );
};

export default CreateJob;
