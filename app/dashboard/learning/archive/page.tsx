import AdminDashboardLayout from "@/components/layouts/AdminDashboard";
// app components
import ArchivePage from "@/components/pages/Admin/Courses/Archive";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires - Archived Courses",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const Archive = () => {
  return (
    <AdminDashboardLayout>
      <ArchivePage />
    </AdminDashboardLayout>
  );
};

export default Archive;
