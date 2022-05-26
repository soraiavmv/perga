import { FC, useEffect, useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import GalleryPicture from '../gallery-picture';
import axios from 'axios';
import config from '../../config';
import styled from '@emotion/styled';

interface IGalleryProps {
  loading: boolean;
  setLoading(value: boolean): void;
}

const Gallery: FC<IGalleryProps> = ({ loading, setLoading }) => {
  const [pics, setPictures] = useState<string[]>([]);
  const [filenames, setFileNames] = useState<string[]>();
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `${config.api.API_BASE_URL}/file-names`
        );

        if (response) {
          if (response.status !== 200) setError(true);
          else setFileNames(response.data);
        }
      } catch (error) {
        setError(true);
      }
    })();
  }, [loading]);

  useEffect(() => {
    if (filenames?.length !== pics.length || loading) {
      (async () => {
        try {
          const urls: string[] = [];
          for (const filename of filenames || []) {
            const response = await axios.get(
              `${config.api.API_BASE_URL}/pictures/${filename}`,
              { responseType: 'blob' }
            );

            if (response && response.data) {
              const url = URL.createObjectURL(response.data);
              urls.push(url);
            }
          }

          setPictures(urls);
          setLoading(false);
        } catch (e) {
          setLoading(false);
          setError(true);
        }
      })();
    }
  }, [filenames, loading, pics.length, setLoading]);

  return (
    <>
      {error ? (
        <div>
          <Message>Something went wrong...</Message>
          <SubMessage>Please try again, later.</SubMessage>
        </div>
      ) : (
        <>
          {filenames &&
            pics.length > 0 &&
            pics.map((url, index) => (
              <GalleryPicture
                key={`picture-${index}`}
                url={url}
                imageUrl={filenames[index]}
                index={index}
              />
            ))}
          {(!filenames ||
            (filenames && filenames.length > 0 && pics.length === 0)) && (
            <SkeletonTheme height="350px" width="350px" inline={true}>
              <div>
                <Skeleton count={6} style={{ margin: '10px 20px' }} />
              </div>
            </SkeletonTheme>
          )}
          {filenames && filenames.length === 0 && pics.length === 0 && (
            <div>
              <Message>Nothing to show, here.</Message>
              <SubMessage>
                Upload a new picture to start creating your gallery!
              </SubMessage>
            </div>
          )}
        </>
      )}
    </>
  );
};

const Message = styled.p`
  font-size: ${({ theme }) => theme.fontSize.subtitle};
  color: ${({ theme }) => theme.colors.brown};
  font-family: ${({ theme }) => theme.fontFamily.Barlow.regular};
  padding-top: 10px;
`;

const SubMessage = styled.p`
  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.colors.brown};
  margin-top: -30px;
  font-family: ${({ theme }) => theme.fontFamily.Barlow.regular};
`;

export default Gallery;
