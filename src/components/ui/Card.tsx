import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { useTheme } from '@/theme/ThemeProvider';
import { radii, spacing } from '@/theme/theme';

interface CardProps extends ViewProps {}

const Card: React.FC<CardProps> = ({ style, children, ...props }) => {
  const { colors, elevation } = useTheme();

  const cardStyle = [
    styles.card,
    {
      backgroundColor: colors.surface,
      shadowColor: colors.shadow,
      ...elevation,
    },
    style,
  ];

  return (
    <View style={cardStyle} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: radii.medium,
    padding: spacing.md,
  },
});

export default Card;
