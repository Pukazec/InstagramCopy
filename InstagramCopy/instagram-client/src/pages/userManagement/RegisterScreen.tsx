import { Button, Form, Input, Select } from "antd";

const RegisterScreen: React.FC = () => {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      name="dependencies"
      autoComplete="off"
      style={{ maxWidth: 600 }}
      layout="vertical"
    >
      <Form.Item
        label="Username"
        name="username"
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

      <Form.Item label="Plan" name="plan" rules={[{ required: true }]}>
        <Select
          options={[
            { value: "free", label: "FREE" },
            { value: "pro", label: "PRO" },
            { value: "gold", label: "GOLD" },
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
