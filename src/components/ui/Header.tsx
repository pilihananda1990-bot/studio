import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/theme/ThemeProvider';
import { spacing, fontSize } from '@/theme/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface HeaderProps {
  title: string;
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
  canGoBack?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  title,
  leftComponent,
  rightComponent,
  canGoBack,
}) => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const handleBackPress = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.surface,
          borderBottomColor: colors.border,
          paddingTop: insets.top,
          height: 56 + insets.top,
        },
      ]}>
      <View style={styles.sideComponentContainer}>
        {canGoBack && !leftComponent && (
          <TouchableOpacity onPress={handleBackPress} style={styles.touchable}>
            <Ionicons name="arrow-back-outline" size={24} color={colors.text} />
          </TouchableOpacity>
        )}
        {leftComponent}
      </View>
      <View style={styles.titleContainer}>
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
          {title}
        </Text>
      </View>
      <View style={[styles.sideComponentContainer, styles.rightComponent]}>{rightComponent}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  sideComponentContainer: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  rightComponent: {
    alignItems: 'flex-end',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: fontSize.h3,
    fontWeight: 'bold',
  },
  touchable: {
    padding: spacing.xs,
  },
});

export default Header;
