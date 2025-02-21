import AdminDashboardLayout from "@/components/layouts/AdminDashboard";
// app components
import StudentsPage from "@/components/pages/Admin/Students";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires - Course Students",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const Learning = () => {
  return (
    <AdminDashboardLayout>
      <StudentsPage />
    </AdminDashboardLayout>
  );
};

export default Learning;
