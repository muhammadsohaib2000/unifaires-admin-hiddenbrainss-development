"use client";
import React, { useState } from "react";
// ant components
// app components
// utils and int
import { Avatar, Button, List, Modal, message } from "antd";
import { UserDeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useSession } from "next-auth/react";
import AddMember from "./AddMember";
import { ITeamMember, TeamInt } from "./team.interface";
import axios from "axios";
import config from "@/app/utils/config";
interface TeamProp {
  team: TeamInt;
  isMemberModal: boolean;
  setIsMemberModal: Function;
  teamMembers: Array<ITeamMember>;
  fetchTeams: Function;
}
const TeamMembers = ({
  isMemberModal,
  setIsMemberModal,
  team,
  teamMembers,
  fetchTeams,
}: TeamProp) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: session } = useSession();
  const memberDetail = teamMembers.map((teamMember) => {
    return teamMember;
  });
  // const fetchUserDetail = async () => {
  //   await axios
  //     .get(`${config.API.API_URL}/users/${userId}`, {
  //       headers: {
  //         "x-token": session?.user?.token,
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res.data.data);
  //       setMemberDetail(res.data.data);
  //     });
  // };
  // useEffect(() => {
  //   fetchUserDetail();
  // }, []);

  const handleRemoveMember = async (id: number, name: string) => {
    await axios
      .delete(`${config.API.API_URL}/team-member/${id}`, {
        headers: {
          "x-token": session?.user?.token,
        },
      })
      .then((res) => {
        if (res.status) {
          message.success(`User ${name} Removed Successfully`);
          fetchTeams();
        }
      })
      .catch((e) => {
        message.error("Unable to Remove User. Try again");
        console.log(e);
      });
  };

  const closeMememberModal = () => {
    setIsMemberModal(false);
  };

  return (
    <Modal
      open={isMemberModal}
      onOk={closeMememberModal}
      onCancel={closeMememberModal}
      width={800}
      footer={null}
    >
      <Button
        type="primary"
        icon={<PlusOutlined />}
        size="large"
        className="flex mt-4 justify-center items-center"
        onClick={() => setIsModalOpen(true)}
      />
      {isModalOpen && (
        <AddMember
          fetchTeams={fetchTeams}
          teamId={team.id}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
      <div className="mb-8">
        <List
          className="top-4 bottom-4 mx-4 p-4"
          pagination={{
            position: "bottom",
            align: "center",
            pageSize: 5,
          }}
          itemLayout="horizontal"
          dataSource={memberDetail}
          size="large"
          bordered
          // loading={loading}
          renderItem={(member) => (
            <List.Item
              actions={[
                <div
                  key={`add-admin-${member.user.id}`}
                  className="flex items-center justify-between mb-2 pl-6"
                >
                  <Button
                    type="default"
                    size="middle"
                    icon={<UserDeleteOutlined />}
                    onClick={() =>
                      handleRemoveMember(member.id, member.user.fullname)
                    }
                  >
                    Remove
                  </Button>
                </div>,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={member.user.imageUrl} />}
                title={member.user.fullname}
                // description={admin.bio}
              />
            </List.Item>
          )}
        />
      </div>
    </Modal>
  );
};

export default TeamMembers;
