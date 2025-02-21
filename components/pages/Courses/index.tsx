"use client";
import {
  Grid,
  Row,
  Col,
  Spin,
  Pagination,
  DatePicker,
  Skeleton,
  Drawer,
  Button,
} from "antd";

import React, { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import axios from "axios";
import config from "@/app/utils/config";
import { useRouter, useSearchParams } from "next/navigation";
import SideFilter from "./SideFilter";
import {
  CloseOutlined,
  FilterOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import Typography from "antd/es/typography/Typography";
import { handleAxiosError } from "@/app/utils/axiosError";
import axiosInstance from "@/app/utils/axios-config";

const CoursesPage = () => {
  const screens = Grid.useBreakpoint();
  // console.log(screens);
  const [filterCollapsed, setFilterCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchingCourse, setFetchingCourse] = useState(true);
  const [courseList, setCourseList] = useState<Array<any>>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCourses, setTotalCourses] = useState(0);
  const [pageSize, setPageSize] = useState(12);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState<any>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const filterTerms: any = searchParams.get("filterTerms");
  const categoryId = searchParams.get("categoryId");
  const [applyLoading, setApplyLoading] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<any>({
    educationLevel: "",
    countryCity: "",
    // More filters
  });

  // Categories functions
  useEffect(() => {
    if (categoryId) {
      try {
        axios
          .get(`${config.API.API_URL}/category/${categoryId}`)
          .then((res) => {
            console.log(res);
            setCategory(res.data.data);
          });
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    } else {
      try {
        axios.get(`${config.API.API_URL}/category`).then((res) => {
          setCategory(res.data.data);
        });
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    }
  }, [categoryId]);

  const fetchCourses = async (page: any) => {
    try {
      setFetchingCourse(true);

      const response = await axiosInstance.get(
        `/course?page=${page}&limit=${pageSize}`
      );
      if (response.status) {
        const resData = response.data.data;
        const filteredCourses = resData.courses.filter(
          (c: any) => c.pricing !== null
        );
        setCourseList(filteredCourses);
        setTotalCourses(resData.count);
        setCurrentPage(resData.currentPage);
        // console.log("this is the ", response);

        setFetchingCourse(false);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setFetchingCourse(false);
    }
  };

  const buildQuery = (params: { [key: string]: any }) => {
    const query = Object.entries(params)
      .filter(
        ([_, value]) => value !== undefined && value !== null && value !== ""
      )
      .flatMap(([key, value]) =>
        Array.isArray(value)
          ? value.map(
              (val) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`
            )
          : `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join("&");
    return query ? `?${query}` : "";
  };

  const fetchFilteredCourses = async () => {
    try {
      setIsLoading(true);
      const parsedFilter = filterTerms
        ? JSON.parse(decodeURIComponent(filterTerms))
        : {};

      const queryString = buildQuery(parsedFilter);

      const res = await axiosInstance.get(`/course${queryString}`);
      if (res.status) {
        const course = res.data.data.courses;
        const filteredCourses = course.filter((c: any) => c.pricing !== null);

        closeFilter();
        if (course.length === 0) {
          fetchCourses(currentPage);
        } else {
          setCourseList(filteredCourses);
        }
      }
    } catch (error) {
      fetchCourses(currentPage);
      console.error("Error fetching filtered jobs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (filterTerms) {
      fetchFilteredCourses();
    } else if (!categoryId) {
      fetchCourses(currentPage);
    }
  }, [filterTerms, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const toggleFilter = () => {
    setFilterCollapsed(true);
  };

  const closeFilter = () => {
    setFilterCollapsed(false);
  };

  return (
    <div>
      <Spin
        className="flex justify-center item-center"
        spinning={isLoading}
        indicator={<LoadingOutlined className="text-6xl" />}
      >
        <section className="xl:px-6 xl:py-10 p-2">
          <div className="mb-4">
            {(screens.xs || screens.sm || screens.md) && !screens.lg && (
              <div>
                <div className="flex  ">
                  <Button
                    size="large"
                    type="default"
                    className="flex items-center justify-center ml-auto rounded-[6px]"
                    onClick={toggleFilter}
                    icon={
                      !filterCollapsed ? <FilterOutlined /> : <CloseOutlined />
                    }
                  >
                    Filter{" "}
                  </Button>
                </div>
                <Drawer
                  // closable={false}
                  placement="right"
                  open={filterCollapsed}
                  onClose={closeFilter}
                  width={320}
                  extra={
                    <Button
                      size="large"
                      type="text"
                      className="flex justify-center items-center text-blue-600"
                      onClick={() => {
                        router.push("/courses");
                      }}
                    >
                      Clear Filter
                    </Button>
                  }
                  // footer={
                  //   <div className="flex items-center justify-center w-full">
                  //     <Button
                  //       size="large"
                  //       type="primary"
                  //       className="flex justify-center items-center w-full bg-blue-600 rounded-[6px]"
                  //       onClick={handleCourseFilters}
                  //       loading={applyLoading}
                  //     >
                  //       Apply
                  //     </Button>
                  //   </div>
                  // }
                >
                  <SideFilter
                    category={category}
                    fetchCourses={fetchCourses}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    setCourseList={setCourseList}
                    setIsLoading={setIsLoading}
                    selectedFilters={selectedFilters}
                    setSelectedFilters={setSelectedFilters}
                  />
                </Drawer>
              </div>
            )}
          </div>
          <Row gutter={16}>
            {(screens.lg || screens.xxl || screens.xl) && (
              <SideFilter
                category={category}
                fetchCourses={fetchCourses}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                setCourseList={setCourseList}
                setIsLoading={setIsLoading}
                selectedFilters={selectedFilters}
                setSelectedFilters={setSelectedFilters}
              />
            )}
            <Col xl={18} sm={24} xs={24}>
              {/* <Spin spinning={isLoading} size="large"> */}
              <Skeleton active loading={fetchingCourse}>
                <div className="flex flex-col gap-1 w-full">
                  {courseList !== undefined &&
                    courseList.map((eachCourse, index) => {
                      return (
                        <div key={`course-item-${index}`} className=" ">
                          <CourseCard {...eachCourse} />
                        </div>
                      );
                    })}
                </div>
              </Skeleton>
              {/* </Spin> */}
              <Col className="flex justify-center pt-4">
                <Pagination
                  current={currentPage}
                  pageSize={pageSize}
                  total={totalCourses}
                  onChange={handlePageChange}
                  className="flex ml-auto pt-4"
                />
              </Col>
            </Col>
          </Row>
        </section>
      </Spin>
    </div>
  );
};

export default CoursesPage;
