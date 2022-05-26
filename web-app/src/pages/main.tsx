import 'react-loading-skeleton/dist/skeleton.css';
import { BaseSyntheticEvent, useRef, useState } from 'react';
import BaseLayout from '../layouts/base';
import Gallery from '../components/gallery';
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
  const [loading, setLoading] = useState<boolean>(false);

  const onButtonClick = () => {
    inputFile?.current?.click();
  };

  const onChange = async (e: BaseSyntheticEvent) => {
    e.preventDefault();

    setLoading(true);

    const [file] = e.target.files;
    const body = new FormData();
    body.append('upload', file);

    await axios.post(`${config.api.API_BASE_URL}/new-picture`, body);
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
        <Gallery loading={loading} setLoading={setLoading} />
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

export default Main;
