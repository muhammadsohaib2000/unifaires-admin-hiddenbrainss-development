"use client";
import AdminDashboardLayout from "@/components/layouts/AdminDashboard";
import UsersPage from "@/components/pages/Admin/Users";
import { useState } from "react";

const Users = () => {
  const [usersList, setUsersList] = useState<any>([]);

  return (
    <AdminDashboardLayout>
      <UsersPage allUsers={usersList} />
    </AdminDashboardLayout>
  );
};

export default Users;
