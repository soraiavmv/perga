import { theme } from '../../theme';

export const styles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '36px',
    height: '30px',
    right: '20px',
    top: '20px'
  },
  bmBurgerBars: {
    background: theme.colors.brown
  },
  bmCrossButton: {
    height: '24px',
    width: '24px'
  },
  bmCross: {
    background: theme.colors.brown
  },
  bmMenuWrap: {
    position: 'fixed',
    right: '0px',
    height: '100%'
  },
  bmMenu: {
    background: theme.colors.orange,
    padding: '2.5em 1.5em 0',
    fontSize: '1.15em'
  },
  bmMorphShape: {
    fill: '#373a47'
  },
  bmItemList: {
    color: '#b8b7ad',
    padding: '0.8em'
  },
  bmItem: {
    display: 'inline-block'
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)'
  }
};