"use client";
import config from "@/app/utils/config";
import { Button, Input, Radio, RadioChangeEvent, Tag, Typography, message } from "antd";
import axios from "axios";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { useEffect, useState, useContext } from "react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { JobContext } from "../JobContext";
import axiosInstance from "@/app/utils/axios-config";
import { handleAxiosError } from "@/app/utils/axiosError";
import { useAppDispatch } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { fetchAllJobCategories } from "@/redux/features/JobCategorySlice";
// images and icons
import logo from "@/public/images/logo.png";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
let selectedCategories: Array<number> = [];

const TreeNode = ({ category, categoryPicked, onChange }: any) => {

  const [showCheckbox, setShowCheckbox] = useState(true);
  const [showChild, setShowChild] = useState(false);

  const handleToggle = () => {
    setShowCheckbox(!showCheckbox);
    setShowChild(!showChild);
  };

  if (category?.children && category.next_child_count > 0) {
    return (
      <div className="p-2">
        {showCheckbox ? (
          <div className="flex flex-row">
            <Typography.Paragraph>
              {category.name} ({category.next_child_count})
              <PlusOutlined
                onClick={handleToggle}
                className="ml-4 text-blue-800"
              />
            </Typography.Paragraph>
          </div>
        ) : (
          <div className="flex flex-row">
            <Typography.Paragraph>
              {category.name} ({category.next_child_count})
              <MinusOutlined
                onClick={handleToggle}
                className="pb-2 pl-4 text-blue-800"
              />
            </Typography.Paragraph>
          </div>
        )}
        {showChild && category.children.map((child: any) => (
          <div className="ml-4" key={child.id}>
            <TreeNode
              category={child}
              categoryPicked={categoryPicked}
              onChange={onChange}
            />
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div className="p-2">
        <Radio value={category.id}>{category.name}</Radio>
      </div>
    );
  }
};


interface CategoryStateInt {
  id: number;
  name: string;
}






const JobCategories = ({ prev, requestBody, next }: any) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { fetchJobData, jobData } = useContext(JobContext);
  const [Categories, setCategories] = useState<Array<CategoryStateInt>>();
  const [categoryPicked, setCategoryPicked] = useState(jobData?.jobcategory?.id);
  const [loading, setLoading] = useState(false);
  const [categoryId, setCategoryId] = useState();
  const categoryName = jobData && jobData.data.jobcategory?.name;
  const params = useParams();
  const JobId = params.JobId;
  const [searchTerms, setSearchTerms] = useState<string>("");
  const dispatch: any = useAppDispatch();
  const { jobCategories } = useSelector((state: RootState) => state.jobCategory);
  const userProfile = useTypedSelector((state) => state.user.myProfile);
  const myAddress = useTypedSelector((state) => state.address.defaultAddress);
  

  const onChange = (e: RadioChangeEvent) => {
    setCategoryPicked(e.target.value);
    setCategoryId(e.target.value);
  };

  const handleUpdate = async () => {
    const categoryUpdate = {
      jobcategoryId: categoryPicked,
    };
    setLoading(true);
    try {
      const res = await axiosInstance.put(`/jobs/user/${JobId}`, categoryUpdate);
      if (res.status) {
        fetchJobData();
        message.success("Category Updated Successfully");
      } else {
        console.log(res);
      }
    } catch (error) {
      handleAxiosError(error);
    }
    setLoading(false);
  };
  const getFullUrl = (relativePath: any) => {
    const host = 
      (typeof window !== "undefined" && window.location.origin) || 
      "http://localhost:3000"; // Fallback to localhost
    return `${host}${relativePath.startsWith("/") ? relativePath : `/${relativePath}`}`;
  };


  const handleFinish = async () => {

    requestBody["jobcategoryId"] = categoryId;

    const data = { ...requestBody,contact: [
      {
        firstname: userProfile.firstname,
        lastname: userProfile.lastname,
        email: userProfile.email,
        profileMediaUrl:
          userProfile.imageUrl && userProfile.imageUrl.trim() !== ''
            ? userProfile.imageUrl
            : getFullUrl(logo.src),
        address1: myAddress.address,
        city: myAddress.city,
        state: myAddress.state,
        zipcode: myAddress.zipcode,
        country: myAddress.country,
      },
    ],  };

    console.log(data);

    setLoading(true);
    try {
      const res = await axiosInstance.post("/jobs", data);
      if (res.status) {
        message.success("Job Saved Successfully");
        router.push("/dashboard/jobs/create/" + res.data.data.id);
      } else {
        message.error("Validation Error. Select a Category");
      }
      setLoading(false);
    } catch (error) {
      handleAxiosError(error);
      setLoading(false);
    }
  };

  const filteredCategories =
    jobCategories &&
    jobCategories.filter((cat: any) =>
      cat.name.toLowerCase().includes(searchTerms.toLowerCase())
    );

  return (
    <div>
      {JobId && (
        <div className="mb-8">
          <Typography.Paragraph className="text-base font-semibold">
            Category Picked -{" "}
          </Typography.Paragraph>
          {categoryName && (
            <Tag className="text-[#5832DA] ml-6 bg-[#D2C5FD] rounded-full border-none px-4 py-1">
              {categoryName}
            </Tag>
          )}
        </div>
      )}
      <div className="max-h-[500px] overflow-y-scroll custom-scrollbar">
        <Typography.Paragraph className="font-bold text-lg">
          Select Category
        </Typography.Paragraph>
        <div className="p-2">
          <Input.Search
            size="large"
            placeholder="Search..."
            enterButton
            allowClear
            onChange={(e) => setSearchTerms(e.target.value)}
            onSearch={(value) => setSearchTerms(value)}
          />
        </div>

        <div className="mt-2">
          <Radio.Group value={categoryPicked} onChange={onChange}>
            {filteredCategories?.map((category) => (
              <TreeNode
                key={category.id}
                category={category}
                categoryPicked={categoryPicked}
                onChange={onChange}
              />
            ))}
          </Radio.Group>
        </div>
      </div>
      <div>
        {JobId && (
          <div className="steps-action mt-4 flex justify-between items-center">
            <Button
              size="large"
              type="primary"
              icon={<PlusOutlined />}
              className="rounded-md ml-auto flex justify-end items-center"
              onClick={handleUpdate}
              loading={loading}
            >
              Update
            </Button>
          </div>
        )}
        {JobId && (
          <div className="steps-action mt-4 flex justify-between items-center">
            <Button
              size="large"
              type="primary"
              icon={<PlusOutlined />}
              className="rounded-md ml-auto flex justify-end items-center"
              onClick={() => next()}
            >
              Next
            </Button>
          </div>
        )}
        {!JobId && (
          <div className="steps-action mt-4 flex justify-between items-center">
            <Button size="large" onClick={() => prev()}>
              Previous
            </Button>
            <Button
              size="large"
              type="primary"
              icon={<PlusOutlined />}
              className="rounded-md ml-auto flex justify-end items-center"
              onClick={handleFinish}
              loading={loading}
            >
              Save
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobCategories;
