"use client";
import React, { Fragment, useState } from "react";
// ant components
import { DeleteOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import { Button, List, Typography, message } from "antd";
// utils and int
import TeamMembers from "./TeamMembers";
import { TeamInt } from "./team.interface";
import axios from "axios";
import config from "@/app/utils/config";
import { useSession } from "next-auth/react";

interface Iteam {
  teamList: Array<TeamInt>;
  fetchTeams: Function;
}
const TeamList = ({ teamList, fetchTeams }: Iteam) => {
  const { data: session } = useSession();
  const [isMemberModal, setIsMemberModal] = useState(false);
  const [selectedTeamId, setSelectedTeamId] = useState<number>();

  const handleTeamClick = (teamId: number) => {
    setSelectedTeamId(teamId);
    setIsMemberModal(true);
  };

  const DeleteTeam = async (id: number) => {
    await axios
      .delete(`${config.API.API_URL}/team/${id}`, {
        headers: {
          "x-token": session?.user?.token,
        },
      })
      .then((res) => {
        fetchTeams();
        message.success("Team Deleted Successfully");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Fragment>
      <List
        className="pb-6 bg-white rounded-lg mt-6"
        itemLayout="vertical"
        pagination={{
          position: "bottom",
          align: "center",
          pageSize: 5,
        }}
        dataSource={teamList}
        renderItem={(team) => (
          <div>
            <List.Item className="p-4 hover:bg-gray-200 cursor-pointer flex flex-row justify-between">
              <div onClick={() => handleTeamClick(team.id)}>
                <div>
                  <Typography.Paragraph className="text-lg font-bold mb-0">
                    {team?.title}
                  </Typography.Paragraph>
                  <Typography.Paragraph className="text-sm">
                    {team?.description}
                  </Typography.Paragraph>
                </div>
                <div className="flex flex-row text-purple-600">
                  <UsergroupAddOutlined className="text-lg text-purple-600" />
                  {team?.teammembers?.length} Members
                </div>
              </div>
              <Button
                className="text-red-600"
                type="text"
                size="large"
                icon={<DeleteOutlined />}
                onClick={() => DeleteTeam(team.id)}
              />
            </List.Item>
            {selectedTeamId === team.id && (
              <TeamMembers
                teamMembers={team.teammembers}
                fetchTeams={fetchTeams}
                team={team}
                isMemberModal={isMemberModal}
                setIsMemberModal={setIsMemberModal}
              />
            )}
          </div>
        )}
      />
    </Fragment>
  );
};

export default TeamList;
