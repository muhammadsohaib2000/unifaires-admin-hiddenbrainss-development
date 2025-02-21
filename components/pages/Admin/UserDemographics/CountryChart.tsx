"use client";
import React from "react";
import {
  Radar,
  Legend,
  Tooltip,
  PolarGrid,
  RadarChart,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
// app components
import ChartForm from "./ChartForm";

const CountryChart = () => {
  const data = [
    {
      country: "Nigeria",
      A: 120,
      B: 110,
      fullMark: 200,
    },
    {
      country: "UK",
      A: 98,
      B: 130,
      fullMark: 200,
    },
    {
      country: "Holland",
      A: 150,
      B: 180,
      fullMark: 200,
    },
    {
      country: "South Africa",
      A: 98,
      B: 130,
      fullMark: 200,
    },
    {
      country: "Paraguay",
      A: 58,
      B: 100,
      fullMark: 200,
    },
    {
      country: "France",
      A: 98,
      B: 130,
      fullMark: 200,
    },
    {
      country: "Congo",
      A: 18,
      B: 120,
      fullMark: 200,
    },
    {
      country: "Russia",
      A: 98,
      B: 130,
      fullMark: 200,
    },
    {
      country: "Brazil",
      A: 98,
      B: 130,
      fullMark: 200,
    },
    {
      country: "US",
      A: 86,
      B: 110,
      fullMark: 200,
    },
    {
      country: "Germany",
      A: 99,
      B: 100,
      fullMark: 200,
    },
    {
      country: "Spain",
      A: 85,
      B: 150,
      fullMark: 200,
    },
    {
      country: "Ghana",
      A: 65,
      B: 85,
      fullMark: 200,
    },
  ];

  return (
    <>
      <ChartForm />
      <ResponsiveContainer width="100%" height={400}>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="country" />
          <PolarRadiusAxis angle={30} domain={[0, 150]} />
          <Radar
            name="Inactive"
            dataKey="A"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
          <Radar
            name="Active"
            dataKey="B"
            stroke="#82ca9d"
            fill="#82ca9d"
            fillOpacity={0.6}
          />
          <Tooltip />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </>
  );
};

export default CountryChart;
