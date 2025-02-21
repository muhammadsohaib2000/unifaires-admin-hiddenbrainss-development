"use client";
import React, { useEffect, useState } from "react";
// app layout
import AdminDashboardLayout from "@/components/layouts/AdminDashboard";
// app components
import CreateUserPage from "@/components/pages/Admin/Users/Create";
import { GetSessionParams, getSession, useSession } from "next-auth/react";
import config from "@/app/utils/config";
import axios from "axios";
interface IRole {
  title: string;
  id: number;
}

const CreateUser = () => {
  const { data: session } = useSession();
  const [roles, setRoles] = useState<IRole[]>([]);

  const fetchRoles = async () => {
    await axios
      .get(`${config.API.API_URL}/roles`, {
        headers: {
          "x-token": session?.user?.token,
        },
      })
      .then((res) => {
        setRoles(res.data);
      });
  };

  useEffect(() => {
    fetchRoles();
  });

  return (
    <AdminDashboardLayout>
      <CreateUserPage roles={roles} />
    </AdminDashboardLayout>
  );
};

export default CreateUser;
