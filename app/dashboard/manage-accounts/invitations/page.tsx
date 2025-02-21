import AdminDashboardLayout from "@/components/layouts/AdminDashboard";
// app components
import InvitationsPage from "@/components/pages/Admin/ManageInvitations";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires - All Invites",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const Invitations = () => {
  return (
    <AdminDashboardLayout>
      <InvitationsPage />
    </AdminDashboardLayout>
  );
};

export default Invitations;
