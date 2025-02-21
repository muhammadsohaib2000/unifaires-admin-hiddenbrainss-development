import dynamic from "next/dynamic";
// app components
import Container from "@/components/shared/container";
import DashboardHeader from "@/components/shared/dashboardHeader";
import { Tabs } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
// import Applications from "../components/Applications";
const ApplicationsPage = dynamic(() => import("../Application"));

const Applications = () => {
  const items = [
    {
      label: <Link href="/dashboard/settings/account">Account</Link>,
      key: "Account",
    },
    {
      label: <Link href="/dashboard/settings/applications">Applications</Link>,
      key: "Applications",
    },
  ];

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768); // Adjust the breakpoint as needed
    };

    // Add an event listener for window resize
    window.addEventListener("resize", handleResize);

    // Initial check
    handleResize();

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const onChange = (key: string) => {
    console.log(key);
  };
  return (
    <Container>
      <DashboardHeader
        title="Settings"
        para="Find, edit and delete jobs you have posted for quaalified"
        para2="candidates"
      />
      {isSmallScreen ? null : (
        <Tabs
          defaultActiveKey="2"
          onChange={onChange}
          items={items}
          className="lg:flex"
        />
      )}
      <ApplicationsPage />
    </Container>
  );
};

export default Applications;
