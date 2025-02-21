import AdminDashboardLayout from "@/components/layouts/AdminDashboard";
// app components
import TalentProgramPage from "@/components/pages/Admin/TalentProgram";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires - Talent Programs",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const TalentProgram = () => {
  return (
    <AdminDashboardLayout>
      <TalentProgramPage />
    </AdminDashboardLayout>
  );
};

export default TalentProgram;
