"use client";
import AdminDashboardLayout from "@/components/layouts/AdminDashboard";
// app components
import { FundingProvider } from "@/components/pages/Admin/Funding/Create/FundingContext";
import { useParams } from "next/navigation";

const FundingId = () => {
  const params = useParams();
  const fundingId = params.FundingId;

  return (
    <AdminDashboardLayout>
      <FundingProvider fundingId={fundingId} />
    </AdminDashboardLayout>
  );
};

export default FundingId;
