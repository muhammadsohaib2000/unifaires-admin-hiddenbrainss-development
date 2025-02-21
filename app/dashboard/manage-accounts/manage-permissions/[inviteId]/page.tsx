import ManagePermissionsPage from "@/components/pages/Admin/ManagePermissions/Individual";
import AdminDashboardLayout from "@/components/layouts/AdminDashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires - Manage User Permissions",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const ManageIndividualPermissions = () => {
  return (
    <AdminDashboardLayout>
      <ManagePermissionsPage />
    </AdminDashboardLayout>
  );
};

export default ManageIndividualPermissions;
