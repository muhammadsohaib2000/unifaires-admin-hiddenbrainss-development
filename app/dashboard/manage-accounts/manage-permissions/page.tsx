import AdminDashboardLayout from "@/components/layouts/AdminDashboard";
import ManagePermissionsPage from "@/components/pages/Admin/ManagePermissions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires - Manage Permissions",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const ManagePermissions = () => {
  return (
    <AdminDashboardLayout>
      <ManagePermissionsPage />
    </AdminDashboardLayout>
  );
};

export default ManagePermissions;
