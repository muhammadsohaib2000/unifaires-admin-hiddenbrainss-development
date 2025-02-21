import AdminDashboardLayout from "@/components/layouts/AdminDashboard";
// app components
import PricingIndex from "@/components/pages/Admin/Pricing-Index";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires - Pricing Index",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const PricingSystems = () => {
  return (
    <AdminDashboardLayout>
      <PricingIndex />
    </AdminDashboardLayout>
  );
};

export default PricingSystems;
