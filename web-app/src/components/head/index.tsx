import { FC } from 'react';
import Head from 'next/head';

interface IHeadProps {
  title: string;
  description: string;
}

const HeadComponent: FC<IHeadProps> = ({ title, description }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default HeadComponent;
