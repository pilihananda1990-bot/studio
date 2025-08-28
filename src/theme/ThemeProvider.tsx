import React, { createContext, useContext, useState, useMemo } from 'react';
import { Appearance } from 'react-native';
import { lightTheme, darkTheme, Theme } from './theme';

interface ThemeContextType {
  theme: Theme;
  isDarkMode: boolean;
  toggleTheme: () => void;
  colors: Theme['colors'];
  spacing: Theme['spacing'];
  fontSize: Theme['fontSize'];
  radii: Theme['radii'];
  elevation: Theme['elevation'];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const colorScheme = Appearance.getColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const theme = useMemo(
    () => (isDarkMode ? darkTheme : lightTheme),
    [isDarkMode]
  );

  const value = {
    theme,
    isDarkMode,
    toggleTheme,
    colors: theme.colors,
    spacing: theme.spacing,
    fontSize: theme.fontSize,
    radii: theme.radii,
    elevation: theme.elevation,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
