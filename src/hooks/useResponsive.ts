import { Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Base dimensions from a reference device (e.g., iPhone 11)
const DESIGN_WIDTH = 375;
const DESIGN_HEIGHT = 812;

export const scale = (size: number) => (SCREEN_WIDTH / DESIGN_WIDTH) * size;
export const verticalScale = (size: number) => (SCREEN_HEIGHT / DESIGN_HEIGHT) * size;
export const moderateScale = (size: number, factor = 0.5) => size + (scale(size) - size) * factor;

export const useResponsive = () => {
  return {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    scale,
    verticalScale,
    moderateScale,
  };
};
