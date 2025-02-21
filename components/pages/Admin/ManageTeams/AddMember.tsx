"use client";
import config from "@/app/utils/config";
import { Avatar, Button, List, Modal, Typography, message } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { AssignAdminInt } from "../Help/help.interface";

interface teamListProp {
  isModalOpen: boolean;
  setIsModalOpen: Function;
  teamId: number;
  fetchTeams: Function;
}

const AddMember = ({
  teamId,
  isModalOpen,
  setIsModalOpen,
  fetchTeams,
}: teamListProp) => {
  const { data: session } = useSession();
  const [admins, setAdmins] = useState<Array<AssignAdminInt>>();

  const fetchAdmin = async () => {
    await axios
      .get(`${config.API.API_URL}/users/users_by_role?role=admin`, {
        headers: {
          "x-token": session?.user?.token,
        },
      })
      .then((res) => {
        setAdmins(res.data.data[0].users);
      });
  };

  useEffect(() => {
    fetchAdmin();
  }, []);

  const closeModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleAddMember = async (id: number, name: string) => {
    await axios
      .post(
        `${config.API.API_URL}/team-member`,
        {
          teamId: teamId,
          userId: id,
          role: "In a team",
        },
        {
          headers: {
            "x-token": session?.user?.token,
          },
        }
      )
      .then((res) => {
        if (res.status) {
          message.success(`User ${name} Added Successfully`);
          closeModal();
          fetchTeams();
          // console.log("Successful");
        }
      })
      .catch((e) => {
        message.error("Unable to Add User. Try again");
        console.log(e);
      });
  };

  return (
    <Modal
      open={isModalOpen}
      onOk={closeModal}
      onCancel={closeModal}
      width={800}
      footer={null}
    >
      <Typography.Paragraph className="font-bold text-[1.5em] pl-6 m-0">
        List of Admin
      </Typography.Paragraph>
      <div className="mb-8">
        <List
          className="top-4 bottom-4 mx-4 p-4"
          pagination={{
            position: "bottom",
            align: "center",
            pageSize: 5,
          }}
          itemLayout="horizontal"
          dataSource={admins}
          size="large"
          bordered
          // loading={loading}
          renderItem={(admin) => (
            <List.Item
              key={admin.id}
              actions={[
                <div
                  key={`add-admin-${admin.id}`}
                  className="flex items-center justify-between mb-2 pl-6"
                >
                  <Button
                    type="default"
                    size="middle"
                    icon={<UserAddOutlined />}
                    onClick={() => handleAddMember(admin.id, admin.fullname)}
                  >
                    Add
                  </Button>
                  {/* <Button
                    danger
                    type="text"
                    size="small"
                    shape="circle"
                    icon={<DeleteOutlined />}
                    className="grid place-items-center"
                    //   onClick={() => handleDeleteInstructor(admin.id)}
                  /> */}
                </div>,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={admin.imageUrl} />}
                title={admin.fullname}
                // description={admin.bio}
              />
            </List.Item>
          )}
        />
      </div>
    </Modal>
  );
};

export default AddMember;
