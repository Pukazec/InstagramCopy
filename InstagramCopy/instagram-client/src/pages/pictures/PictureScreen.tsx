import { Button, Card, Pagination } from "antd";
import Meta from "antd/es/card/Meta";
import { PaginationConfig } from "antd/es/pagination";
import { useEffect, useState } from "react";
import { BASE64_IMAGE_PREFIX } from "../../config/genericConstants";
import { useHttpContext } from "../../context/HttpContext";
import PictureForm from "./PictureForm";

const PictureScreen: React.FC = () => {
  const { get } = useHttpContext();
  const [open, setOpen] = useState<boolean>(false);
  const [pictures, setPictures] = useState<any[]>();
  const [picturesToRender, setPicturesToRender] = useState<JSX.Element[]>();

  const [pagination, setPagination] = useState<PaginationConfig>({
    defaultPageSize: 40,
    pageSizeOptions: [10, 20, 40, 80],
    showSizeChanger: true,
    size: "small",
    current: 1,
  });

  const handlePaginationChange = (page: number, pageSize: number) => {
    setPagination((currentPagination) => ({
      ...currentPagination,
      pageSize: pageSize,
      current: page,
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

    const renderedPictures: JSX.Element[] = pictures.map((picture) => {
      return (
        <Card
          hoverable
          style={{ width: 240 }}
          cover={
            <img
              alt={picture.id}
              src={`${BASE64_IMAGE_PREFIX}${picture.imageData}`}
            />
          }
          onClick={() => console.log("open popup")}
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
  }, [pictures]);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open form</Button>

      {picturesToRender}
      <Pagination {...pagination} onChange={handlePaginationChange} />
      <PictureForm open={open} setOpen={setOpen} />
    </>
  );
};

export default PictureScreen;
