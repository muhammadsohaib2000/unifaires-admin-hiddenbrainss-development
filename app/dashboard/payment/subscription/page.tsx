import AdminDashboardLayout from "@/components/layouts/AdminDashboard";
import SubscriptionPlan from "@/components/pages/Admin/Payments/SubscriptionPlan";
// app components
import Payments from "@/components/pages/Admin/Payments";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires - Subscriptions",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const Subscription = () => {
  return (
    <AdminDashboardLayout>
      <SubscriptionPlan />
    </AdminDashboardLayout>
  );
};

export default Subscription;
