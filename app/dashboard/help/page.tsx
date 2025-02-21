import AdminDashboardLayout from "@/components/layouts/AdminDashboard";
// app components
import Help from "@/components/pages/Admin/Help";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires - Help & Support",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const Support = () => {
  return (
    <AdminDashboardLayout>
      <Help />
    </AdminDashboardLayout>
  );
};

export default Support;
