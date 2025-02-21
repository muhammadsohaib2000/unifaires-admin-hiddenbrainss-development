import AdminDashboardLayout from "@/components/layouts/AdminDashboard";
import StudentsPage from "@/components/pages/Admin/Students";
import { Metadata } from "next";

export const metadata: Metadata = {
  referrer: "no-referrer",
};

const CourseDetails = () => {
  return (
    <AdminDashboardLayout>
      <StudentsPage />
    </AdminDashboardLayout>
  );
};

export default CourseDetails;
