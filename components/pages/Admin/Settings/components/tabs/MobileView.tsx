"use client";
import React, { Fragment, useState } from "react";
import Applications from "../Application";
import { Button, Divider, Typography } from "antd";
import ModalPart from "../Modal";
import Title from "antd/es/skeleton/Title";

export default function MobileView() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { Title, Text } = Typography;

  const openModal = () => {
    setIsModalVisible(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <Fragment>
      <Divider />
      <div>
        <Title level={4} className="pt-2 mt-4">
          Applications
        </Title>
        <Applications />
      </div>
      <Divider />
    </Fragment>
  );
}
