import { Card } from 'antd';
import Meta from 'antd/es/card/Meta';
import moment from 'moment';
import { BASE64_IMAGE_PREFIX } from '../config/genericConstants';
import { PictureDto } from '../pages/pictures/PictureDtos';

interface Props {
  picture: PictureDto;
  setSelectedPicture: (newState: PictureDto) => void;
  setPictureDetailsOpen: (newState: boolean) => void;
}

const ImageCard: React.FC<Props> = (props: Props) => {
  const { picture, setSelectedPicture, setPictureDetailsOpen } = props;

  return (
    <Card
      key={picture.id}
      hoverable
      style={{ width: 245, margin: '10px' }}
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
              <span>Tags: </span> {picture.hashTags.join(', ')}
            </div>
            <div>
              <span>Author: </span> {picture.authorName}
            </div>
            <div>
              <span>Uploaded at: </span>

              {moment(picture.uploadedAt).format('HH:mm DD.MM.YY.')}
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
};

export default ImageCard;
