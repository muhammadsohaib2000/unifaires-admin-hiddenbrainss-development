import AdminDashboardLayout from "@/components/layouts/AdminDashboard";
// app components
import MessagesPage from "@/components/pages/Admin/Messages";
import MessageSection from "@/components/pages/Admin/Messages/MessageSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires - Messages",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const Messages = () => {
  return (
    <AdminDashboardLayout>
      <MessagesPage>
        <MessageSection />
      </MessagesPage>
    </AdminDashboardLayout>
  );
};

export default Messages;
