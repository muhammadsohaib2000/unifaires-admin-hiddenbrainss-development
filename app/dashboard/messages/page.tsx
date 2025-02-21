"use client";
import { Empty, Typography } from "antd";
// app layout
import AdminDashboardLayout from "@/components/layouts/AdminDashboard";
// app components
import MessagesPage from "@/components/pages/Admin/Messages";

const Messages = () => {
  return (
    <AdminDashboardLayout>
      <MessagesPage>
        <div className="grid place-items-center h-96">
          <Empty
            description={
              <div className="text-center">
                <Typography.Title level={4}>No Chats</Typography.Title>
                <Typography.Text>
                  Search your contact list to start a conversation
                </Typography.Text>
              </div>
            }
          />
        </div>
      </MessagesPage>
    </AdminDashboardLayout>
  );
};

export default Messages;
