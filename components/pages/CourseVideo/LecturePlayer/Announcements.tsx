"use client";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import axiosInstance from "@/app/utils/axios-config";
import { Button, Form, Input, Spin, Typography } from "antd";
import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import "highlight.js/styles/monokai-sublime.css";
import * as katex from "katex";
import "katex/dist/katex.min.css";
if (typeof window !== "undefined") {
  window.katex = katex;
}
import dynamic from "next/dynamic";
import quillModules from "@/components/shared/QuillTextEditor/QuillTextEditorModule";
import { handleAxiosError, showSuccess } from "@/app/utils/axiosError";
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

const Announcements = ({ course, userType }: any) => {
  const [form] = Form.useForm();
  const courseId = course && course.id;
  const [announcements, setAnnouncements] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [fetchingAnnouncemnt, setFetchingAnnouncement] = useState(false);

  // console.log(course.id);

  const fetchALLAnnouncements = async () => {
    try {
      setFetchingAnnouncement(true);
      const res = await axiosInstance.get(
        `/course-announcement/course/${course.id}`
      );
      if (res.status) {
        setAnnouncements(res.data.data);
        console.log("fetch announcement rs", res);
      }
    } catch (error) {
      console.log("Unable to fetch course announcement", error);
    } finally {
      setFetchingAnnouncement(false);
    }
  };

  const handlePostAnnouncement = async () => {
    const formData = form.getFieldsValue();
    try {
      setLoading(true);
      const res = await axiosInstance.post("/course-announcement", {
        courseId: course.id,
        text: formData.text,
        title: "Announcement",
      });
      if (res.status) {
        showSuccess("Announcement Posted");
        fetchALLAnnouncements();
        form.resetFields();
      }
    } catch (error) {
      handleAxiosError(error);
      console.log("Unable to fetch course announcement", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAnnouncement = async (id: any) => {
    try {
      setFetchingAnnouncement(true);
      const res = await axiosInstance.delete(`/course-announcement/${id}`);
      if (res.status) {
        showSuccess("Announcement Deleted");
        fetchALLAnnouncements();
        form.resetFields();
      }
    } catch (error) {
      handleAxiosError(error);
      console.log("Unable to fetch course announcement", error);
    } finally {
      setFetchingAnnouncement(false);
    }
  };

  useEffect(() => {
    fetchALLAnnouncements();
  }, [courseId]);

  const FormatedText = ({ content }: any) => {
    return (
      <div className="prose mx-auto w-full max-w-none ">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    );
  };

  return (
    <div className="p-4">
      <Spin spinning={fetchingAnnouncemnt} size="large">
        {userType && userType === "admin" && (
          <Form layout="vertical" size="large" form={form} className="">
            <Form.Item name="text" className="min-h-[200px]">
              <ReactQuill
                theme="snow"
                className="font-normal h-[150px] "
                placeholder="Type your Announcements and format it "
                modules={quillModules}
              />
            </Form.Item>
            <div>
              <Button
                icon={<PlusOutlined />}
                type="primary"
                size="large"
                className="flex ml-auto items-center"
                loading={loading}
                onClick={handlePostAnnouncement}
              >
                Post
              </Button>
            </div>
          </Form>
        )}
        {announcements && announcements.length > 0 ? (
          announcements.map((a: any) => {
            return (
              <div key={a.id} className="mt-2 p-2 hover:bg-gray-100 rounded-md">
                {userType && userType === "admin" && (
                  <div className="flex ml-auto">
                    <Button
                      icon={
                        <DeleteOutlined className=" text-base text-red-600 " />
                      }
                      className="flex ml-auto "
                      onClick={() => handleDeleteAnnouncement(a.id)}
                    />
                  </div>
                )}
                <FormatedText content={a.text} />
              </div>
            );
          })
        ) : (
          <div className="flex justify-center items-center">
            <Typography.Title level={3}>No Announcement </Typography.Title>
          </div>
        )}
      </Spin>
    </div>
  );
};

export default Announcements;
