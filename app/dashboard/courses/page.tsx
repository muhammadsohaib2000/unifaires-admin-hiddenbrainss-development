import AdminDashboardLayout from "@/components/layouts/AdminDashboard";
import CoursesPage from "@/components/pages/Admin/Courses";
import { Metadata } from "next";

export const metadata: Metadata = {
  referrer: "no-referrer",
};

const Courses = () => {
  return (
    <AdminDashboardLayout>
      <CoursesPage />
    </AdminDashboardLayout>
  );
};

export default Courses;
