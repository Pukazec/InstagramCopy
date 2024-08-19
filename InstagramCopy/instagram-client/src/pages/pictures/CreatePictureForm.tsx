import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, InputNumber, Modal, Select, Slider, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { CSSProperties, useEffect, useState } from "react";
import { BASE64_IMAGE_PREFIX } from "../../config/genericConstants";
import { useHttpContext } from "../../context/HttpContext";

interface Props {
  open: boolean;
  setOpen: (newState: boolean) => void;
  selectedPicture: any | undefined;
}
interface ImageOptions {
  width: number | null;
  height: number | null;
  sepia: number | null;
  blur: number;
}

const CreatePictureFrom: React.FC<Props> = (props: Props) => {
  const { open, setOpen, selectedPicture } = props;
  const [form] = Form.useForm();
  const { post } = useHttpContext();
  const [imageData, setImageData] = useState<any>(undefined);
  const [options, setOptions] = useState<ImageOptions>({
    width: null,
    height: null,
    sepia: null,
    blur: 0,
  });
  const [imagePreview, setImagePreview] = useState<JSX.Element | undefined>();

  const onClose = () => {
    setImagePreview(undefined);
    form.resetFields();
    setOpen(false);
  };

  const onFinish = async (values: any) => {
    let dto = values;
    let image = imageData;
    image = image.replace(BASE64_IMAGE_PREFIX, "");
    dto.imageData = image;

    const result = await post("/picture", dto, true, true);
    if (result) {
      onClose();
    }
  };

  const applyImageFilters = async (image: any, options: any) => {
    const width = `${options.width}px`;
    const height = `${options.height}px`;
    const imageStyles: CSSProperties = {
      width: width,
      height: height,
      filter: `sepia(${options.sepia}%) blur(${options.blur}px)`,
    };

    setImagePreview(<img src={image} alt="Processed" style={imageStyles} />);
  };

  const handleFileChange = async (file: any) => {
    if (
      file &&
      (file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/gif" ||
        file.type === "image/bmp" ||
        file.type === "image/svg+xml" ||
        file.type === "image/vnd.microsoft.icon")
    ) {
      return false;
    }
    return Upload.LIST_IGNORE;
  };

  const getImageDimensions = (
    base64: string
  ): Promise<{ width: number; height: number }> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = base64;
      img.onload = () => {
        resolve({
          width: img.width,
          height: img.height,
        });
      };
      img.onerror = reject;
    });
  };

  const calculateInitialOptionsValues = async () => {
    const dimensions = await getImageDimensions(imageData);
    form.setFieldValue("width", dimensions.width);
    form.setFieldValue("height", dimensions.height);
    setOptions({
      ...options,
      width: dimensions.width,
      height: dimensions.height,
    });
  };

  useEffect(() => {
    if (imageData) {
      calculateInitialOptionsValues();
    }
  }, [imageData]);

  useEffect(() => {
    if (imageData) {
      applyImageFilters(imageData, options);
    } else {
      setImagePreview(undefined);
    }
  }, [options]);

  return (
    <Modal
      key={"picture-upload-drawer"}
      open={open}
      width={800}
      onClose={onClose}
      closable={true}
      destroyOnClose={true}
      footer={
        <div style={{ display: "flex", flexDirection: "row-reverse" }}>
          <Button onClick={onClose}>Close</Button>
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
        onAbort={onClose}
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
            onChange={(value) => {
              if (value.fileList.length === 0) {
                setImageData(undefined);
                form.setFieldValue("width", undefined);
                form.setFieldValue("height", undefined);
                setOptions({
                  width: null,
                  height: null,
                  sepia: null,
                  blur: 0,
                });
              } else {
                new Promise((resolve) => setTimeout(resolve, 500)).then(() => {
                  if (value.fileList[0]) {
                    setImageData(value.fileList[0].thumbUrl);
                  }
                });
              }
            }}
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
        <Form.Item label="Width" name="width">
          <InputNumber
            placeholder="Width in pixels"
            onChange={(value) =>
              setOptions({ ...options, width: value as number })
            }
            disabled={!imageData}
          />
        </Form.Item>
        <Form.Item label="Height" name="height">
          <InputNumber
            placeholder="Height in pixels"
            onChange={(value) =>
              setOptions({ ...options, height: value as number })
            }
            disabled={!imageData}
          />
        </Form.Item>
        <Form.Item label="Sepia" name="sepia" valuePropName="checked">
          <Slider
            min={0}
            max={100}
            onChange={(value) => setOptions({ ...options, sepia: value })}
            disabled={!imageData}
          />
        </Form.Item>
        <Form.Item label="Blur" name="blur">
          <Slider
            min={0}
            max={5}
            step={0.001}
            onChange={(value) =>
              setOptions({ ...options, blur: value as number })
            }
            disabled={!imageData}
          />
        </Form.Item>
        <Form.Item label="Preview">{imagePreview}</Form.Item>
        <Form.Item label="Tags" name="tags">
          <Select mode="tags" />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreatePictureFrom;
