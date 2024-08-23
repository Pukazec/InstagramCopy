import { Button, Modal } from "antd";
import React from "react";
import { PictureDetailDto } from "./PictureDtos";

interface Props {
  open: boolean;
  setOpen: (newState: boolean) => void;
  pictureDetails: PictureDetailDto | undefined;
}

const PictureDownload: React.FC<Props> = (props: Props) => {
  const { open, setOpen, pictureDetails } = props;

  const onCancel = () => {
    setOpen(false);
  };

  const downloadImage = async (downloadModified: boolean) => {
    const fileName = `${pictureDetails?.id}.png`;
    if (!pictureDetails) {
      return;
    }
    const containerElement = document.getElementById(pictureDetails.id);

    if (!containerElement) {
      console.error("Container element not found.");
      return;
    }

    const imgElement = containerElement.querySelector(
      "img"
    ) as HTMLImageElement | null;

    if (!imgElement || !imgElement.src) {
      console.error("Image element not found or src attribute is missing.");
      return;
    }

    if (downloadModified) {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        console.error("Canvas context could not be obtained.");
        return;
      }

      canvas.width = pictureDetails.width;
      canvas.height = pictureDetails.height;

      ctx.filter = `sepia(${pictureDetails.sepia}%) blur(${pictureDetails.blur}px)`;

      const img = new Image();
      img.src = imgElement.src;
      img.onload = () => {
        ctx.drawImage(img, 0, 0, pictureDetails.width, pictureDetails.height);

        const dataURL = canvas.toDataURL("image/png");

        const link = document.createElement("a");
        link.href = dataURL;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
      };
    } else {
      const link = document.createElement("a");
      link.href = imgElement.src;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
    }
  };

  return (
    <Modal
      key={"picture-download-modal"}
      open={open}
      onCancel={onCancel}
      closable={true}
      destroyOnClose={true}
      footer={<></>}
    >
      <div style={{ display: "flex", flexDirection: "row", marginTop: "30px" }}>
        <Button
          type="primary"
          style={{ marginRight: "10px" }}
          onClick={() => downloadImage(false)}
        >
          Download original image
        </Button>
        <Button
          type="primary"
          style={{ marginRight: "10px" }}
          onClick={() => downloadImage(true)}
        >
          Download modified image
        </Button>
      </div>
      <Button style={{ marginTop: "10px" }} onClick={onCancel}>
        Cancel
      </Button>
    </Modal>
  );
};

export default PictureDownload;
