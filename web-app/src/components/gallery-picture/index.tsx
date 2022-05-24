import { FC, useState } from 'react';
import styled from '@emotion/styled';

interface IGalleryPicturesProps {
  url: string;
  index: number;
}

const GalleryPicture: FC<IGalleryPicturesProps> = ({ url, index }) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handleShowDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  return (
    <Container>
      <Picture src={url} alt={`picture-${index}`} onClick={handleShowDialog} />
      {isDialogOpen && (
        <DialogContainer onClick={handleShowDialog}>
          <Dialog open>
            <DialogPicture
              src={url}
              onClick={handleShowDialog}
              alt={`original-picture-${index}`}
            />
          </Dialog>
        </DialogContainer>
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

const DialogContainer = styled.div`
  position: fixed;
  padding: 0;
  margin: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Dialog = styled.dialog`
  max-width: 50%;
  max-height: 700px;
  border: solid 2px;
  border-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.9);
`;

const DialogPicture = styled.img`
  max-width: 90%;
  max-height: 700px;
  margin: 10px;
`;

export default GalleryPicture;
