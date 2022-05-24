import DotLoader from 'react-spinners/DotLoader';
import { FC } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { theme } from '../../theme';

const Loader: FC = () => {
  return (
    <Container>
      <DotLoader
        color={theme.colors.orange}
        loading={true}
        css={overrideCss}
        size={100}
      />
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  padding: 0;
  margin: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const overrideCss = css`
  display: block;
  z-index: 110;
`;

export default Loader;
