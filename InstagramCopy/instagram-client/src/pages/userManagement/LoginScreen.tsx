import { GithubOutlined } from "@ant-design/icons";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { Button, Form, Input, message } from "antd";
import axios from "axios";
import React from "react";

interface Props {}

const LoginScreen: React.FC<Props> = (props: Props) => {
  const handleGithubLogin = () => {
    window.location.href = "http://localhost:3000/auth/github";
  };

  const handleLoginSuccess = async (credentialResponse: any) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/google", {
        tokenId: credentialResponse.credential,
      });
      message.success("Login successful!");
      console.log(res.data);
    } catch (error) {
      message.error("Login failed!");
      console.error(error);
    }
  };

  const handleLoginFailure = () => {
    message.error("Login failed!");
  };

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>

      <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={handleLoginFailure}
          />
        </div>
      </GoogleOAuthProvider>
      <div
        style={{
          marginTop: "3px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          style={{
            fontSize: "15px",
          }}
        >
          <GithubOutlined onClick={handleGithubLogin} />
          Login with GitHub
        </Button>
      </div>
    </>
  );
};

export default LoginScreen;
