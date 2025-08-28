import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
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
        },
      ]}>
      <View style={styles.sideComponent}>
        {canGoBack && !leftComponent && (
          <TouchableOpacity onPress={handleBackPress} style={styles.touchable}>
            <Icon name="arrow-back-outline" size={24} color={colors.text} />
          </TouchableOpacity>
        )}
        {leftComponent}
      </View>
      <View style={styles.titleContainer}>
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
          {title}
        </Text>
      </View>
      <View style={styles.sideComponent}>{rightComponent}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56, // Standard header height
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  sideComponent: {
    width: '20%',
    alignItems: 'flex-start',
    justifyContent: 'center',
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

// Align right component correctly
styles.sideComponent = {
  ...styles.sideComponent,
  alignItems: 'flex-end',
  right: 0,
};
styles.sideComponent = {
  ...styles.sideComponent,
  alignItems: 'flex-start',
  left: 0,
};


export default Header;
