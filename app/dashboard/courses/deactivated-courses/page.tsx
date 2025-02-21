import AdminDashboardLayout from "@/components/layouts/AdminDashboard";
import DeactivatedCourse from "@/components/pages/Admin/Courses/Deactivated";
import { Metadata } from "next";

export const metadata: Metadata = {
  referrer: "no-referrer",
};

const Deactivated = () => {
  return (
    <AdminDashboardLayout>
      <DeactivatedCourse />
    </AdminDashboardLayout>
  );
};

export default Deactivated;
