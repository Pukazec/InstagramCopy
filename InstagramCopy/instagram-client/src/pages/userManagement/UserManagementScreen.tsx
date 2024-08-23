import { Table } from "antd";
import Modal from "antd/es/modal/Modal";
import { useEffect, useState } from "react";
import { useHttpContext } from "../../context/HttpContext";
import ChangePlanScreen from "./ChangePlanScreen";
import { getSubscriptionDisplay, RequestConsumptionDto } from "./LoginDtos";

const UserManagementScreen: React.FC = () => {
  const { get } = useHttpContext();
  const [users, setUsers] = useState<RequestConsumptionDto[]>();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedUser, setSelectedUser] = useState<RequestConsumptionDto>();

  const getUsers = async () => {
    const result = await get<RequestConsumptionDto[]>(`/UserManagement`);
    if (result) {
      setUsers(result);
    }
  };

  useEffect(() => {
    getUsers();
    if (selectedUser === undefined) {
      setSelectedRowKeys([]);
    }
  }, [selectedUser]);

  return (
    <>
      <Table
        rowKey={"userName"}
        columns={[
          { dataIndex: "userName", title: "User name" },
          {
            dataIndex: "subscriptionPlan",
            title: "Subscription plan",
            render: (data: number | undefined) => {
              return <span>{getSubscriptionDisplay(data)}</span>;
            },
          },
          {
            dataIndex: "desiredSubscriptionPlan",
            title: "Desired subscription plan",
            render: (data: number | undefined) => {
              return <span>{getSubscriptionDisplay(data)}</span>;
            },
          },
          { dataIndex: "todayUploadCount", title: "TodayUploadCount" },
          { dataIndex: "requestsTotal", title: "Requests total" },
        ]}
        dataSource={users}
        rowSelection={{
          selectedRowKeys,
          onChange: (
            newSelectedRowKeys: React.Key[],
            selectedRows: RequestConsumptionDto[]
          ) => {
            const lastSelectedRowKey = newSelectedRowKeys.at(-1);
            if (lastSelectedRowKey) {
              setSelectedRowKeys([lastSelectedRowKey]);
            } else {
              setSelectedRowKeys([]);
            }
            setSelectedUser(selectedRows[0]);
          },
        }}
      />
      <Modal
        open={!!selectedUser}
        onCancel={() => setSelectedUser(undefined)}
        footer={null}
      >
        <ChangePlanScreen
          selectedUser={selectedUser}
          setSelectedUserData={setSelectedUser}
        />
      </Modal>
    </>
  );
};

export default UserManagementScreen;
