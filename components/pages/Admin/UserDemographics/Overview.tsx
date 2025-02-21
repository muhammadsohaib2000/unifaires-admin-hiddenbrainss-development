"use client";
import React, { PureComponent, useEffect, useState } from "react";
import {
  Bar,
  Cell,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Line,
  LineChart,
  Pie,
  PieChart,
} from "recharts";
// app components
import ChartForm from "./ChartForm";
import { handleAxiosError } from "@/app/utils/axiosError";
import axiosInstance from "@/app/utils/axios-config";
import moment from "moment";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const ChartOverview = () => {
  const [overview, setOverview] = useState<any>();
  const [userData, setUserData] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState();
  const [selectedDate, setSelectedDate] = useState();
  // console.log("here");

  const fetchUserDemography = async () => {
    const query = buildQuery({
      country: selectedCountry,
      date: selectedDate,
      // page,
      // limit: pageSize,
    });
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/stats/user-demography${query}`);

      if (res.status) {
        const resData = res.data.data;
        const weeklyData = resData.weeklyData;
        const weekRange = weeklyData.map((data: any) => {
          return {
            ...data,
            week: getWeekRange(data.period),
          };
        });
        // const reversedWeek = weekRange.reverse();

        // console.log("here is the weeklydata", reversedWeek);

        setOverview(resData);
        setUserData(weekRange);
      }
    } catch (error) {
      handleAxiosError(error);
      console.log("unable to fetch user demography", error);
    } finally {
      setLoading(false);
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

  // const getWeekRange = (weekOffset: any) => {
  //   const startOfWeek = moment().startOf("week").add(weekOffset, "weeks");
  //   const endOfWeek = moment().endOf("week").add(weekOffset, "weeks");
  //   return {
  //     startEnd: `${startOfWeek.format("ddd, MMM DD YYYY")} - ${endOfWeek.format(
  //       "ddd, MMM DD YYYY"
  //     )}`,
  //   };
  // };

  console.log("I am the selected Date", selectedDate);

  const getWeekRange = (weekString: any) => {
    // Extract the week offset from the string
    const weekOffset = parseInt(weekString.replace("Week ", ""), 10);

    // Calculate the start and end of the week based on the adjusted week offset
    const startOfWeek = moment().startOf("week").subtract(weekOffset, "weeks");
    const endOfWeek = moment().endOf("week").subtract(weekOffset, "weeks");
    const startEnd = `${startOfWeek.format("MMM DD")} - ${endOfWeek.format(
      "MMM DD"
    )}`;

    return startEnd;
  };
  useEffect(() => {
    fetchUserDemography();
  }, [selectedCountry, selectedDate]);

  const data = [
    {
      name: "Wed, Jan 25",
      new: 300,
      returning: 200,
      count: 2400,
    },
    {
      name: "Thur, Jan 26",
      new: 700,
      returning: 1000,
      count: 1398,
    },
    {
      name: "Fri, Jan 27",
      new: 1300,
      returning: 2000,
      count: 9800,
    },
    {
      name: "Sat, Jan 28",
      new: 200,
      returning: 500,
      count: 3908,
    },
    {
      name: "Tue, Mar 3",
      new: 200,
      returning: 100,
      count: 4800,
    },
    {
      name: "Wed, Mar 15",
      new: 800,
      returning: 1000,
      count: 4800,
    },
    {
      name: "Wed, May 25",
      new: 400,
      returning: 700,
      count: 4800,
    },
    {
      name: "Thur, May 26",
      new: 200,
      returning: 300,
      count: 4800,
    },
    {
      name: "Fri, May 27",
      new: 600,
      returning: 400,
      count: 4800,
    },
  ];

  class CustomizedAxisTick extends PureComponent {
    render() {
      const { x, y, stroke, payload }: any = this.props;

      return (
        <g transform={`translate(${x},${y})`}>
          <text
            x={0}
            y={0}
            dy={16}
            textAnchor="end"
            fill="#666"
            transform="rotate(-35)"
          >
            {payload.value}
          </text>
        </g>
      );
    }
  }

  const pieData = [
    { name: "New", value: overview && overview.totalNew },
    { name: "Returning", value: overview && overview.totalReturning },
  ];

  const COLORS = ["#8884d8", "#82ca9d"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
    index: number;
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const getYAxisTickPercentage = (tick: number) => {
    let dataSum = 0;
    data.forEach((item) => {
      dataSum += item.count ?? 0;
    });
    const percentage = (tick / dataSum) * 100;
    return percentage.toFixed(0);
  };

  return (
    <>
      <Spin
        spinning={loading}
        indicator={
          <LoadingOutlined className="flex items-center justify-center text-5xl h-full" />
        }
      >
        <ChartForm
          setSelectedDate={setSelectedDate}
          setSelectedCountry={setSelectedCountry}
        />
        <div className="flex lg:flex-row flex-col justify-center items-center gap-4 py-8">
          <ResponsiveContainer width="100%" height={400} className="p-4">
            <LineChart
              width={500}
              height={500}
              data={userData}
              // margin={{
              //   top: 20,
              //   right: 30,
              //   left: 20,
              //   bottom: 20,
              // }}
            >
              {/* <XAxis dataKey="week" tick={<CustomizedAxisTick />} /> */}
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
              <Line type="monotone" dataKey="newUsers" stroke="#8884d8" />
              <Line type="monotone" dataKey="returningUsers" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
          <ResponsiveContainer width="100%" height={400} className="w-2/4">
            <PieChart width={200} height={400}>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Spin>
    </>
  );
};

export default ChartOverview;
