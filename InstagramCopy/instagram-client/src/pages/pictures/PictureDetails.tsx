import { DownloadOutlined } from "@ant-design/icons";
import { Button, Image, Modal, Popconfirm } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { BASE64_IMAGE_PREFIX } from "../../config/genericConstants";
import { useHttpContext } from "../../context/HttpContext";
import EditPictureForm from "./EditPictureForm";
import PictureDownload from "./PictureDownload";
import { PictureDetailDto, PictureDto } from "./PictureDtos";

interface Props {
  open: boolean;
  setOpen: (newState: boolean) => void;
  selectedPicture: PictureDto | undefined;
}

const CreatePictureFrom: React.FC<Props> = (props: Props) => {
  const { open, setOpen, selectedPicture } = props;
  const { get, deleteEntity } = useHttpContext();
  const [pictureDetails, setPictureDetails] = useState<PictureDetailDto>();
  const [renderedPicture, setRenderedPicture] = useState<JSX.Element>();
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [downloadModalOpen, setDownloadModalOpen] = useState<boolean>(false);

  const onCancel = () => {
    setOpen(false);
  };

  const fetchPicture = async () => {
    if (!selectedPicture) return;
    const result = await get<PictureDetailDto | undefined>(
      `/picture/${selectedPicture.id}`
    );
    setPictureDetails(result);
  };

  const deletePicture = async () => {
    if (!selectedPicture) return;
    const result = await deleteEntity(`/picture/${selectedPicture.id}`);
    if (result) {
      setOpen(false);
    }
  };

  const renderPicture = () => {
    setRenderedPicture(
      <div style={{ display: "flex", alignItems: "flex-start" }}>
        <Image
          id={pictureDetails?.id}
          style={{
            filter: `sepia(${pictureDetails?.sepia}%) blur(${pictureDetails?.blur}px)`,
          }}
          width={pictureDetails?.width}
          height={pictureDetails?.height}
          src={`${BASE64_IMAGE_PREFIX}${pictureDetails?.imageData}`}
        />
        <div style={{ marginLeft: "20px" }}>
          <div>
            <span>Tags: </span> {pictureDetails?.hashTags.join(", ")}
          </div>
          <div>
            <span>Author: </span> {pictureDetails?.authorName}
          </div>
          <div>
            <span>Uploaded at: </span>

            {moment(pictureDetails?.uploadedAt).format("HH:mm DD.MM.YY.")}
          </div>
          <div>
            <span>Description: </span>

            {pictureDetails?.description}
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (open) {
      fetchPicture();
    }
  }, [open, selectedPicture, editModalOpen]);

  useEffect(() => {
    if (pictureDetails) {
      renderPicture();
    }
  }, [pictureDetails]);

  return (
    <Modal
      key={"picture-detail-modal"}
      open={open}
      onCancel={onCancel}
      closable={true}
      width={800}
      destroyOnClose={true}
      footer={
        <div style={{ display: "flex", flexDirection: "row-reverse" }}>
          <Button style={{ marginRight: "10px" }} onClick={onCancel}>
            Close
          </Button>
          <DownloadOutlined
            style={{ marginRight: "10px", fontSize: "32px" }}
            onClick={() => setDownloadModalOpen(true)}
          />
          <Button
            style={{ marginRight: "10px" }}
            onClick={() => setEditModalOpen(true)}
            type="primary"
            ghost
          >
            Edit
          </Button>
          <Popconfirm
            style={{ marginRight: "10px" }}
            title="Delete the image"
            description="Are you sure to delete this picture?"
            onConfirm={deletePicture}
            okText="Yes"
            cancelText="No"
          >
            <Button style={{ marginRight: "10px" }} danger>
              Delete
            </Button>
          </Popconfirm>
        </div>
      }
    >
      {renderedPicture}
      <EditPictureForm
        open={editModalOpen}
        setOpen={setEditModalOpen}
        selectedPicture={selectedPicture}
      />
      <PictureDownload
        open={downloadModalOpen}
        setOpen={setDownloadModalOpen}
        pictureDetails={pictureDetails}
      />
    </Modal>
  );
};

export default CreatePictureFrom;
