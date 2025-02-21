"use client";
import { Typography, Skeleton } from "antd";
import { useState, useEffect } from "react";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { useRouter, useSearchParams } from "next/navigation";

interface CategoryStateInt {
  id: string;
  name: string;
  totalJobCount: number;
  jobCount: number;
  parentId: string | null;
  children?: CategoryStateInt[];
  hierarchyLevel?: number;
}

const JobCategories = ({
  jobCategories,
  closeAllDrawer,
}: {
  jobCategories: CategoryStateInt[];
  closeAllDrawer: () => void;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [displayedCategories, setDisplayedCategories] = useState<CategoryStateInt[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const [initialLoading, setInitialLoading] = useState(true);

  const activeCategoryId = searchParams.get("categoryId");

  useEffect(() => {
    const initialCategories = jobCategories && jobCategories.filter(
      (category) => category.hierarchyLevel === 1 && category.totalJobCount > 0
    );
    setDisplayedCategories(initialCategories);
    setInitialLoading(false);

    if (activeCategoryId) {
      const expandedMap: Record<string, boolean> = {};
      const found = expandPathToCategory(jobCategories, activeCategoryId, expandedMap);
      if (found) setExpandedCategories(expandedMap);
    }
  }, [jobCategories, activeCategoryId]);

  const getFilteredChildren = (category: CategoryStateInt): CategoryStateInt[] => {
    return category.children ? category.children.filter((child) => child.totalJobCount > 0) : [];
  };

  const expandPathToCategory = (
    categories: CategoryStateInt[],
    targetId: string,
    expandedMap: Record<string, boolean>
  ): boolean => {
    for (const category of categories) {
      if (category.id === targetId) {
        if (category.parentId) expandedMap[category.parentId] = true;
        return true;
      }
      if (category.children && expandPathToCategory(category.children, targetId, expandedMap)) {
        expandedMap[category.id] = true;
        return true;
      }
    }
    return false;
  };

  const toggleExpand = (id: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));

    if (!expandedCategories[id]) {
      const parentCategory = displayedCategories.find((category) => category.id === id);
      if (parentCategory) {
        const childCategories = getFilteredChildren(parentCategory);
        setDisplayedCategories((prevCategories) => {
          const index = prevCategories.findIndex((category) => category.id === id);
          return [
            ...prevCategories.slice(0, index + 1),
            ...childCategories,
            ...prevCategories.slice(index + 1),
          ];
        });
      }
    } else {
      setDisplayedCategories((prevCategories) =>
        prevCategories.filter((category) => category.parentId !== id)
      );
    }
  };

  const handleRedirect = (id: string, name: string) => {
    // router.push(`/career?categoryId=${id}&title=${name}`);
    router.push(`/career?categoryId=${id}`);
    closeAllDrawer();
  };

  const renderCategory = (category: CategoryStateInt, level = 0) => {
    const isExpanded = expandedCategories[category.id];
    const hasChildren = category.children && category.children.some((child) => child.totalJobCount > 0);
    const isActive = category.id === activeCategoryId;

    return (
      <div
        key={category.id}
        className="category-item"
        style={{
          paddingLeft: level * 16,
          paddingRight: "10px",
          margin: "8px 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: "5px",
          transition: "background-color 0.3s",
          overflow: "hidden",
        }}
      >
        <Typography.Paragraph
          className="font-semibold m-1 pl-2 cursor-pointer hover:bg-gray-200"
          onClick={() => handleRedirect(category.id, category.name)}
          style={{
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            flexGrow: 1,
            color: isActive ? "#2A225F" : "inherit",
          }}
        >
          {category.name}
          <span style={{ color: "#6b7280", fontSize: "0.9em" }}> ({category.totalJobCount})</span>
        </Typography.Paragraph>

        {hasChildren && (
          <span
            onClick={(e) => {
              e.stopPropagation();
              toggleExpand(category.id);
            }}
            style={{ cursor: "pointer", marginLeft: "10px" }}
          >
            {isExpanded ? <MinusOutlined /> : <PlusOutlined />}
          </span>
        )}
      </div>
    );
  };

  return (
    <div
      style={{
        height: "80vh",
        overflowY: "auto",
        padding: "12px",
        backgroundColor: "#f8f9fa",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
      }}
    >
      {initialLoading ? (
        Array.from({ length: 10 }).map((_, index) => (
          <Skeleton
            key={index}
            active
            title={false}
            paragraph={{ rows: 1, width: "100%" }}
            style={{ marginBottom: 8, borderRadius: "5px" }}
          />
        ))
      ) : (
        <>
          {displayedCategories && displayedCategories.map((category) =>
            renderCategory(category, category.hierarchyLevel || 0)
          )}
        </>
      )}
    </div>
  );
};

export default JobCategories;
