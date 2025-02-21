"use client";
import React from "react";
import AdminDashboardLayout from "@/components/layouts/AdminDashboard";
import { CourseProvider } from "@/components/pages/Admin/Courses/Create/CourseContext";
import { useParams } from "next/navigation";

const CourseId = () => {
  const params = useParams();
  const courseId = params.CourseId;

  return (
    <AdminDashboardLayout>
      <CourseProvider courseId={courseId} />
    </AdminDashboardLayout>
  );
};

export default CourseId;
