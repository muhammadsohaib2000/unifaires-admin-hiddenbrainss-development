"use client";
import React, { Fragment } from "react";
// ant components
import { Col, Row, Button, Typography } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
// App components
import { courses } from "../Courses/CourseList";
import CollectionSearchForm from "./CollectionSearchForm";

const CourseList: React.FC = () => {
  return (
    <Fragment>
      <CollectionSearchForm />
      <div className="flex items-center gap-2 mb-2">
        <Typography.Title level={5}>Samuel Jake</Typography.Title>
        <Button
          type="text"
          shape="circle"
          title="Edit Collection"
          icon={<EditOutlined />}
        />
        <Button
          type="text"
          shape="circle"
          title="Delete Collection"
          icon={<DeleteOutlined />}
        />
      </div>
      <Row gutter={[16, 16]} className="mb-8">
        {courses.slice(0, 4).map((course) => {
          return (
            <Col key={`course-item-${course.id}`} md={12} lg={8} xl={6}>
              {/* <CourseCard {...course} /> */}
            </Col>
          );
        })}
      </Row>
      <div className="flex items-center gap-2 mb-2">
        <Typography.Title level={5}>Literature in English</Typography.Title>
        <Button
          type="text"
          shape="circle"
          title="Edit Collection"
          icon={<EditOutlined />}
        />
        <Button
          type="text"
          shape="circle"
          title="Delete Collection"
          icon={<DeleteOutlined />}
        />
      </div>
      <Row gutter={[16, 16]} className="mb-8">
        {courses.slice(0, 4).map((course) => {
          return (
            <Col key={`course-item-${course.id}`} md={12} lg={8} xl={6}>
              {/* <CourseCard {...course} /> */}
            </Col>
          );
        })}
      </Row>
    </Fragment>
  );
};

export default CourseList;
