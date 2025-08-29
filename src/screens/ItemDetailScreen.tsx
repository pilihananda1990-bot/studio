import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useTheme } from '@/theme/ThemeProvider';
import Header from '@/components/ui/Header';
import Button from '@/components/ui/Button';
import { RootStackParamList } from '@/types/navigation';
import { spacing, fontSize } from '@/theme/theme';

type ItemDetailScreenRouteProp = RouteProp<RootStackParamList, 'ItemDetail'>;

const ItemDetailScreen = () => {
  const { colors } = useTheme();
  const route = useRoute<ItemDetailScreenRouteProp>();
  const { item } = route.params;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.contentContainer}>
          <Text style={[styles.itemName, { color: colors.text }]}>{item.name}</Text>
          <Text style={[styles.itemCategory, { color: colors.muted }]}>{item.category}</Text>
          
          <View style={styles.priceContainer}>
             <Text style={[styles.priceLabel, { color: colors.primary }]}>Price per kg:</Text>
             <Text style={[styles.priceValue, { color: colors.primary }]}>${item.pricePerKg.toFixed(2)}</Text>
          </View>
          
          <Text style={[styles.description, { color: colors.text }]}>
            {item.description || 'Detailed description about how to recycle this item properly will be here.'}
          </Text>
          
          <Button title="Schedule Pickup" style={styles.button} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 250,
  },
  contentContainer: {
    padding: spacing.md,
  },
  itemName: {
    fontSize: fontSize.h1,
    fontWeight: 'bold',
  },
  itemCategory: {
      fontSize: fontSize.label,
      color: 'grey',
      marginBottom: spacing.md,
  },
  priceContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'rgba(178, 190, 181, 0.2)',
      padding: spacing.md,
      borderRadius: 8,
      marginVertical: spacing.lg,
  },
  priceLabel: {
      fontSize: fontSize.label,
      fontWeight: '600'
  },
  priceValue: {
      fontSize: fontSize.h2,
      fontWeight: 'bold',
      marginLeft: spacing.sm,
  },
  description: {
    fontSize: fontSize.body,
    lineHeight: 22,
    color: 'grey',
  },
  button: {
      marginTop: spacing.xl,
  }
});

export default ItemDetailScreen;
