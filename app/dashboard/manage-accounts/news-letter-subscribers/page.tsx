import AdminDashboardLayout from "@/components/layouts/AdminDashboard";
// app components
import NewsLetterSubscribers from "@/components/pages/Admin/NewsLetterSubscribers";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires - All Subscribers",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const Users = () => {
  return (
    <AdminDashboardLayout>
      <NewsLetterSubscribers />
    </AdminDashboardLayout>
  );
};

export default Users;
