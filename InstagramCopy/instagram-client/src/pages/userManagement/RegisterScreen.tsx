import { Button, Form, Input, Select } from "antd";
import { useNavigate } from "react-router-dom";
import { useHttpContext } from "../../context/HttpContext";
import { routes } from "../../routes/paths";

const RegisterScreen: React.FC = () => {
  const [form] = Form.useForm();
  const { post } = useHttpContext();
  const navigate = useNavigate();

  const createUser = async (values: any) => {
    const result = await post("/Identity/register", values);
    if (result) {
      navigate(routes.ROUTE_LOGIN, { replace: true });
    }
  };

  return (
    <Form
      form={form}
      name="dependencies"
      autoComplete="off"
      style={{ maxWidth: 600 }}
      onFinish={createUser}
      layout="vertical"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Password" name="password" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item
        label="Confirm Password"
        name="password2"
        dependencies={["password"]}
        rules={[
          {
            required: true,
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The new password that you entered do not match!")
              );
            },
          }),
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Plan"
        name="subscriptionPlan"
        rules={[{ required: true }]}
      >
        <Select
          options={[
            { value: 0, label: "FREE" },
            { value: 1, label: "PRO" },
            { value: 2, label: "GOLD" },
          ]}
        />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterScreen;
