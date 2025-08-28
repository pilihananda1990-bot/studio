import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
  ActivityIndicator,
} from 'react-native';
import { useTheme } from '@/theme/ThemeProvider';
import { radii, spacing, fontSize } from '@/theme/theme';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'destructive' | 'ghost';
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled,
  isLoading,
  style,
  ...props
}) => {
  const { colors } = useTheme();

  const buttonStyles = [
    styles.button,
    { backgroundColor: colors[variant] || colors.primary },
    disabled || isLoading ? styles.disabled : {},
    style,
  ];

  const textStyles = [
    styles.text,
    { color: variant === 'secondary' ? colors.text : '#FFFFFF' },
  ];

  return (
    <TouchableOpacity
      onPress={onPress}
      style={buttonStyles}
      disabled={disabled || isLoading}
      activeOpacity={0.7}
      {...props}>
      {isLoading ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <Text style={textStyles}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 44,
    borderRadius: radii.medium,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
  },
  text: {
    fontSize: fontSize.label,
    fontWeight: 'bold',
  },
  disabled: {
    opacity: 0.6,
  },
});

export default Button;
