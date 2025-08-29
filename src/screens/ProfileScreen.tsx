import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '@/components/ui/Header';
import Avatar from '@/components/ui/Avatar';
import Button from '@/components/ui/Button';
import { useTheme } from '@/theme/ThemeProvider';
import { spacing, fontSize, radii } from '@/theme/theme';

const menuItems = [
  { icon: 'person-outline', label: 'Edit Profile' },
  { icon: 'wallet-outline', label: 'My Wallet' },
  { icon: 'settings-outline', label: 'Settings' },
  { icon: 'help-circle-outline', label: 'Help & Feedback' },
] as const;


const ProfileScreen = () => {
  const { colors, isDarkMode, toggleTheme } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <Header title="Profile" />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.profileHeader}>
          <Avatar
            source={{ uri: 'https://i.pravatar.cc/150?u=jobayer' }}
            size={80}
          />
          <Text style={[styles.name, { color: colors.text }]}>
            Jobayer Mahbub
          </Text>
          <Text style={[styles.email, { color: colors.muted }]}>
            eco.warrior@example.com
          </Text>
        </View>

        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.menuItem, { borderBottomColor: colors.border }]}>
              <Ionicons name={item.icon} size={24} color={colors.text} />
              <Text style={[styles.menuLabel, { color: colors.text }]}>
                {item.label}
              </Text>
              <Ionicons name="chevron-forward-outline" size={22} color={colors.muted} />
            </TouchableOpacity>
          ))}
           <TouchableOpacity
              style={[styles.menuItem, { borderBottomColor: colors.border }]}
              onPress={toggleTheme}
            >
              <Ionicons name={isDarkMode ? 'sunny-outline' : 'moon-outline'} size={24} color={colors.text} />
              <Text style={[styles.menuLabel, { color: colors.text }]}>
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
              </Text>
            </TouchableOpacity>
        </View>

        <Button
          title="Log Out"
          variant="destructive"
          onPress={() => {}}
          style={{ marginTop: spacing.lg }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  name: {
    fontSize: fontSize.h2,
    fontWeight: 'bold',
    marginTop: spacing.md,
  },
  email: {
    fontSize: fontSize.body,
    marginTop: spacing.xs,
  },
  menuContainer: {
    backgroundColor: 'transparent',
    borderRadius: radii.medium,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
  },
  menuLabel: {
    flex: 1,
    fontSize: fontSize.label,
    marginLeft: spacing.md,
  },
});

export default ProfileScreen;
