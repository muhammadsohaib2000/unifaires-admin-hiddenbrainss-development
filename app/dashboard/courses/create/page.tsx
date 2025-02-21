import AdminDashboardLayout from "@/components/layouts/AdminDashboard";
import CreateCoursePage from "@/components/pages/Admin/Courses/Create";
import { Metadata } from "next";

export const metadata: Metadata = {
  referrer: "no-referrer",
};

const create = () => {
  return (
    <AdminDashboardLayout>
      <CreateCoursePage />
    </AdminDashboardLayout>
  );
};

export default create;
