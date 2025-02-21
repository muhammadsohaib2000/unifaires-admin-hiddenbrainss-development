"use client";

import { CloseOutlined, LeftOutlined, SearchOutlined } from "@ant-design/icons";
import {
  countriesAndCities,
  companiesAndInstitutions,
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

import { Fragment, useEffect, useState } from "react";
import axiosInstance from "@/app/utils/axios-config";

import { useRouter } from "next/navigation";

import { handleAxiosError } from "@/app/utils/axiosError";

const SideFilter = ({
  category,
  fetchFundings,
  setIsLoading,
  searchQuery,
  setSearchQuery,
  selectedFilters,
  setSelectedFilters,
  setFunding,
}: any) => {
  const { Title, Paragraph } = Typography;
  const screens = Grid.useBreakpoint();
  const { Panel } = Collapse;
  const { RangePicker } = DatePicker;
  const [datePicker, setDatePicker] = useState(false);
  const router = useRouter();
  const [minSalary, setMinSalary] = useState<any>();
  const [maxSalary, setMaxSalary] = useState<any>();

  const handleCategoryClick = (id: any, name: string) => {
    router.push(`/funding?categoryId=${id}`);
  };

  const handleSearchInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    searchType: string
  ) => {
    const newSearchQuery = event.target.value;
    setSearchQuery(newSearchQuery);
    if (newSearchQuery === "") {
      // setFunding([]);
      fetchFundings();
      setIsLoading(false);
    } else {
      setIsLoading(true);

      try {
        const response = await axiosInstance.get(
          `/funding?${searchType}=${newSearchQuery}`
        );
        const funding = response.data.data;
        setFunding(funding.funding);
      } catch (error) {
        console.error("Error fetching funding:", error);
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
    router.push(`/career?filterTerms=${queryString}`, undefined);
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

  const handleSalaryFilter = () => {
    const newFilters = {
      ...selectedFilters,
      minSalary,
      maxSalary,
    };
    setSelectedFilters(newFilters);
    updateURL(newFilters);
  };

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
                  onClick={() => router.push("/funding")}
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
                  onClick={() => router.push("/funding")}
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
          {/* Application DeadLine */}
          <Panel
            header={
              <Title level={5} className="text-black">
                Application Deadline
              </Title>
            }
            key="1"
          >
            <Row gutter={[16, 4]} className="flex md:flex-col">
              <Radio.Group
                onChange={(e) =>
                  handleRadioClick("applicationDeadline", e.target.value)
                }
              >
                <Radio value={"Anytime"} onClick={() => setDatePicker(false)}>
                  Anytime
                </Radio>
                <Radio value={"Fixed"} onClick={() => setDatePicker(true)}>
                  Fixed
                </Radio>
              </Radio.Group>
              {datePicker && <RangePicker size="middle" />}
            </Row>
          </Panel>
          {/* Estimated yearly salary */}
          <Panel
            header={
              <Title level={5} className="text-black">
                Estimated Funding Size
              </Title>
            }
            key="3"
          >
            <Space size="large" className="pt-5">
              <InputNumber
                type="number"
                placeholder="Min"
                onChange={(value) => setMinSalary(value)}
              />
              <InputNumber
                type="number"
                placeholder="Max"
                onChange={(value) => setMaxSalary(value)}
              />
              <Button
                type="primary"
                shape="round"
                size="small"
                onClick={handleSalaryFilter}
              >
                Go
              </Button>
            </Space>
          </Panel>

          {/* Country and City */}
          <Panel
            header={
              <Title level={5} className="text-black">
                Country & City
              </Title>
            }
            key="6"
          >
            <Row gutter={[16, 4]} className="flex md:flex-col">
              <Col xl={24} className="py-2">
                <Input
                  placeholder="Search Country & City"
                  suffix={<SearchOutlined />}
                  value={searchQuery}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handleSearchInputChange(event, "country")
                  }
                />
              </Col>
            </Row>
          </Panel>

          {/* Company or Institution */}
          <Panel
            header={
              <Title level={5} className="text-black">
                Company or Institution
              </Title>
            }
            key="9"
          >
            <Row gutter={[16, 4]} className="flex md:flex-col">
              <Col xl={24} className="py-2">
                <Input
                  placeholder=" Search Company or Institution"
                  suffix={<SearchOutlined />}
                />
              </Col>
              <Radio.Group
                onChange={(e) => handleRadioClick("company", e.target.value)}
              >
                {generateRadioOptions(companiesAndInstitutions)}
              </Radio.Group>
            </Row>
          </Panel>
        </Collapse>
        {/*Average Rating */}
      </Col>
    </Fragment>
  );
};

export default SideFilter;
