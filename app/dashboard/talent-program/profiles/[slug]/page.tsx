import AdminDashboardLayout from "@/components/layouts/AdminDashboard";
// app components
import TalentProfilePage from "@/components/pages/Admin/TalentProgram/Profiles/Details";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires - Talent Profile",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const TalentProfile = () => {
  return (
    <AdminDashboardLayout>
      <TalentProfilePage />
    </AdminDashboardLayout>
  );
};

export default TalentProfile;
