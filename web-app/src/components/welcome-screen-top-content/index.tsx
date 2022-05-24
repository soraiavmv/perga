import React, { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import useWindowDimensions from '../../hooks/useWindowDimensions';

const WelcomeScreenContent: FC = () => {
  const SMALL_SCREEN_MAX_WIDTH = 800;
  const dimensions = useWindowDimensions();
  const [buttonHovered, setButtonHovered] = useState<boolean>(false);
  const [isSmallerScreen, setIsSmallerScreen] = useState<boolean>();

  useEffect(() => {
    if (dimensions)
      setIsSmallerScreen(dimensions.width < SMALL_SCREEN_MAX_WIDTH);
  }, [dimensions]);

  return (
    <TitleContainer smallerScreen={isSmallerScreen}>
      <TitleLine smallerScreen={isSmallerScreen}>
        <Title smallerScreen={isSmallerScreen}>Welcome</Title>
        <Title smallerScreen={isSmallerScreen}>to</Title>
        <Brand>PERGA</Brand>
      </TitleLine>
      <Subtitle>Your Online Personal Gallery</Subtitle>
      <Link href="/main">
        <Button
          onMouseEnter={() => setButtonHovered(true)}
          onMouseLeave={() => setButtonHovered(false)}
          hovered={buttonHovered}
        >
          GET STARTED NOW
        </Button>
      </Link>
    </TitleContainer>
  );
};

interface IButtonProps {
  hovered: boolean;
}

interface IScreenSizeProps {
  smallerScreen: boolean | undefined;
}

const Button = styled.button<IButtonProps>`
  font-family: ${({ theme }) => theme.fontFamily.Barlow.regular};
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.green};
  border-color: ${({ theme }) => theme.colors.white};
  height: 40px;
  border-radius: 35px;
  opacity: ${({ hovered }) => (hovered ? 1 : 0.65)};
`;

const TitleContainer = styled.div<IScreenSizeProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: absolute;
  margin-top: ${({ smallerScreen }) => (smallerScreen ? '-20px' : '150px')};
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const TitleLine = styled.div<IScreenSizeProps>`
  display: flex;
  flex-direction: ${({ smallerScreen }) => (smallerScreen ? 'column' : 'row')};
  align-items: center;
  justify-content: center;
`;

const Title = styled.p<IScreenSizeProps>`
  font-size: ${({ theme }) => theme.fontSize.title};
  color: ${({ theme }) => theme.colors.brown};
  font-family: ${({ theme }) => theme.fontFamily.Barlow.regular};
  margin-right: ${({ smallerScreen }) => (smallerScreen ? '0px' : '20px')};
  margin-bottom: ${({ smallerScreen }) => (smallerScreen ? '-100px' : '90px')};
`;

const Brand = styled.p`
  font-size: ${({ theme }) => theme.fontSize.title};
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fontFamily.Barlow.bold};
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSize.subtitle};
  color: ${({ theme }) => theme.colors.brown};
  margin-top: -80px;
  font-family: ${({ theme }) => theme.fontFamily.Barlow.regular};
  text-align: center;
`;

export default WelcomeScreenContent;
