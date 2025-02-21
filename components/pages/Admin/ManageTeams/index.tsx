"use client";
import React, { Fragment, useEffect, useState } from "react";
// next components
import NextLink from "next/link";
// antd components
import { Button, Typography, Breadcrumb } from "antd";

// app components
import TeamList from "./TeamList";
import Container from "@/components/shared/container";
import ManageAccountsMenu from "@/components/pages/Admin/ManageAccounts/ManageAccountsMenu";
import CreateTeam from "./CreateTeam";
import axios from "axios";
import config from "@/app/utils/config";
import { useSession } from "next-auth/react";
import { TeamInt } from "./team.interface";

const ManageTeams = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: session } = useSession();
  const [teamList, setTeamList] = useState<Array<TeamInt>>([]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const fetchTeams = async () => {
    await axios
      .get(`${config.API.API_URL}/team`, {
        headers: {
          "x-token": session?.user?.token,
        },
      })
      .then((res) => {
        setTeamList(res.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  return (
    <Fragment>
      <section className="content-header">
        <Container className="p-6 container-fluid">
          <Breadcrumb>
            <Breadcrumb.Item>
              <NextLink href="/dashboard/manage-accounts">
                In House Unifaires
              </NextLink>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Teams</Breadcrumb.Item>
          </Breadcrumb>
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div className="flex-grow">
              <Typography.Title level={2} className="mb-0">
                Teams
              </Typography.Title>
              <Typography.Paragraph className="mb-0">
                Manage teams
              </Typography.Paragraph>
            </div>
            <div className="shrink-0 flex gap-2">
              <Button
                type="primary"
                size="large"
                className="rounded-md"
                onClick={() => setIsModalOpen(true)}
              >
                Create Team
              </Button>
              <CreateTeam
                fetchTeams={fetchTeams}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
              />
            </div>
          </div>
        </Container>
      </section>
      <nav>
        <Container className="px-6 container-fluid">
          <ManageAccountsMenu activeKey="teams" />
        </Container>
      </nav>
      <section className="content-body">
        <Container className="px-6 pb-6 container-fluid">
          <TeamList fetchTeams={fetchTeams} teamList={teamList} />
        </Container>
      </section>
    </Fragment>
  );
};

export default ManageTeams;
