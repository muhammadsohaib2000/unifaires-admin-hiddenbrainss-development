"use client";
import { LeftOutlined, SearchOutlined } from "@ant-design/icons";
import {
  educationLevels,
  programStartDate,
  applicationFee,
  programType,
  internationalRanking,
  nationalRanking,
  qualificationType,
  level,
  studyPace,
  studyMode,
  tuition,
  duration,
  features,
  admissionCriteria,
  institutionalOwnership,
  courseInstitutionalType,
  companiesAndInstitutions,
  languageCertificationRequirement,
  subtitleLanguage,
  Language,
} from "@/components/Constants";
import {
  Col,
  Typography,
  Divider,
  Collapse,
  Row,
  Input,
  Radio,
  Checkbox,
  Space,
  InputNumber,
  Button,
  Rate,
  DatePicker,
  Grid,
} from "antd";
import Panel from "antd/es/cascader/Panel";
import datePicker from "antd/es/date-picker";
import { Title } from "chart.js";
import { Fragment, useEffect, useState } from "react";
import axiosInstance from "@/app/utils/axios-config";
import { RadioChangeEvent } from "antd/lib";
import { useRouter } from "next/navigation";
import { object } from "remirror";
import { handleAxiosError } from "@/app/utils/axiosError";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";

const SideFilter = ({
  category,
  fetchCourses,
  setIsLoading,
  searchQuery,
  setSearchQuery,
  setCourse,
  applyLoading,
  handleCourseFilters,
  selectedFilters,
  setSelectedFilters,
}: any) => {
  const { Title, Paragraph } = Typography;
  const screens = Grid.useBreakpoint();
  const { Panel } = Collapse;
  const { RangePicker } = DatePicker;
  const [datePicker, setDatePicker] = useState(false);
  const router = useRouter();

  const handleCategoryClick = (id: any, name: string) => {
    router.push(`/courses?categoryId=${id}`);
  };

  const handleSearchInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    searchType: string
  ) => {
    const newSearchQuery = event.target.value;
    setSearchQuery(newSearchQuery);
    if (newSearchQuery === "") {
      // setJob([]);
      fetchCourses();
      setIsLoading(false);
    } else {
      setIsLoading(true);

      try {
        const response = await axiosInstance.get(
          `/course?${searchType}=${newSearchQuery}`
        );
        const courses = response.data.data;
        setCourse(courses.courses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleRadioClick = (filterName: string, value: string) => {
    const newFilters = {
      ...selectedFilters,
      [filterName]: value,
    };
    setSelectedFilters(newFilters);
    updateURL(newFilters);
  };

  const updateURL = (filters: any) => {
    const queryString = encodeURIComponent(JSON.stringify(filters));
    router.push(`/courses?filterTerms=${queryString}`);
  };

  function generateRadioOptions(options: any[]) {
    return options.map((option, index) => (
      <Col xl={24} key={index}>
        <Radio value={option}>{option}</Radio>
      </Col>
    ));
  }

  const handleMinMaxValue = (value: number | string | null) => {
    console.log("changed", value);
  };

  const skillOption = useAppSelector(
    (state: RootState) => state.user.skillsOption
  );

  return (
    <Fragment>
      <Col xl={6} sm={24} xs={24} className="lg:pr-10 md:pr-6 pr-4">
        <div>
          <Typography.Title level={3} className="pl-2 pt-2">
            Categories
          </Typography.Title>
        </div>
        <div className="max-h-[500px] overflow-y-scroll custom-scrollbar">
          {category && !Array.isArray(category) ? (
            <div>
              <div>
                <LeftOutlined />
                <Typography.Link
                  className="text-black hover:font-semibold"
                  onClick={() => router.push("/courses")}
                >
                  All
                </Typography.Link>
              </div>
              <div>
                {category.ancestors &&
                  category.ancestors !== null &&
                  category.ancestors.map((parent: any) => {
                    return (
                      <div key={parent.id} className="flex flex-row gap-2 ">
                        <LeftOutlined />
                        <Typography.Link
                          className="text-black hover:font-semibold"
                          onClick={() =>
                            handleCategoryClick(parent.id, parent.name)
                          }
                        >
                          {parent.name}
                        </Typography.Link>
                      </div>
                    );
                  })}
              </div>
              <div className="flex flex-row gap-2 ">
                <Typography.Paragraph className="font-bold mb-0">
                  {category.name}
                </Typography.Paragraph>
              </div>
              {category?.children &&
                category?.children.map((child: any) => {
                  return (
                    <div key={child.id} className="ml-4">
                      <Typography.Link
                        className="text-black hover:font-semibold"
                        onClick={() =>
                          handleCategoryClick(child.id, child.name)
                        }
                      >
                        {child.name}
                      </Typography.Link>
                    </div>
                  );
                })}
            </div>
          ) : (
            <div>
              <div className="ml-4">
                {/* <LeftOutlined /> */}
                <Typography.Link
                  className="text-black font-bold hover:text-blue-600"
                  onClick={() => router.push("/courses")}
                >
                  All
                </Typography.Link>
              </div>
              {category &&
                category.map((eachCategory: any) => {
                  return (
                    <div key={eachCategory.id} className="ml-4">
                      <Typography.Link
                        className="text-black hover:font-semibold"
                        onClick={() =>
                          handleCategoryClick(
                            eachCategory.id,
                            eachCategory.name
                          )
                        }
                      >
                        {eachCategory.name}
                      </Typography.Link>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
        {/* <Divider /> */}
        <Collapse defaultActiveKey={["1"]} ghost expandIconPosition="end">
          <Panel
            header={
              <Title level={5} className="text-black">
                Levels of Education
              </Title>
            }
            key="2"
          >
            <Row gutter={[16, 4]} className="flex md:flex-col">
              <Radio.Group
                onChange={(e) =>
                  handleRadioClick("educationLevel", e.target.value)
                }
              >
                {generateRadioOptions(educationLevels)}
              </Radio.Group>
            </Row>
          </Panel>
          {/* Country & City */}
          <Panel
            header={
              <Title level={5} className="text-black">
                Country & City
              </Title>
            }
            key="3"
          >
            <Row gutter={[16, 4]} className="flex md:flex-col">
              <Col xl={24} className="py-2">
                <Input
                  placeholder="Search Job Title"
                  suffix={<SearchOutlined />}
                  value={searchQuery}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handleSearchInputChange(event, "country")
                  }
                />
              </Col>
            </Row>
          </Panel>
          {/* Skills and Expertises */}
          <Panel
            header={
              <Title level={5} className="text-black">
                Skills & Expertise
              </Title>
            }
            key="4"
          >
            <div className="py-2">
              <Input
                placeholder="Search Skills & Expertise"
                suffix={<SearchOutlined />}
              />
            </div>
            <div className="flex flex-col gap-2 max-h-[300px] overflow-y-scroll custom-scrollbar">
              <Checkbox.Group
                onChange={(e: any) => handleRadioClick("skills", e)}
                options={skillOption}
              />
            </div>
          </Panel>
          {/* Application DeadLine */}
          <Panel
            header={
              <Title level={5} className="text-black">
                Application Deadline
              </Title>
            }
            key="5"
          >
            <Row gutter={[16, 4]} className="flex md:flex-col">
              <Radio.Group
              // onChange={(e) =>}
              >
                <Radio value={"Anytime"} onClick={() => setDatePicker(false)}>
                  Anytime
                </Radio>
                <Radio value={"Fixed"} onClick={() => setDatePicker(true)}>
                  Fixed
                </Radio>
              </Radio.Group>
              {datePicker && (
                <RangePicker
                  onChange={(e: any) => handleRadioClick("deadline", e)}
                  size="middle"
                />
              )}
            </Row>
          </Panel>
          {/* Program Start Date */}
          <Panel
            header={
              <Title level={5} className="text-black">
                Program Start Date
              </Title>
            }
            key="6"
          >
            <Row gutter={[16, 4]} className="flex md:flex-col">
              <Radio.Group
                onChange={(e) =>
                  handleRadioClick("programStartDate", e.target.value)
                }
              >
                {generateRadioOptions(programStartDate)}
              </Radio.Group>
            </Row>
          </Panel>
          {/* Application Fee */}
          <Panel
            header={
              <Title level={5} className="text-black">
                Application Fee
              </Title>
            }
            key="30"
          >
            <Row gutter={[16, 4]} className="flex md:flex-col">
              <Radio.Group
                onChange={(e) =>
                  handleRadioClick("applicationFee", e.target.value)
                }
              >
                {generateRadioOptions(applicationFee)}
              </Radio.Group>
            </Row>
          </Panel>
          {/* Program Type */}
          <Panel
            header={
              <Title level={5} className="text-black">
                Program Type
              </Title>
            }
            key="7"
          >
            <Row gutter={[16, 4]} className="flex md:flex-col">
              <Radio.Group
                onChange={(e) =>
                  handleRadioClick("programType", e.target.value)
                }
              >
                {generateRadioOptions(programType)}
              </Radio.Group>
            </Row>
          </Panel>
          {/* Program Ranking */}
          <Panel
            header={
              <Title level={5} className="text-black">
                Program Ranking
              </Title>
            }
            key="8"
          >
            <Row gutter={[16, 4]} className="flex md:flex-col">
              <Radio
                value={"Ranking Not Applicable"}
                onChange={(e) =>
                  handleRadioClick("programRanking", e.target.value)
                }
              >
                Ranking Not Applicable
              </Radio>
              <Typography.Paragraph className="text-purple-600 mb-0 mt-2">
                International Ranking
              </Typography.Paragraph>
              <Radio.Group
                onChange={(e) =>
                  handleRadioClick("programRanking", e.target.value)
                }
              >
                {generateRadioOptions(internationalRanking)}
              </Radio.Group>
              <Typography.Paragraph className="text-purple-600 mb-0 mt-2">
                National Ranking
              </Typography.Paragraph>
              <Radio.Group
                onChange={(e) =>
                  handleRadioClick("programRanking", e.target.value)
                }
              >
                {generateRadioOptions(nationalRanking)}
              </Radio.Group>
            </Row>
          </Panel>
          {/*Qualificatin & Certification Type */}
          <Panel
            header={
              <Title level={5} className="text-black">
                Qualification & Certification Type
              </Title>
            }
            key="9"
          >
            <Row gutter={[16, 4]} className="flex md:flex-col">
              <Radio.Group
                onChange={(e) =>
                  handleRadioClick("qualificationType", e.target.value)
                }
              >
                {generateRadioOptions(qualificationType)}
              </Radio.Group>
            </Row>
          </Panel>
          {/* Duration */}
          <Panel
            header={
              <Title level={5} className="text-black">
                Duration
              </Title>
            }
            key="10"
          >
            <Row gutter={[16, 4]} className="flex md:flex-col">
              <Radio.Group
                onChange={(e) => handleRadioClick("duration", e.target.value)}
              >
                {generateRadioOptions(duration)}
              </Radio.Group>
            </Row>
          </Panel>
          {/* Level */}
          <Panel
            header={
              <Title level={5} className="text-black">
                Level
              </Title>
            }
            key="11"
          >
            <Row gutter={[16, 4]} className="flex md:flex-col">
              <Radio.Group
                onChange={(e) => handleRadioClick("level", e.target.value)}
              >
                {generateRadioOptions(level)}
              </Radio.Group>
            </Row>
          </Panel>
          {/* Study Pace */}
          <Panel
            header={
              <Title level={5} className="text-black">
                Study Pace
              </Title>
            }
            key="12"
          >
            <Row gutter={[16, 4]} className="flex md:flex-col">
              <Radio.Group
                onChange={(e) => handleRadioClick("studyPace", e.target.value)}
              >
                {generateRadioOptions(studyPace)}
              </Radio.Group>
            </Row>
          </Panel>
          {/* Study Mode */}
          <Panel
            header={
              <Title level={5} className="text-black">
                Study Mode
              </Title>
            }
            key="13"
          >
            <Row gutter={[16, 4]} className="flex md:flex-col">
              <Radio.Group
                onChange={(e) => handleRadioClick("studyMode", e.target.value)}
              >
                {generateRadioOptions(studyMode)}
              </Radio.Group>
            </Row>
          </Panel>
          {/* Tuition & Cost */}
          <Panel
            header={
              <Title level={5} className="text-black">
                Tuition & Cost
              </Title>
            }
            key="14"
          >
            <Row gutter={[16, 4]} className="flex md:flex-col">
              <Radio.Group
                onChange={(e) => handleRadioClick("tuition", e.target.value)}
              >
                {generateRadioOptions(tuition)}
              </Radio.Group>
            </Row>
            <Space size="large" className="pt-5">
              <InputNumber
                type="number"
                placeholder="Min"
                onChange={handleMinMaxValue}
              />
              <InputNumber
                type="number"
                placeholder="Max"
                onChange={handleMinMaxValue}
              />
              <Button type="primary" shape="round" size="small">
                Go
              </Button>
            </Space>
          </Panel>
          {/* Admission Criteria */}
          <Panel
            header={
              <Title level={5} className="text-black">
                Admission Criteria
              </Title>
            }
            key="15"
          >
            <Row gutter={[16, 4]} className="flex md:flex-col">
              <Radio.Group
                onChange={(e) =>
                  handleRadioClick("admissionCriteria", e.target.value)
                }
              >
                {generateRadioOptions(admissionCriteria)}
              </Radio.Group>
            </Row>
          </Panel>
          {/* Institution Ownership */}
          <Panel
            header={
              <Title level={5} className="text-black">
                Institution Ownership
              </Title>
            }
            key="16"
          >
            <Row gutter={[16, 4]} className="flex md:flex-col">
              <Radio.Group
                onChange={(e) =>
                  handleRadioClick("institution Ownership", e.target.value)
                }
              >
                {generateRadioOptions(institutionalOwnership)}
              </Radio.Group>
            </Row>
          </Panel>
          {/* Course Institution Type */}
          <Panel
            header={
              <Title level={5} className="text-black">
                Course Institutional Type
              </Title>
            }
            key="17"
          >
            <Row gutter={[16, 4]} className="flex md:flex-col">
              <Radio.Group
                onChange={(e) =>
                  handleRadioClick("courseInstitutionalType", e.target.value)
                }
              >
                {generateRadioOptions(courseInstitutionalType)}
              </Radio.Group>
            </Row>
          </Panel>
          {/* Featueres */}
          <Panel
            header={
              <Title level={5} className="text-black">
                Features
              </Title>
            }
            key="18"
          >
            <Row gutter={[16, 4]} className="flex md:flex-col">
              <Radio.Group
                onChange={(e) => handleRadioClick("features", e.target.value)}
              >
                {generateRadioOptions(features)}
              </Radio.Group>
            </Row>
          </Panel>
          {/* Company & Institution */}
          <Panel
            header={
              <Title level={5} className="text-black">
                Company & Institution
              </Title>
            }
            key="19"
          >
            <Col xl={24} className="py-2">
              <Input
                placeholder="Search Comapny or Institution"
                suffix={<SearchOutlined />}
              />
            </Col>
            <Row gutter={[16, 4]} className="flex md:flex-col">
              <Radio.Group
                onChange={(e) => handleRadioClick("company", e.target.value)}
              >
                {generateRadioOptions(companiesAndInstitutions)}
              </Radio.Group>
            </Row>
          </Panel>
          {/* Language */}
          <Panel
            header={
              <Title level={5} className="text-black">
                Langugae
              </Title>
            }
            key="20"
          >
            <Col xl={24} className="py-2">
              <Input
                placeholder="Search Language"
                suffix={<SearchOutlined />}
              />
            </Col>
            <Row gutter={[16, 4]} className="flex md:flex-col">
              <Radio.Group
                onChange={(e) => handleRadioClick("language", e.target.value)}
              >
                {generateRadioOptions(Language)}
              </Radio.Group>
            </Row>
          </Panel>
          {/* Language certification Requirement */}
          <Panel
            header={
              <Title level={5} className="text-black">
                Langugae Certification Requirement
              </Title>
            }
            key="21"
          >
            <Row gutter={[16, 4]} className="flex md:flex-col">
              <Radio.Group
                onChange={(e) =>
                  handleRadioClick("languageCertification", e.target.value)
                }
              >
                {generateRadioOptions(languageCertificationRequirement)}
              </Radio.Group>
            </Row>
          </Panel>
          {/*Subtitle Language */}
          <Panel
            header={
              <Title level={5} className="text-black">
                Subtitle Langugae
              </Title>
            }
            key="22"
          >
            <Row gutter={[16, 4]} className="flex md:flex-col">
              <Radio.Group
                onChange={(e) =>
                  handleRadioClick("subtitle Language", e.target.value)
                }
              >
                {generateRadioOptions(subtitleLanguage)}
              </Radio.Group>
            </Row>
          </Panel>
        </Collapse>
        {/*Average Rating */}
        <div className="lg:pl-4 pl-4 mb-4">
          <Typography.Title level={5} className="text-black">
            Average Rating
          </Typography.Title>
          <Row gutter={[16, 4]} className="flex md:flex-col">
            <Radio.Group
              onChange={(e) => handleRadioClick("rating", e.target.value)}
            >
              <Col xl={24}>
                <Radio value={4}>
                  <Rate allowHalf disabled value={4} /> & Up
                </Radio>
              </Col>
              <Col xl={24}>
                <Radio value={3}>
                  <Rate allowHalf disabled value={3} /> & Up
                </Radio>
              </Col>
              <Col xl={24}>
                <Radio value={2}>
                  <Rate allowHalf disabled value={2} /> & Up
                </Radio>
              </Col>
              <Col xl={24}>
                <Radio value={1}>
                  <Rate allowHalf disabled value={1} /> & Up
                </Radio>
              </Col>
            </Radio.Group>
          </Row>
        </div>
      </Col>
    </Fragment>
  );
};

export default SideFilter;
