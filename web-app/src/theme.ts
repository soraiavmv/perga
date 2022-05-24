import { ITheme } from './types/emotion';
import { css } from '@emotion/react';

export const globalStyle = css`
  @font-face {
    font-family: 'Barlow-Regular';
    src: url('../assets/fonts/Barlow-Regular.ttf');
  }

  @font-face {
    font-family: 'Barlow-Bold';
    src: url('../assets/fonts/Barlow-Bold.ttf');
  }

  @font-face {
    font-family: 'Barlow-ExtraBold';
    src: url('../assets/fonts/Barlow-ExtraBold.ttf');
  }
`;

export const theme: ITheme = {
  colors: {
    brown: '#7c6969',
    white: '#FFFFFF',
    green: '#5DDD90',
    orange: '#FCE0A2',
    grey: '	#808080'
  },
  fontFamily: {
    Barlow: {
      regular: 'Barlow-Regular',
      bold: 'Barlow-Bold',
      extraBold: 'Barlow-ExtraBold'
    }
  },
  fontSize: {
    base: '20px',
    xsmall: '12px',
    xxsmall: '10px',
    sm: '15px',
    lg: '25px',
    title: '90px',
    subtitle: '40px'
  }
};
