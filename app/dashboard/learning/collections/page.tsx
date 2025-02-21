import AdminDashboardLayout from "@/components/layouts/AdminDashboard";
// app components
import CollectionsPage from "@/components/pages/Admin/Collections";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires - Course Collections",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const Collections = () => {
  return (
    <AdminDashboardLayout>
      <CollectionsPage />
    </AdminDashboardLayout>
  );
};

export default Collections;
