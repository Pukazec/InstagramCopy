import { Button, Col, Form, Row, Select } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { USER_ID_LOCAL_STORAGE_KEY } from "../../config/cacheConstants";
import { useHttpContext } from "../../context/HttpContext";
import { routes } from "../../routes/paths";
import { getSubscriptionDisplay } from "./LoginDtos";

interface Props {
  selectedUser?: any;
  setSelectedUserData?: (newState: any) => void;
}

const ChangePlanScreen: React.FC<Props> = (props: Props) => {
  const { selectedUser, setSelectedUserData } = props;
  const [form] = Form.useForm();
  const { get, put } = useHttpContext();
  const navigate = useNavigate();
  const [userData, setUserData] = useState<any>();

  const getUserData = async (id: any) => {
    const result = await get<any>(`/UserManagement/${id}`);
    if (result) {
      setUserData(result);
    }
  };

  const updatePlan = async (values: any) => {
    if (selectedUser) {
      const dto = {
        ...values,
        userName: selectedUser.userName,
      };
      const result = await put("/UserManagement/changePlan", dto);
      if (result) {
        form.resetFields();
        setSelectedUserData?.(undefined);
      }
    } else {
      const result = await put("/UserManagement/updatePlan", values);
      if (result) {
        navigate(routes.ROUTE_PICTURES, { replace: true });
      }
    }
  };

  useEffect(() => {
    if (selectedUser !== undefined) {
      getUserData(selectedUser.id);
    } else {
      getUserData(window.localStorage.getItem(USER_ID_LOCAL_STORAGE_KEY));
    }
  }, [selectedUser]);

  return (
    <>
      <Row
        style={{
          width: "90vw",
          flexDirection: selectedUser ? "column" : "row",
        }}
      >
        <Col span={6} style={{ marginBottom: selectedUser ? "10px" : "0" }}>
          <span>Current plan: </span>
          <span>{getSubscriptionDisplay(userData?.subscriptionPlan)}</span>
        </Col>
        <Col span={6} style={{ marginBottom: selectedUser ? "10px" : "0" }}>
          <span>Desired plan: </span>
          <span>
            {getSubscriptionDisplay(userData?.desiredSubscriptionPlan)}
          </span>
        </Col>
        <Col span={6} style={{ marginBottom: selectedUser ? "10px" : "0" }}>
          <span>Used uploads: </span>
          <span>{userData?.todayUploadCount}</span>
        </Col>
        <Col span={6} style={{ marginBottom: selectedUser ? "10px" : "0" }}>
          <span>Total available uploads: </span>
          <span>{userData?.requestsTotal}</span>
        </Col>
      </Row>
      {/* <Row style={{ width: "90vw" }}>
        <Col span={8}>
          <span>Current plan: </span>
          <span>{getSubscriptionDisplay(userData?.subscriptionPlan)}</span>
        </Col>
        <Col span={8}>
          <span>Used uploads: </span>
          <span>{userData?.todayUploadCount}</span>
        </Col>
        <Col span={8}>
          <span>Total available uploads: </span>
          <span>{userData?.requestsTotal}</span>
        </Col>
      </Row> */}
      <Row style={{ marginTop: "50px" }}>
        <Col>
          <Form
            form={form}
            name="dependencies"
            autoComplete="off"
            onFinish={updatePlan}
            layout="horizontal"
            style={{ width: "250px" }}
          >
            <Form.Item
              label="Plan"
              name="subscriptionPlan"
              rules={[{ required: true }]}
            >
              <Select
                options={[
                  { value: 1, label: "FREE" },
                  { value: 20, label: "PRO" },
                  { value: 1000, label: "GOLD" },
                ]}
              />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Change plan
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default ChangePlanScreen;
