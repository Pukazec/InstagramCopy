import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, InputNumber, Modal, Select, Slider, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { CSSProperties, useEffect, useState } from "react";
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
  format: string;
}

const CreatePictureFrom: React.FC<Props> = (props: Props) => {
  const { open, setOpen, selectedPicture } = props;
  const [form] = Form.useForm();
  const { post } = useHttpContext();
  const [imageData, setImageData] = useState<any>(null);
  const [options, setOptions] = useState<ImageOptions>({
    width: null,
    height: null,
    sepia: null,
    blur: 0,
    format: "image/jpeg",
  });
  const [imagePreview, setImagePreview] = useState<JSX.Element | undefined>();

  const onFinish = async (values: any) => {
    let dto = values;
    if (imageData) {
      // const canvas = canvasRef.current;
      // const processedImage = canvas
      //   ?.toDataURL(options.format)
      //   .replace(BASE64_IMAGE_PREFIX, "");
      // dto.imageData = processedImage;

      await post("/picture", dto, true, true);
      setOpen(false);
    }
  };

  // const onFinish = async (values: any) => {
  //   let dto = values;
  //   let image = values.imageData.fileList[0].thumbUrl;
  //   image = image.replace(BASE64_IMAGE_PREFIX, "");
  //   dto.imageData = image;

  //   await post("/picture", dto, true, true);
  //   setOpen(false);
  // };

  // const onFinish = async (values: any) => {
  //   let dto = values;
  //   if (imageData) {
  //     const img = new Image();
  //     img.src = imageData.thumbUrl;

  //     img.onload = async () => {
  //       let processedImage = await applyImageFilters(img, {
  //         width: values.width,
  //         height: values.height,
  //         sepia: values.sepia,
  //         blur: values.blur,
  //         format: values.format,
  //       });

  //       processedImage = processedImage.replace(BASE64_IMAGE_PREFIX, "");
  //       dto.imageData = processedImage;

  //       await post("/picture", dto, true, true);
  //       setOpen(false);
  //     };
  //   }
  // };

  const applyImageFilters = async (image: any, options: any) => {
    const width = options.width ? `${options.width}px` : undefined;
    const height = options.height ? `${options.height}px` : undefined;
    const imageStyles: CSSProperties = {
      width: width,
      height: height,
      filter: `sepia(${options.sepia}%) blur(${options.blur}px)`,
    };

    setImagePreview(<img src={image} alt="Processed" style={imageStyles} />);
  };

  const handleFileChange = (file: any) => {
    if (
      file &&
      (file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/gif" ||
        file.type === "image/bmp" ||
        file.type === "image/svg+xml" ||
        file.type === "image/vnd.microsoft.icon")
    ) {
      setImageData(file);
      return false;
    }
    return Upload.LIST_IGNORE;
  };

  useEffect(() => {
    var image = form.getFieldValue("imageData");
    if (image && image.fileList[0].thumbUrl) {
      applyImageFilters(image.fileList[0].thumbUrl, options);
    } else {
      setImagePreview(undefined);
    }
  }, [form.getFieldValue("imageData"), options]);

  return (
    <Modal
      key={"picture-upload-drawer"}
      open={open}
      width={800}
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
        <Form.Item label="Width" name="width">
          <InputNumber
            placeholder="Width in pixels"
            onChange={(value) =>
              setOptions({ ...options, width: value as number })
            }
          />
        </Form.Item>
        <Form.Item label="Height" name="height">
          <InputNumber
            placeholder="Height in pixels"
            onChange={(value) =>
              setOptions({ ...options, height: value as number })
            }
          />
        </Form.Item>
        <Form.Item label="Sepia" name="sepia" valuePropName="checked">
          <Slider
            min={0}
            max={100}
            onChange={(value) => setOptions({ ...options, sepia: value })}
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
          />
        </Form.Item>
        <Form.Item label="Format" name="format">
          <Select
            options={[
              { value: "image/jpeg", label: "JPEG" },
              { value: "image/png", label: "PNG" },
              { value: "image/gif", label: "GIF" },
              { value: "image/bmp", label: "BMP" },
              { value: "image/svg+xml", label: "SVG" },
              { value: "image/vnd.microsoft.icon", label: "ICO" },
            ]}
            onChange={(value) => setOptions({ ...options, format: value })}
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
