"use client";
import React from "react";
// ant components
import { DatePicker, Form, Select } from "antd";
import { CountryListOption } from "@/components/shared/CountryList/countryList";

const ChartForm = ({ setSelectedCountry, setSelectedDate }: any) => {
  const [form] = Form.useForm();

  return (
    <Form form={form} className="pb-6 px-6 text-end">
      <div className=" flex w-full gap-2 ">
        <Form.Item name="country" className="flex ml-auto">
          <Select
            showSearch
            size="large"
            allowClear
            placeholder="Select Country"
            optionFilterProp="children"
            onChange={(value) => setSelectedCountry(value)}
            filterOption={(
              input: string,
              option?: { label: string; value: string }
            ) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={CountryListOption}
          />
        </Form.Item>
        <Form.Item name="date" className="mb-0 inline-block">
          <DatePicker.RangePicker
            className="w-full"
            size="large"
            onChange={(value) => setSelectedDate(value)}
          />
        </Form.Item>
      </div>
    </Form>
  );
};

export default ChartForm;
