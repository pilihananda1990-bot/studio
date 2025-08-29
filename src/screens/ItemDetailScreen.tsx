import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '@/theme/ThemeProvider';
import Button from '@/components/ui/Button';
import { RootStackParamList } from '@/types/navigation';
import { spacing, fontSize } from '@/theme/theme';
import Card from '@/components/ui/Card';

type ItemDetailScreenRouteProp = RouteProp<RootStackParamList, 'ItemDetail'>;
type ItemDetailNavigationProp = StackNavigationProp<RootStackParamList, 'ItemDetail'>;


const ItemDetailScreen = () => {
  const { colors } = useTheme();
  const route = useRoute<ItemDetailScreenRouteProp>();
  const navigation = useNavigation<ItemDetailNavigationProp>();
  const { item } = route.params;

  const [isScheduling, setIsScheduling] = useState(false);

  const handleSchedulePickup = () => {
    setIsScheduling(true);
    // Simulate an API call
    setTimeout(() => {
      setIsScheduling(false);
      navigation.replace('Success');
    }, 2000);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.contentContainer}>
          <Text style={[styles.itemName, { color: colors.text }]}>{item.name}</Text>
          <Text style={[styles.itemCategory, { color: colors.muted }]}>{item.category}</Text>
          
          <View style={styles.priceContainer}>
             <Text style={[styles.priceLabel, { color: colors.primary }]}>Est. Price per kg:</Text>
             <Text style={[styles.priceValue, { color: colors.primary }]}>${item.pricePerKg.toFixed(2)}</Text>
          </View>
          
          <Card style={{backgroundColor: colors.surface, marginVertical: spacing.lg}}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>Description</Text>
            <Text style={[styles.description, { color: colors.text }]}>
              {item.description || 'Detailed description about this item will be here.'}
            </Text>
          </Card>

           <Card style={{backgroundColor: colors.surface}}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>How to Recycle</Text>
            <Text style={[styles.description, { color: colors.text }]}>
             - Ensure the item is clean and dry.{"\n"}
             - Remove any non-recyclable parts (like plastic wrap on cardboard).{"\n"}
             - Flatten items like boxes and cans to save space.
            </Text>
          </Card>
          
          <Button 
            title="Schedule Pickup" 
            style={styles.button}
            onPress={handleSchedulePickup}
            isLoading={isScheduling}
          />
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
      marginBottom: spacing.md,
  },
  priceContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'rgba(178, 190, 181, 0.2)',
      padding: spacing.md,
      borderRadius: 8,
      marginVertical: spacing.lg,
      justifyContent: 'space-between',
  },
  priceLabel: {
      fontSize: fontSize.label,
      fontWeight: '600'
  },
  priceValue: {
      fontSize: fontSize.h2,
      fontWeight: 'bold',
  },
  cardTitle: {
    fontSize: fontSize.h3,
    fontWeight: 'bold',
    marginBottom: spacing.sm,
  },
  description: {
    fontSize: fontSize.body,
    lineHeight: 22,
  },
  button: {
      marginTop: spacing.xl,
      marginBottom: spacing.lg,
  }
});

export default ItemDetailScreen;
