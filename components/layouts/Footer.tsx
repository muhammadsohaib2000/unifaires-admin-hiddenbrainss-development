"use client";

import { Row, Col, Typography } from "antd";
import Container from "@/components/shared/container";

const { Paragraph } = Typography;

const Footer = () => {
  /**
   * Get copy write text
   */
  const getCopyRightText = () => {
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;

    return `Copyright © ${currentYear}-${nextYear} Unifaires. All Rights Reserved`;
  };

  return (
    <footer>
      <section className="bg-blue-50 min-h-[14vh] grid justify-items-center items-center">
        <Container className="container-fluid">
          <Row className="w-full" gutter={[16, 16]}>
            <Col xs={24} lg={24}>
              <Paragraph className="mb-0 text-white text-center">
                {getCopyRightText()}
              </Paragraph>
            </Col>
          </Row>
        </Container>
      </section>
    </footer>
  );
};

export default Footer;
