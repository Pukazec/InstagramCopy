import { Button, Card, Pagination } from "antd";
import Meta from "antd/es/card/Meta";
import { PaginationConfig } from "antd/es/pagination";
import { useEffect, useState } from "react";
import { BASE64_IMAGE_PREFIX } from "../../config/genericConstants";
import { useHttpContext } from "../../context/HttpContext";
import PictureForm from "./CreatePictureForm";

const PictureScreen: React.FC = () => {
  const { get } = useHttpContext();
  const [open, setOpen] = useState<boolean>(false);
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
          style={{ width: 240 }}
          cover={
            <img
              alt={picture.id}
              src={`${BASE64_IMAGE_PREFIX}${picture.imageData}`}
            />
          }
          onClick={() => {
            setSelectedPicture(picture);
            setOpen(true);
          }}
        >
          <Meta title={picture.tags} description={picture.description} />
        </Card>
      );
    });

    setPicturesToRender(renderedPictures);
  };

  useEffect(() => {
    getPictures();
  }, []);

  useEffect(() => {
    renderPictures();
  }, [pictures, pagination]);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open form</Button>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {picturesToRender}
      </div>
      <Pagination {...pagination} onChange={handlePaginationChange} />
      <PictureForm
        open={open}
        setOpen={setOpen}
        selectedPicture={selectedPicture}
      />
    </>
  );
};

export default PictureScreen;
