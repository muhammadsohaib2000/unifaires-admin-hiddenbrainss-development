"use client";
import React, { PureComponent } from "react";
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
} from "recharts";
// app components
import ChartForm from "./ChartForm";

const AgeChart = () => {
  const data = [
    {
      name: "18-24",
      count: 2400,
    },
    {
      name: "25-34",
      count: 1398,
    },
    {
      name: "35-44",
      count: 9800,
    },
    {
      name: "45-54",
      count: 3908,
    },
    {
      name: "55-64",
      count: 4800,
    },
    {
      name: "65+",
      count: 3800,
    },
  ];
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
      <ChartForm />
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 20,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis
            tickFormatter={(tick) => `${getYAxisTickPercentage(Number(tick))}%`}
          />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="count"
            barSize={100}
            fill="#7450F2"
            className="fill-purple-400"
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default AgeChart;
