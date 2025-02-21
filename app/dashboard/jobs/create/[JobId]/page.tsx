"use client";
import AdminDashboardLayout from "@/components/layouts/AdminDashboard";
// app components
import { JobProvider } from "@/components/pages/Admin/Jobs/Create/JobContext";
import { useParams } from "next/navigation";
const JobId = () => {
  const params = useParams();
  const jobId = params.JobId;

  return (
    <AdminDashboardLayout>
      <JobProvider jobId={jobId} />
    </AdminDashboardLayout>
  );
};

export default JobId;
