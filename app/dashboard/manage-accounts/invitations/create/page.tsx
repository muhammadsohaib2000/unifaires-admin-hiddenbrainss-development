import AdminDashboardLayout from "@/components/layouts/AdminDashboard";
// app components
import CreateInvitationsPage from "@/components/pages/Admin/ManageInvitations/create";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires - Invite",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const CreateInvitation = () => {
  return (
    <AdminDashboardLayout>
      <CreateInvitationsPage />
    </AdminDashboardLayout>
  );
};

export default CreateInvitation;
