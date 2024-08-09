import { PlusOutlined } from "@ant-design/icons";
import { Button, Drawer, Form, Select, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";
import { useHttpContext } from "../../context/HttpContext";

interface Props {
  open: boolean;
  setOpen: (newState: boolean) => void;
}

const PictureFrom: React.FC<Props> = (props: Props) => {
  const { open, setOpen } = props;
  const [form] = Form.useForm();
  const { post } = useHttpContext();

  const onFinish = async (values: any) => {
    console.log("values", values);
    console.log("form.getFieldsValue()", form.getFieldsValue());

    const result = await post("/picture", values, true, true);

    console.log("result", result);

    setOpen(false);
  };

  const handleFileChange = (uploadedFile: File | null) => {
    if (
      uploadedFile &&
      (uploadedFile.type === "image/jpeg" ||
        uploadedFile.type === "image/png" ||
        uploadedFile.type === "image/gif" ||
        uploadedFile.type === "image/bmp" ||
        uploadedFile.type === "image/svg+xml" ||
        uploadedFile.type === "image/vnd.microsoft.icon")
    ) {
      return false;
    }
  };

  return (
    <Drawer
      key={"picture-upload-drawer"}
      open={open}
      width={690}
      onClose={() => setOpen(false)}
      footer={
        <div style={{ display: "flex", flexDirection: "row-reverse" }}>
          <Button onClick={() => setOpen(false)}>Close</Button>
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
        name="picture-upload-form"
        layout="horizontal"
        onFinish={onFinish}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        style={{ width: 600 }}
      >
        <Form.Item label="Picture" name="picture" extra="Select a picture">
          <Upload
            maxCount={1}
            accept=".jpeg,.png,.gif,.bmp,.svg,.ico"
            beforeUpload={handleFileChange}
            listType="picture-card"
          >
            <Button
              icon={
                <>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </>
              }
              style={{ border: 0, background: "none" }}
            />
          </Upload>
        </Form.Item>
        {/* <Form.Item label="Radio">
          <Radio.Group>
            <Radio value="png"> PNG </Radio>
            <Radio value="jpg"> JPG </Radio>
            <Radio value="bpm"> BPM </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Height">
          <InputNumber />
        </Form.Item>
        <Form.Item label="Width">
          <InputNumber />
        </Form.Item> */}
        <Form.Item label="Tags" name="tags">
          <Select mode="tags" />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <TextArea rows={4} />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default PictureFrom;
