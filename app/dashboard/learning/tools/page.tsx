import AdminDashboardLayout from "@/components/layouts/AdminDashboard";
// app components
import ToolsPage from "@/components/pages/Admin/Tools";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires - Course Tools",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const Tools = () => {
  return (
    <AdminDashboardLayout>
      <ToolsPage />
    </AdminDashboardLayout>
  );
};

export default Tools;
