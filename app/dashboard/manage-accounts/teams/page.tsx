import AdminDashboardLayout from "@/components/layouts/AdminDashboard";
// app components
import TeamsPage from "@/components/pages/Admin/ManageTeams";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires - Teams",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const Teams = () => {
  return (
    <AdminDashboardLayout>
      <TeamsPage />
    </AdminDashboardLayout>
  );
};

export default Teams;
