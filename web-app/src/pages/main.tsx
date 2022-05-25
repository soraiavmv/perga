import 'react-loading-skeleton/dist/skeleton.css';
import { BaseSyntheticEvent, useEffect, useRef, useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import BaseLayout from '../layouts/base';
import GalleryPicture from '../components/gallery-picture';
import Image from 'next/image';
import Loader from '../components/loader';
import MainPageTopContent from '../components/main-screen-top-content';
import { NextPage } from 'next';
import axios from 'axios';
import camera from '../../assets/images/camera.svg';
import config from '../config';
import styled from '@emotion/styled';

const Main: NextPage = () => {
  const inputFile = useRef<HTMLInputElement | null>(null);
  const [pics, setPictures] = useState<string[]>();
  const [lastUploaded, setLastUploaded] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `${config.api.API_BASE_URL}/list-pictures`
        );
        const urls: string[] = [];

        if (!pics && response && !response.data) {
          setPictures([]);
        }

        if (response && response.data) {
          response.data.forEach((element: Iterable<number>) => {
            const blob = new Blob([new Uint8Array(element).buffer], {
              type: 'image/png'
            });
            const url = URL.createObjectURL(blob);
            urls.push(url);
          });

          if (urls.length !== pics?.length || !pics) {
            setPictures(urls);
            if (loading) setLoading(false);
          }
        }
      } catch (e) {
        if (!pics) setPictures([]);
      }
    })();
  }, [lastUploaded, loading, pics]);

  const onButtonClick = () => {
    inputFile?.current?.click();
  };

  const onChange = async (e: BaseSyntheticEvent) => {
    e.preventDefault();

    setLoading(true);

    const [file] = e.target.files;
    const body = new FormData();
    body.append('upload', file);

    const result = await axios.post(
      `${config.api.API_BASE_URL}/new-picture`,
      body
    );

    if (result) {
      setLastUploaded(file.name);
    }
  };

  return (
    <BaseLayout
      headTitle="PERGA - Personal Gallery"
      headDescription="Personal Gallery Page"
    >
      {loading && <Loader />}
      <MainPageTopContent />
      <PageContent>
        <TopContent>
          <Image src={camera} alt="camera-image" />
          <input
            type="file"
            id="file"
            ref={inputFile}
            onChange={onChange}
            style={{ display: 'none' }}
          />
          <Button onClick={onButtonClick}>ADD NEW PHOTO</Button>
        </TopContent>
        {pics &&
          pics.map((url, index) => (
            <GalleryPicture key={`picture-${index}`} url={url} index={index} />
          ))}
        {!pics && (
          <SkeletonTheme height="350px" width="350px" inline={true}>
            <div>
              <Skeleton count={6} style={{ margin: '10px 20px' }} />
            </div>
          </SkeletonTheme>
        )}
        {pics && pics.length === 0 && (
          <div>
            <Message>Nothing to show, here.</Message>
            <SubMessage>
              Upload a new picture to start creating your gallery!
            </SubMessage>
          </div>
        )}
      </PageContent>
    </BaseLayout>
  );
};

const PageContent = styled.div`
  margin-top: 100px;
  width: fit-content;
  text-align: center;
`;

const TopContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Button = styled.button`
  font-family: ${({ theme }) => theme.fontFamily.Barlow.bold};
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.orange};
  border-color: ${({ theme }) => theme.colors.white};
  border-radius: 35px;
  height: 35px;
  width: 140px;
  margin: 10px 0px;
`;

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

export default Main;
