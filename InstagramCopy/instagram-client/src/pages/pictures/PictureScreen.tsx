import { Button, Card, Pagination } from "antd";
import Meta from "antd/es/card/Meta";
import { PaginationConfig } from "antd/es/pagination";
import moment from "moment";
import { useEffect, useState } from "react";
import { BASE64_IMAGE_PREFIX } from "../../config/genericConstants";
import { useHttpContext } from "../../context/HttpContext";
import CreatePictureForm from "./CreatePictureForm";
import PictureDetails from "./PictureDetails";

const PictureScreen: React.FC = () => {
  const { get } = useHttpContext();
  const [createPictureOpen, setCreatePictureOpen] = useState<boolean>(false);
  const [pictureDetailsOpen, setPictureDetailsOpen] = useState<boolean>(false);
  const [pictures, setPictures] = useState<any[]>();
  const [picturesToRender, setPicturesToRender] = useState<JSX.Element[]>();
  const [selectedPicture, setSelectedPicture] = useState<any>();

  const [pagination, setPagination] = useState<PaginationConfig>({
    pageSize: 10,
    pageSizeOptions: [4, 10, 20, 40, 80],
    showSizeChanger: true,
    size: "small",
    current: 1,
  });

  const handlePaginationChange = (page: number, pageSize: number) => {
    setPagination((currentPagination) => ({
      ...currentPagination,
      pageSize: pageSize,
      current: page,
      total: pictures?.length,
    }));
  };

  const getPictures = async () => {
    const result = await get<any[]>("/picture");
    if (result) {
      setPictures(result);
    }
  };

  const renderPictures = () => {
    if (!pictures) {
      setPicturesToRender(undefined);
      return;
    }

    const startIndex = (pagination.current! - 1) * pagination.pageSize!;
    const endIndex = startIndex + pagination.pageSize!;
    const currentPictures = pictures.slice(startIndex, endIndex);

    const renderedPictures: JSX.Element[] = currentPictures.map((picture) => {
      return (
        <Card
          key={picture.id}
          hoverable
          style={{ width: 245, margin: "10px" }}
          cover={
            <img
              style={{
                filter: `sepia(${picture.sepia}%) blur(${picture.blur}px)`,
              }}
              alt={picture.id}
              src={`${BASE64_IMAGE_PREFIX}${picture.imageData}`}
            />
          }
          onClick={() => {
            setSelectedPicture(picture);
            setPictureDetailsOpen(true);
          }}
        >
          <Meta
            title={picture.tags}
            description={
              <div>
                <div>
                  <span>Tags: </span> {picture.hashTags.join(", ")}
                </div>
                <div>
                  <span>Author: </span> {picture.authorName}
                </div>
                <div>
                  <span>Uploaded at: </span>

                  {moment(picture.uploadedAt).format("HH:mm DD.MM.YY.")}
                </div>
                <div>
                  <span>Description: </span>

                  {picture.description.length > 20
                    ? `${picture.description.substring(0, 20)}...`
                    : picture.description}
                </div>
              </div>
            }
          />
        </Card>
      );
    });

    setPicturesToRender(renderedPictures);
  };

  useEffect(() => {
    getPictures();
  }, [pictureDetailsOpen, createPictureOpen]);

  useEffect(() => {
    renderPictures();
  }, [pictures, pagination]);

  return (
    <>
      <Button onClick={() => setCreatePictureOpen(true)}>Open form</Button>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {picturesToRender}
      </div>
      <Pagination {...pagination} onChange={handlePaginationChange} />
      <CreatePictureForm
        open={createPictureOpen}
        setOpen={setCreatePictureOpen}
      />
      <PictureDetails
        open={pictureDetailsOpen}
        setOpen={setPictureDetailsOpen}
        selectedPicture={selectedPicture}
      />
    </>
  );
};

export default PictureScreen;
