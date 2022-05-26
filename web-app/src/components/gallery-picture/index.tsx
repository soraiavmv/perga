import { FC, useState } from 'react';
import GalleryDialog from '../gallery-dialog';
import styled from '@emotion/styled';

interface IGalleryPicturesProps {
  url: string;
  index: number;
  imageUrl: string;
}

const GalleryPicture: FC<IGalleryPicturesProps> = ({
  url,
  index,
  imageUrl
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handleShowDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  return (
    <Container>
      <Picture src={url} alt={`picture-${index}`} onClick={handleShowDialog} />
      {isDialogOpen && (
        <GalleryDialog
          handleShowDialog={handleShowDialog}
          imageUrl={imageUrl}
          index={index}
        />
      )}
    </Container>
  );
};

const Container = styled.div`
  display: inline;
`;

const Picture = styled.img`
  width: 350px;
  height: 350px;
  margin: 10px 30px;
  object-fit: cover;
`;

export default GalleryPicture;
