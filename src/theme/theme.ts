import { Platform } from 'react-native';

const palette = {
  sageGreen: '#B2BEB5',
  warmWhite: '#F5F5DC',
  darkGray: '#A9A9A9',
  lightYellow: '#F0E68C',
  black: '#121212',
  white: '#FFFFFF',
  gray: '#888888',
  lightGray: '#F0F0F0',
  darkSurface: '#1F1F1F',
  red: '#D9534F',
  green: '#5CB85C',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const fontSize = {
  caption: 12,
  body: 14,
  label: 16,
  h3: 18,
  h2: 22,
  h1: 28,
};

export const radii = {
  small: 4,
  medium: 8,
  large: 16,
  full: 999,
};

const baseTheme = {
  spacing,
  fontSize,
  radii,
  elevation: Platform.select({
    ios: {
      shadowColor: palette.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    android: {
      elevation: 3,
    },
  }),
};

export const lightTheme = {
  ...baseTheme,
  colors: {
    primary: palette.sageGreen,
    secondary: palette.lightYellow,
    background: palette.warmWhite,
    surface: palette.white,
    text: palette.black,
    muted: palette.gray,
    border: palette.lightGray,
    destructive: palette.red,
    success: palette.green,
    shadow: palette.black,
  },
};

export const darkTheme = {
  ...baseTheme,
  colors: {
    primary: palette.sageGreen,
    secondary: palette.lightYellow,
    background: palette.black,
    surface: palette.darkSurface,
    text: palette.white,
    muted: palette.gray,
    border: palette.darkSurface,
    destructive: palette.red,
    success: palette.green,
    shadow: palette.black,
  },
};

export type Theme = typeof lightTheme;
