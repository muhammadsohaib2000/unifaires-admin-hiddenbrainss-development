"use client";
import React, { Fragment } from "react";
// ant components
import { Col, Row } from "antd";
// App components
import { courses } from "../Courses/CourseList";
import LearningSearchForm from "./LearningSearchForm";
import CourseCard from "@/components/shared/cards/CourseCard";

const CourseList: React.FC = () => {
  return (
    <Fragment>
      <LearningSearchForm />
      <Row gutter={[16, 16]}>
        {courses.map((course, index) => {
          // console.log(course);
          return (
            <Col key={`course-item-${course.id}`} md={12} lg={8} xl={6}>
              {/* <CourseCard {...course} progress={(index + 1) * 4} /> */}
            </Col>
          );
        })}
      </Row>
    </Fragment>
  );
};

export default CourseList;
