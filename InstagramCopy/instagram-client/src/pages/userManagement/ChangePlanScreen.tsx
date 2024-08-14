import { Button, Form, Select } from "antd";
import { useNavigate } from "react-router-dom";
import { useHttpContext } from "../../context/HttpContext";
import { routes } from "../../routes/paths";

const ChangePlanScreen: React.FC = () => {
  const [form] = Form.useForm();
  const { post } = useHttpContext();
  const navigate = useNavigate();

  const updatePlan = async (values: any) => {
    const result = await post("/Identity/updatePlan", values);
    if (result) {
      navigate(routes.ROUTE_PICTURES, { replace: true });
    }
  };

  return (
    <Form
      form={form}
      name="dependencies"
      autoComplete="off"
      style={{ maxWidth: 600 }}
      onFinish={updatePlan}
      layout="vertical"
    >
      <Form.Item label="Plan" name="plan" rules={[{ required: true }]}>
        <Select
          options={[
            { value: "0", label: "FREE" },
            { value: "1", label: "PRO" },
            { value: "2", label: "GOLD" },
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

export default ChangePlanScreen;
