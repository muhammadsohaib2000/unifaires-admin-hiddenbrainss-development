import AdminDashboardLayout from "@/components/layouts/AdminDashboard";
// app components
import TalentProfilesPage from "@/components/pages/Admin/TalentProgram/Profiles";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires - Talent Profiles",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};
const TalentProfiles = () => {
  return (
    <AdminDashboardLayout>
      <TalentProfilesPage />
    </AdminDashboardLayout>
  );
};

export default TalentProfiles;
