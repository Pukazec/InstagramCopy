import { Button, Col, Form, Row, Select } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { USER_ID_LOCAL_STORAGE_KEY } from "../../config/cacheConstants";
import { useHttpContext } from "../../context/HttpContext";
import { routes } from "../../routes/paths";

const ChangePlanScreen: React.FC = () => {
  const [form] = Form.useForm();
  const { get, put } = useHttpContext();
  const navigate = useNavigate();
  const [userData, setUserData] = useState<any>();
  const subscriptionOptions = [
    { value: 1, label: "FREE" },
    { value: 20, label: "PRO" },
    { value: 1000, label: "GOLD" },
  ];

  const getUserData = async () => {
    const result = await get<any>(
      `/UserManagement/${window.localStorage.getItem(
        USER_ID_LOCAL_STORAGE_KEY
      )}`
    );
    if (result) {
      setUserData(result);
    }
  };

  const updatePlan = async (values: any) => {
    const result = await put("/UserManagement/updatePlan", values);
    if (result) {
      navigate(routes.ROUTE_PICTURES, { replace: true });
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <Row style={{ width: "90vw" }}>
        <Col span={8}>
          <span>Current plan: </span>
          <span>
            {
              subscriptionOptions.find(
                (x) => x.value === userData?.subscriptionPlan
              )?.label
            }
          </span>
        </Col>
        <Col span={8}>
          <span>Used uploads: </span>
          <span>{userData?.todayUploadCount}</span>
        </Col>
        <Col span={8}>
          <span>Total available uploads: </span>
          <span>{userData?.requestsTotal}</span>
        </Col>
      </Row>
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
