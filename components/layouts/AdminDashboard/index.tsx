/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { Fragment, useState, useEffect, useCallback } from "react";
// next
import { usePathname } from "next/navigation";
// app components
import AppHead from "../AppHead";
import SidebarMenu from "./SidebarMenu";
// props and interface
import { AdminDashboardLayoutProps } from "./interfaceType";
// ant component and icons /* Grid */
import {
  CheckCircleFilled,
  CloseOutlined,
  MenuOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Avatar, Button, Typography, Grid, Drawer } from "antd";
import { signOut } from "next-auth/react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { fetchUserProfile } from "@/redux/features/UserSlice";
// layout
const { Content, Sider } = Layout;
// typography
const { Title, Paragraph } = Typography;
// break point
// const { useBreakpoint } = Grid;

const AdminDashboardLayout = ({
  title,
  image,
  children,
  description,
  showSideMenu = true,
}: AdminDashboardLayoutProps) => {
  const dispatch = useAppDispatch();
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const screens = Grid.useBreakpoint();
  const pathname = usePathname();
  let activeRouteArr = pathname.split("/");
  let activeRoute = `/dashboard${
    activeRouteArr.length > 2 ? `/${activeRouteArr[2]}` : ""
  }`;
  const myProfile: any = useAppSelector(
    (state: RootState) => state.user.myProfile
  );
  /**
   * get my profile details
   */
  const callMyProfile = useCallback(() => {
    dispatch(fetchUserProfile("user"));
  }, [myProfile]);

  const closeDashboardMenu = () => {
    setDashboardOpen(false);
  };

  useEffect(() => {
    if (
      !(
        typeof myProfile?.firstname === "string" &&
        typeof myProfile?.email === "string" &&
        myProfile.firstname.trim() !== "" &&
        myProfile.email.trim() !== ""
      )
    ) {
      callMyProfile();
    }
  }, [myProfile]);

  return (
    <Fragment>
      <AppHead title={title} image={image} description={description} />
      <Layout>
        {(screens.xs || (screens.sm && !screens.lg)) && (
          <Button
            type="text"
            className="flex items-end mt-4 ml-auto "
            onClick={() => setDashboardOpen(true)}
          >
            {dashboardOpen ? (
              <CloseOutlined className="text-2xl mt-4 text-black" />
            ) : (
              <MenuOutlined className="text-2xl mt-4 text-black" />
            )}
            <span className="text-lg font-bold">Dashboard</span>
          </Button>
        )}
        <Drawer
          // closable={false}
          placement="right"
          open={dashboardOpen}
          onClose={closeDashboardMenu}
        >
          <Layout>
            <div>
              <div className="px-5 py-2 bg-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center justify-start gap-2">
                    <Avatar size={40} className="bg-purple-400">
                      <UserOutlined />
                    </Avatar>
                    <Paragraph className="mb-0 font-bold text-base">
                      {myProfile.firstname} {myProfile.lastname}
                    </Paragraph>
                  </div>
                  <CheckCircleFilled className="text-purple-500" />
                </div>
                <Paragraph className="text-center">{myProfile.email}</Paragraph>
                <div className="flex justify-center">
                  <Paragraph className="w-4/6 px-4 py-1 text-center text-purple-500 rounded-full bg-purple-60">
                    Admin Console
                  </Paragraph>
                </div>
              </div>
              <SidebarMenu selectedKeys={activeRoute} />
              <div className="px-5 py-2 pb-4 bg-white">
                <Button
                  danger
                  block
                  className="rounded-lg"
                  onClick={(event) => {
                    event.preventDefault();
                    signOut({ callbackUrl: "/login" });
                  }}
                >
                  Sign out
                </Button>
              </div>
            </div>
          </Layout>
        </Drawer>
        <Layout hasSider>
          {showSideMenu && (
            <Sider
              style={{
                overflow: "auto",
                height: "110vh",
                position: "fixed",
                left: 0,
                top: "auto",
                bottom: 0,
              }}
              width={280}
              breakpoint="lg"
              collapsedWidth="0"
              // collapsed={!showSideMenu}
              className="sticky top-0 py-5 overflow-x-hidden overflow-y-auto bg-white"
            >
              <div className="px-5 mb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center justify-start gap-2">
                    <Avatar size={40} className="bg-purple-400">
                      <UserOutlined />
                    </Avatar>
                    <Paragraph className="mb-0 font-bold text-base">
                      {myProfile.firstname} {myProfile.lastname}
                    </Paragraph>
                  </div>
                  <CheckCircleFilled className="text-purple-500" />
                </div>
                <Paragraph className="text-center">{myProfile.email}</Paragraph>
                <div className="flex justify-center">
                  <Paragraph className="w-4/6 px-4 py-1 text-center text-purple-500 rounded-full bg-purple-60">
                    Admin Console
                  </Paragraph>
                </div>
              </div>
              <SidebarMenu selectedKeys={activeRoute} />
              <div className="px-5 mt-2">
                <Button
                  danger
                  block
                  className="rounded-lg"
                  onClick={(event) => {
                    event.preventDefault();
                    signOut({ callbackUrl: "/login" });
                  }}
                >
                  Sign out
                </Button>
              </div>
            </Sider>
          )}
          <Layout>
            <Content
              className="bg-grey-50"
              style={{
                margin: 0,
                minHeight: 320,
              }}
            >
              {children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </Fragment>
  );
};

export default AdminDashboardLayout;
