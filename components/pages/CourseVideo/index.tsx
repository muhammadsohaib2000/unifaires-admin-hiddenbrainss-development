"use client";
import React, { useEffect, useState } from "react";
import LecturePlayer from "./LecturePlayer";
import axiosInstance from "@/app/utils/axios-config";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { fetchUserRole } from "@/redux/features/UserSlice";
import { useParams } from "next/navigation";
const CourseVideoPage = ({ lectureVideo }: any) => {
  const params = useParams();
  const courseId = params.courseId;
  const [course, setCourse] = useState();
  const [loading, setLoading] = useState(false);
  const dispatch: any = useAppDispatch();

  // console.log("here is the course id", courseId);

  useEffect(() => {
    dispatch(fetchUserRole());
  }, []);

  const userType = useAppSelector((state: any) => state.user.userRole);

  const fetchCourseDetails = async () => {
    try {
      const url = userType == "admin" ? "/course" : "/enrol-course";
      setLoading(true);
      const courseResponse = await axiosInstance.get(`${url}/${courseId}`);
      if (courseResponse) {
        const resData = courseResponse.data.data;
        // console.log("here is course res", courseResponse);
        setCourse(resData);
      } else {
        console.log("Encountered an error", courseResponse);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (userType) {
      fetchCourseDetails();
    }
  }, [courseId, userType]);
  return (
    <div>
      <Spin
        spinning={loading}
        indicator={
          <LoadingOutlined className="flex items-center justify-center text-6xl" />
        }
        className="min-h-[400px]"
      >
        <LecturePlayer
          course={course}
          fetchCourseDetails={fetchCourseDetails}
        />
      </Spin>
    </div>
  );
};

export default CourseVideoPage;
