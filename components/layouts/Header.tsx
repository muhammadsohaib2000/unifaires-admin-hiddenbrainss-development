/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "@/public/images/logo.png";
import Container from "@/components/shared/container";
import TopNav from "./TopNav";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchAllJobCategories } from "@/redux/features/JobCategorySlice";
import { fetchCountries } from "@/redux/features/CountrySlice";
import { useEffect } from "react";
import { Space, Popover, Badge, Button, Avatar, Typography } from "antd";
import { useSession } from "next-auth/react";
import { UserOutlined, BellOutlined } from "@ant-design/icons";
import caret from "@/public/images/caret.svg";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const { Paragraph } = Typography;

const Header = () => {
  const { status } = useSession();
  const router = useRouter();
  const myProfile = useAppSelector((state: any) => state.user.myProfile);
  const imageUrl = myProfile && myProfile.imageUrl;
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(fetchAllJobCategories());
    dispatch(fetchCountries());
  }, []);

  const GuestMenu = (
    <div className="py-8 px-10 max-w-max w-full">
      {status === "authenticated" ? (
        <div className="flex flex-col justify-center items-center text-center mb-[2em]">
          {imageUrl ? (
            <div className="">
              <Avatar
                size={{ xs: 80, sm: 80, md: 80, lg: 80, xl: 100, xxl: 100 }}
                icon={
                  <Image
                    src={imageUrl}
                    alt="profile picture"
                    className="rounded-full justify-self-start"
                    width={60}
                    height={60}
                  />
                }
              />
            </div>
          ) : (
            <Avatar
              size={{ xs: 80, sm: 80, md: 80, lg: 80, xl: 100, xxl: 100 }}
              icon={<UserOutlined />}
            />
          )}
          <Typography.Paragraph className="mt-0 text-sm font-semibold italic">
            Administrator Account
          </Typography.Paragraph>
          <Button
            type="default"
            className="border-gray-400 rounded-2xl text-[13px]"
          >
            <Link href="/dashboard" className="pl-2 text-purple-50">
              Manage your Unifaires Account
            </Link>
          </Button>
        </div>
      ) : (
        <Typography.Title level={3} className="mb-[3em]">
          Sign in to get limitless <br /> information at your <br />
          fingertips!
        </Typography.Title>
      )}
      <div className="flex flex-col justify-center items-center gap-3">
        {status == "authenticated" ? (
          <Button
            type="primary"
            size="large"
            className="w-full rounded-none"
            onClick={() => signOut({ callbackUrl: "/login" })}
          >
            Sign Out
          </Button>
        ) : (
          <Button
            type="default"
            size="large"
            className="w-full rounded-none"
            onClick={() => router.push("/login")}
          >
            Sign In
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <header className="app-header sticky min-h-[5vh] top-[-20%] z-10">
      <TopNav />
      <nav className="  bg-purple-50">
        <Container className="px-6 container-fluid">
          <div className="flex flex-wrap items-center w-full py-2 lg:flex-nowrap">
            <Link
              href={"/"}
              passHref
              className="relative order-first block aspect-[28/5]"
            >
              <Image
                src={logo}
                alt="icon"
                width={174}
                height={48}
                objectFit="contain"
                priority
              />
            </Link>
            {status === "authenticated" && (
              <Space
                direction="horizontal"
                className="items-center order-2 gap-4 ml-auto lg:order-last"
              >
                <Popover placement="bottom" content={GuestMenu}>
                  <Link
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="flex items-center gap-2"
                  >
                    <UserOutlined className="text-2xl leading-none text-white" />
                    <Paragraph className="capitalize hidden mb-0 text-base text-white sm:block">
                      {myProfile?.firstname}
                    </Paragraph>
                    <div className="hidden sm:block">
                      <Image src={caret} alt="country" />
                    </div>
                  </Link>
                </Popover>

                <Link href="#" passHref className="px-2">
                  <Badge
                    count={0}
                    status="warning"
                    className="flex items-center gap-2 border-none"
                  >
                    <BellOutlined className="text-2xl leading-none text-white" />
                  </Badge>
                </Link>
              </Space>
            )}
          </div>
        </Container>
      </nav>
    </header>
  );
};

export default Header;
