import AdminDashboardLayout from "@/components/layouts/AdminDashboard";
// app components
import CoursesPage from "@/components/pages/Admin/Courses";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires - All Courses",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const Learning = () => {
  return (
    <AdminDashboardLayout>
      <CoursesPage />
    </AdminDashboardLayout>
  );
};

export default Learning;
