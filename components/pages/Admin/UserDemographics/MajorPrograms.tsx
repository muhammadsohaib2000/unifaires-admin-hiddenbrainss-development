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

const MajorPrograms = () => {
  const data = [
    {
      name: "Diploma Program",
      count: 2400,
    },
    {
      name: "Diploma Program",
      count: 1398,
    },
    {
      name: "Diploma Program",
      count: 9800,
    },
    {
      name: "Diploma Program",
      count: 3908,
    },
    {
      name: "Diploma Program",
      count: 4800,
    },
    {
      name: "Diploma Program",
      count: 3800,
    },
  ];

  return (
    <>
      <ChartForm />
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          width={500}
          height={300}
          data={data}
          layout="vertical"
          margin={{
            top: 5,
            right: 20,
            left: 10,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" width={150} />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="count"
            barSize={40}
            fill="#7450F2"
            className="fill-purple-400"
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default MajorPrograms;
