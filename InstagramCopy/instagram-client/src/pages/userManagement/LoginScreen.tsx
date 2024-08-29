import { GithubOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useHttpContext } from "../../context/HttpContext";
import { localhost } from "../../context/HttpContextModels";

interface Props {}

const LoginScreen: React.FC<Props> = (props: Props) => {
  const [form] = Form.useForm();
  const { post } = useHttpContext();
  const { onLoginSuccess } = useAuthContext();

  const handleGithubLogin = () => {
    window.location.href = `${localhost}/GitHub/login`;
  };

  const onLocalLoginFinish = async (values: any) => {
    const result = await post<string>("/Identity/login", values);
    onLoginSuccess(result);
  };

  return (
    <>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onLocalLoginFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
          initialValue={"mau"}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
          initialValue={"Pa$$w0rd"}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>

      <div
        style={{
          marginTop: "3px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          onClick={handleGithubLogin}
          style={{
            fontSize: "15px",
          }}
        >
          <GithubOutlined />
          Login with GitHub
        </Button>
      </div>
    </>
  );
};

export default LoginScreen;
