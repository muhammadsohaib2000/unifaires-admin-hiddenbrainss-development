/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";
import NextLink from "next/link";
import { Divider, Breadcrumb, Typography } from "antd";
import PermissionsList from "./IndividualPermissionsList";
import Container from "@/components/shared/container";
import { useParams } from "next/navigation";
import { handleAxiosError } from "@/app/utils/axiosError";
import axiosInstance from "@/app/utils/axios-config";
import Config from "@/app/utils/config";

const ManageIndividualPermissions = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inviteDetails, setInviteDetails] = useState<any>();
  const params = useParams();
  const inviteId = params?.inviteId;
  const [allRoles, setAllRoles] = useState<any>();
  const [allPermissions, setAllPermissions] = useState<any>();
  const [userPermissions, setUserPermissions] = useState<any>();
  const [userRoles, setUserRoles] = useState<any>();

  const fetchAllRoles = async () => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.get("/access-roles-permissions");
      if (Array.isArray(res?.data?.data)) {
        setAllRoles(res.data.data);
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchAllPermissions = async () => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.get(
        "/access-permissions/user-permissions"
      );
      if (res?.data?.data) {
        let permissionArr = Array.isArray(res.data.data) ? res.data.data : [];
        setAllPermissions(permissionArr);
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserInviteDetail = async () => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.get(`/invite/${inviteId}`);
      if (res?.data?.data) {
        const details = res.data.data;
        const businessPermssions = details?.permissions;
        const combinedPermissions = [...businessPermssions];
        setInviteDetails(details);
        setUserPermissions(combinedPermissions);
        setUserRoles(details?.roles);
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (inviteId) {
      fetchUserInviteDetail();
    }
    fetchAllPermissions();
    fetchAllRoles();
  }, [inviteId]);
  return (
    <>
      <section className="content-header">
        <Container fluid className="px-6 pt-6">
          <Breadcrumb>
            <Breadcrumb.Item>
              <NextLink href="/dashboard/manage-accounts/invitations">
                Business Invites
              </NextLink>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Permissions details</Breadcrumb.Item>
          </Breadcrumb>
          <div className="mt-6">
            <Typography.Title level={2} className="mb-0">
              Manage Permissions
            </Typography.Title>
            <Typography.Paragraph className="mb-0">
              Add to edit permissions for (
              <span className="text-blue-700 font-semibold">
                {inviteDetails?.user?.lastname} {inviteDetails?.user?.firstname}{" "}
                {inviteDetails?.user?.email}
              </span>
              )
            </Typography.Paragraph>
          </div>
        </Container>
      </section>
      <Divider />
      <section className="content-header">
        <Container fluid className="px-6">
          <PermissionsList
            allRoles={allRoles}
            allPermissions={allPermissions}
            fetchAllRoles={fetchAllRoles}
            userPermissions={userPermissions}
            userRoles={userRoles}
            fetchUserInviteDetail={fetchUserInviteDetail}
            // rolesAccessPermissions={rolesAccessPermissions}
            // fetchAccessPermissionRoles={fetchAccessPermissionRoles}
            fetchAllPermissions={fetchAllPermissions}
            loading={isLoading}
            setLoading={setIsLoading}
          />
          {/* <PermissionsList /> */}
        </Container>
      </section>
    </>
  );
};

export default ManageIndividualPermissions;
