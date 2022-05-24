import '@emotion/react';

export interface ITheme {
  colors: {
    brown: string;
    white: string;
    green: string;
    orange: string;
    grey: string;
  };
  fontFamily: {
    Barlow: {
      regular: string;
      bold: string;
      extraBold: string;
    };
  };
  fontSize: {
    base: string;
    xsmall: string;
    xxsmall: string;
    sm: string;
    lg: string;
    title: string;
    subtitle: string;
  };
}

declare module '@emotion/react' {
  // eslint-disable-next-line
  export interface Theme extends ITheme { }
}
