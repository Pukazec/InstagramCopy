import { Button, Card, Pagination } from "antd";
import Meta from "antd/es/card/Meta";
import { PaginationConfig } from "antd/es/pagination";
import moment from "moment";
import { useEffect, useState } from "react";
import { BASE64_IMAGE_PREFIX } from "../../config/genericConstants";
import { useAuthContext } from "../../context/AuthContext";
import { useHttpContext } from "../../context/HttpContext";
import CreatePictureForm from "./CreatePictureForm";
import PictureDetails from "./PictureDetails";
import { PictureDto } from "./PictureDtos";
import PicturesFilter from "./PicturesFilter";

const PictureScreen: React.FC = () => {
  const { get } = useHttpContext();
  const { username } = useAuthContext();
  const [createPictureOpen, setCreatePictureOpen] = useState<boolean>(false);
  const [pictureDetailsOpen, setPictureDetailsOpen] = useState<boolean>(false);
  const [pictures, setPictures] = useState<PictureDto[]>();
  const [picturesToRender, setPicturesToRender] = useState<JSX.Element[]>();
  const [selectedPicture, setSelectedPicture] = useState<PictureDto>();
  const [filter, setFilter] = useState<string>("");

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
    const result = await get<PictureDto[]>(`/picture${filter}`);
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

                  {picture.description && picture.description.length > 20
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
  }, [pictureDetailsOpen, createPictureOpen, filter]);

  useEffect(() => {
    renderPictures();
  }, [pictures, pagination]);

  return (
    <>
      <div style={{ display: "inline-flex" }}>
        <PicturesFilter filter={filter} setFilter={setFilter} />
        <Button
          type="primary"
          disabled={!username}
          onClick={() => setCreatePictureOpen(true)}
        >
          Add new Picture
        </Button>
      </div>
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
