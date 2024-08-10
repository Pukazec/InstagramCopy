import { PlusOutlined } from "@ant-design/icons";
import { Button, Drawer, Form, Select, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";
import { BASE64_IMAGE_PREFIX } from "../../config/genericConstants";
import { useHttpContext } from "../../context/HttpContext";

interface Props {
  open: boolean;
  setOpen: (newState: boolean) => void;
  selectedPicture: any | undefined;
}

const PictureFrom: React.FC<Props> = (props: Props) => {
  const { open, setOpen, selectedPicture } = props;
  const [form] = Form.useForm();
  const { post } = useHttpContext();

  const onFinish = async (values: any) => {
    let dto = values;
    let image = values.imageData.fileList[0].thumbUrl;
    image = image.replace(BASE64_IMAGE_PREFIX, "");
    dto.imageData = image;

    await post("/picture", dto, true, true);
    setOpen(false);
  };

  const handleFileChange = (uploadedFile: any) => {
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
        initialValues={selectedPicture}
      >
        <Form.Item label="Picture" name="imageData" extra="Select a picture">
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
