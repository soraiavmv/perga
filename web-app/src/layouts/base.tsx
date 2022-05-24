import { Global, ThemeProvider } from '@emotion/react';
import { globalStyle, theme } from '../theme';
import { FC } from 'react';
import HeadComponent from '../components/head';

interface IBaseLayoutProps {
  headTitle: string;
  headDescription: string;
  children: any;
}

const BaseLayout: FC<IBaseLayoutProps> = ({
  headTitle,
  headDescription,
  children
}) => {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyle} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <HeadComponent title={headTitle} description={headDescription} />
        {children}
      </div>
    </ThemeProvider>
  );
};

export default BaseLayout;
