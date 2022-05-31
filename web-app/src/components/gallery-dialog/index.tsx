import { FC, useEffect, useState } from 'react';
import Loader from '../loader';
import axios from 'axios';
import config from '../../config';
import styled from '@emotion/styled';

interface IGalleryDialogProps {
  handleShowDialog: () => void;
  index: number;
  imageUrl: string;
}

const GalleryDialog: FC<IGalleryDialogProps> = ({
  handleShowDialog,
  index,
  imageUrl
}) => {
  const [src, setSrc] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      try {
        const splitUrl = imageUrl.split('-thumbnail');
        const response = await axios.get(
          `${config.api.API_BASE_URL}/files/${splitUrl[0]}${splitUrl[1]}`,
          { responseType: 'blob' }
        );

        if (response && response.data) {
          const url = URL.createObjectURL(response.data);
          setSrc(url);
        }
        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    })();
  }, [imageUrl]);

  return (
    <DialogContainer onClick={handleShowDialog}>
      <Dialog open>
        {loading && <Loader />}
        {src && (
          <DialogPicture
            src={src}
            onClick={handleShowDialog}
            alt={`original-picture-${index}`}
          />
        )}
      </Dialog>
    </DialogContainer>
  );
};

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

export default GalleryDialog;
