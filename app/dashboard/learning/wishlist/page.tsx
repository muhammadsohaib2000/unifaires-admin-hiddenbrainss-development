import AdminDashboardLayout from "@/components/layouts/AdminDashboard";
// app components
import WishlistPage from "@/components/pages/Admin/Courses/Wishlist";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires - Course WishList",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const Wishlist = () => {
  return (
    <AdminDashboardLayout>
      <WishlistPage />
    </AdminDashboardLayout>
  );
};

export default Wishlist;
