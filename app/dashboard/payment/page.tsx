import AdminDashboardLayout from "@/components/layouts/AdminDashboard";
// app components
import Payments from "@/components/pages/Admin/Payments";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires - Payments",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const Payment = () => {
  return (
    <AdminDashboardLayout>
      <Payments />
    </AdminDashboardLayout>
  );
};

export default Payment;
