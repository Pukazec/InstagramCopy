import { Button, Form, Input, notification } from "antd";
import axios from "axios";
import { useState } from "react";

const UsernameLoginScreen: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = (values: any) => {
    setLoading(true);
    axios
      .post("/api/auth/login", values)
      .then((response) => {
        notification.success({
          message: "Login Successful",
          description: "You have successfully logged in!",
        });
        localStorage.setItem("token", response.data.token);
      })
      .catch((error) => {
        notification.error({
          message: "Login Failed",
          description: "Please check your credentials and try again.",
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <Form name="login" initialValues={{ remember: true }} onFinish={onFinish}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input placeholder="Username" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Login
          </Button>
        </Form.Item>
      </Form>
      <Button type="primary" href="/api/auth/google-login">
        Login with Google
      </Button>
    </>
  );
};

export default UsernameLoginScreen;
