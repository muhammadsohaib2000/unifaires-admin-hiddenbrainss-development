"use client";
import React from "react";
// ant components
import { Row, Col } from "antd";
// app components
import ContactSection from "./ContactSection";
import Container from "@/components/shared/container";

interface MessagesPageProps {
  children: React.ReactNode;
}

const MessagesPage = ({ children }: MessagesPageProps) => {
  return (
    <section className="">
      <Container fluid className="px-0">
        <Row className="">
          <Col lg={8} xxl={6}>
            <ContactSection />
          </Col>
          <Col lg={16} xxl={18}>
            {children}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default MessagesPage;
