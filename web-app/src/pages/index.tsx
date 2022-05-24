import BaseLayout from '../layouts/base';
import { Engine } from 'tsparticles-engine';
import { NextPage } from 'next';
import Particles from 'react-tsparticles';
import WelcomeScreenContent from '../components/welcome-screen-top-content';
import { loadFull } from 'tsparticles';
import styled from '@emotion/styled';

const Home: NextPage = () => {
  const particlesInit = async (main: Engine) => {
    await loadFull(main);
  };

  return (
    <BaseLayout headTitle="Welcome!" headDescription="Welcome to PERGA">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            image:
              'linear-gradient(90deg, hsla(335, 85%, 70%, 0.9) 0%, hsla(49, 89%, 61%, 0.9) 100%)'
          },
          particles: {
            number: {
              value: 40,
              density: { enable: false }
            },
            size: {
              value: 12,
              random: true,
              anim: { speed: 1, size_min: 0.3 }
            },
            links: { enable: false },
            move: {
              random: true,
              speed: 1,
              direction: 'top',
              outModes: 'out',
              enable: true
            }
          },
          interactivity: {
            events: {
              onhover: { enable: true, mode: 'bubble' },
              onclick: { enable: true, mode: 'repulse' }
            },
            modes: {
              bubble: { distance: 250, duration: 2, size: 0, opacity: 0 },
              repulse: { distance: 400, duration: 4 }
            }
          }
        }}
      />
      <WelcomeScreenContent />
      <BottomBar>
        <BottomBarOption>Help</BottomBarOption>
        <BottomBarOption>|</BottomBarOption>
        <BottomBarOption>Login</BottomBarOption>
        <BottomBarOption>Register</BottomBarOption>
      </BottomBar>
    </BaseLayout>
  );
};

const BottomBar = styled.div`
  width: 100%;
  height: 12%;
  background-color: ${({ theme }) => theme.colors.white};
  opacity: 0.7;
  position: fixed;
  bottom: -10px;
  left: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

const BottomBarOption = styled.button`
  font-family: ${({ theme }) => theme.fontFamily.Barlow.regular};
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.brown};
  margin-right: 15px;
  background: none;
  border: none;
`;

export default Home;
