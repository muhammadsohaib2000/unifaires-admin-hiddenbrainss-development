"use client";
import React, { useState, Fragment } from "react";
import { Button, Form, Input, Modal, Typography, message } from "antd";
import axios from "axios";
import config from "@/app/utils/config";
import { useSession } from "next-auth/react";

interface ModalInt {
  isModalOpen: boolean;
  setIsModalOpen: Function;
  fetchTeams: Function;
}
const CreateTeam = ({ isModalOpen, setIsModalOpen, fetchTeams }: ModalInt) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { data: session } = useSession();
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleFinish = async () => {
    const formData = form.getFieldsValue();
    setLoading(true);
    await axios
      .post(
        `${config.API.API_URL}/team`,
        {
          ...formData,
        },
        {
          headers: {
            "x-token": session?.user?.token,
          },
        }
      )
      .then((res) => {
        if (res.status) {
          message.success("Team Created Successfully");
          handleCancel();
          fetchTeams();
          form.resetFields();
        }
      })
      .catch((e) => {
        console.log(e);
        message.error("Unable to create Team. Try again");
      });
    setLoading(false);
  };
  return (
    <Fragment>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        centered={true}
      >
        <Typography.Title level={3}>
          Create Team or Business Unit
        </Typography.Title>
        <Form layout="vertical" form={form}>
          <Form.Item
            label="Team or Business Unit Name"
            name="title"
            required
            className="mt-4"
          >
            <Input
              size="large"
              placeholder="Software Support Team"
              className="rounded-none"
            />
          </Form.Item>
          <Form.Item name="description">
            <Input.TextArea
              rows={4}
              size="large"
              placeholder="Enter Team Description"
            />
          </Form.Item>
          <Button
            type="primary"
            size="large"
            loading={loading}
            onClick={handleFinish}
          >
            Create Team
          </Button>
        </Form>
      </Modal>
    </Fragment>
  );
};
export default CreateTeam;
