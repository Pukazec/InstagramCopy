import { Button, Form, Modal, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";
import { useHttpContext } from "../../context/HttpContext";

interface Props {
  open: boolean;
  setOpen: (newState: boolean) => void;
  selectedPicture: any | undefined;
}

const EditPictureFrom: React.FC<Props> = (props: Props) => {
  const { open, setOpen, selectedPicture } = props;
  const [form] = Form.useForm();
  const { put } = useHttpContext();

  const onCancel = () => {
    form.resetFields();
    setOpen(false);
  };

  const onFinish = async (values: any) => {
    let dto = values;

    const result = await put(`/picture/${selectedPicture.id}`, dto, true, true);
    if (result) {
      onCancel();
    }
  };

  return (
    <Modal
      key={"picture-update-drawer"}
      open={open}
      width={800}
      onCancel={onCancel}
      closable={true}
      destroyOnClose={true}
      footer={
        <div style={{ display: "flex", flexDirection: "row-reverse" }}>
          <Button onClick={onCancel}>Close</Button>
          <Button
            onClick={() => form.submit()}
            type="primary"
            style={{ marginRight: "10px" }}
          >
            Save
          </Button>
        </div>
      }
    >
      <Form
        form={form}
        name="picture-update-form"
        layout="horizontal"
        onFinish={onFinish}
        onAbort={onCancel}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        style={{ width: 600 }}
        initialValues={selectedPicture}
      >
        <Form.Item label="Tags" name="hashTags">
          <Select mode="tags" />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditPictureFrom;
