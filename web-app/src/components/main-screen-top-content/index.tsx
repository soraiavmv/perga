import { FC, useState } from 'react';
import { slide as Menu } from 'react-burger-menu';
import styled from '@emotion/styled';
import { styles } from './burger-styles';
import useWindowDimensions from '../../hooks/useWindowDimensions';

const MainPageTopContent: FC = () => {
  const dimensions = useWindowDimensions();
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <TopBar>
      <TopBarLeftContent>
        <BrandName>PERGA</BrandName>
      </TopBarLeftContent>
      {dimensions && dimensions.width && dimensions.width > 900 ? (
        <TopBarRightContent>
          <TopBarOption>Help</TopBarOption>
          <TopBarOption>|</TopBarOption>
          <TopBarOption>My Account</TopBarOption>
          <TopBarOption>Logout</TopBarOption>
        </TopBarRightContent>
      ) : (
        <Button onClick={() => setMenuOpen(!isMenuOpen)}>
          <Menu styles={styles} width={'250px'} isOpen={isMenuOpen} right>
            <TopBarOption>Help</TopBarOption>
            <TopBarOption>My Account</TopBarOption>
            <TopBarOption>Logout</TopBarOption>
          </Menu>
        </Button>
      )}
    </TopBar>
  );
};

const TopBar = styled.div`
  width: 100%;
  min-height: 70px;
  height: 10%;
  background-color: ${({ theme }) => theme.colors.orange};
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  z-index: 10;
`;

const TopBarLeftContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-left: 20px;
`;

const TopBarRightContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

const BrandName = styled.p`
  font-family: ${({ theme }) => theme.fontFamily.Barlow.bold};
  font-size: ${({ theme }) => theme.fontSize.subtitle};
  color: ${({ theme }) => theme.colors.brown};
  margin-right: 10px;
`;

const TopBarOption = styled.button`
  font-family: ${({ theme }) => theme.fontFamily.Barlow.regular};
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.brown};
  margin-right: 15px;
  background: none;
  border: none;
`;

const Button = styled.a`
  position: fixed;
  width: 36px;
  height: 30px;
  right: 20px;
  top: 20px;
  border: none;
  background: none;
`;

export default MainPageTopContent;
