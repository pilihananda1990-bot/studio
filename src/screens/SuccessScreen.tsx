import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/theme/ThemeProvider';
import { RootStackParamList } from '@/types/navigation';
import { spacing, fontSize } from '@/theme/theme';
import Button from '@/components/ui/Button';

type SuccessScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Success'>;

const SuccessScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<SuccessScreenNavigationProp>();

  const handleGoHome = () => {
    navigation.popToTop();
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <View style={styles.container}>
        <View style={[styles.iconContainer, { backgroundColor: colors.primary }]}>
          <Ionicons name="checkmark-sharp" size={80} color="#FFFFFF" />
        </View>
        <Text style={[styles.title, { color: colors.text }]}>Pickup Scheduled!</Text>
        <Text style={[styles.subtitle, { color: colors.muted }]}>
          Your pickup has been successfully scheduled. Our team will be in touch shortly.
        </Text>
        <Button
          title="Back to Home"
          onPress={handleGoHome}
          style={styles.button}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  iconContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: fontSize.h1,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: fontSize.label,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  button: {
    width: '100%',
  },
});

export default SuccessScreen;
