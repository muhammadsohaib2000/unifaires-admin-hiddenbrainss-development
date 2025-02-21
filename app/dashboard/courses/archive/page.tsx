import AdminDashboardLayout from "@/components/layouts/AdminDashboard";
import ArchivePage from "@/components/pages/Admin/Courses/Archive";
import { Metadata } from "next";

export const metadata: Metadata = {
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
