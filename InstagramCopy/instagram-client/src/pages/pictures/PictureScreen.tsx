import { Button, Pagination } from 'antd';
import { PaginationConfig } from 'antd/es/pagination';
import { useEffect, useState } from 'react';
import ImageCard from '../../components/ImageCard';
import { useAuthContext } from '../../context/AuthContext';
import { useHttpContext } from '../../context/HttpContext';
import CreatePictureForm from './CreatePictureForm';
import PictureDetails from './PictureDetails';
import { PictureDto } from './PictureDtos';
import PicturesFilter from './PicturesFilter';

const PictureScreen: React.FC = () => {
  const { get } = useHttpContext();
  const { username } = useAuthContext();
  const [createPictureOpen, setCreatePictureOpen] = useState<boolean>(false);
  const [pictureDetailsOpen, setPictureDetailsOpen] = useState<boolean>(false);
  const [pictures, setPictures] = useState<PictureDto[]>();
  const [picturesToRender, setPicturesToRender] = useState<JSX.Element[]>();
  const [selectedPicture, setSelectedPicture] = useState<PictureDto>();
  const [filter, setFilter] = useState<string>('');

  const [pagination, setPagination] = useState<PaginationConfig>({
    pageSize: 10,
    pageSizeOptions: [4, 10, 20, 40, 80],
    showSizeChanger: true,
    size: 'small',
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
        <ImageCard
          picture={picture}
          setSelectedPicture={setSelectedPicture}
          setPictureDetailsOpen={setPictureDetailsOpen}
        />
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
      <div style={{ display: 'inline-flex' }}>
        <PicturesFilter filter={filter} setFilter={setFilter} />
        <Button
          type="primary"
          disabled={!username}
          onClick={() => setCreatePictureOpen(true)}
        >
          Add new Picture
        </Button>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
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
