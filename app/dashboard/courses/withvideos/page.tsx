import AdminDashboardLayout from "@/components/layouts/AdminDashboard";
import CreateCourse from "@/components/pages/Admin/Courses/Create/WithVideos";
import { Metadata } from "next";

export const metadata: Metadata = {
  referrer: "no-referrer",
};

const withvideos = () => {
  return (
    <AdminDashboardLayout>
      <CreateCourse />
    </AdminDashboardLayout>
  );
};

export default withvideos;
