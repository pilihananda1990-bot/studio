import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Header from '@/components/ui/Header';
import { useTheme } from '@/theme/ThemeProvider';
import { spacing, fontSize, radii } from '@/theme/theme';
import { RecyclableItem } from '@/types';
import { RootStackParamList } from '@/types/navigation';
import Card from '@/components/ui/Card';
import Avatar from '@/components/ui/Avatar';

// Mock Data yang lebih kaya
const categories = ['All', 'Paper', 'Plastic', 'Metal', 'Glass', 'E-waste'];
const recyclableItems: RecyclableItem[] = [
  {
    id: '1',
    name: 'PET Bottles',
    category: 'Plastic',
    pricePerKg: 1.5,
    image: 'https://picsum.photos/seed/pet-bottles/300/200',
    description: 'Botol PET (Polyethylene terephthalate) adalah salah satu jenis plastik yang paling umum didaur ulang. Pastikan botol dalam keadaan kosong dan bersih sebelum disetor.'
  },
  {
    id: '2',
    name: 'Cardboard',
    category: 'Paper',
    pricePerKg: 0.8,
    image: 'https://picsum.photos/seed/cardboard/300/200',
    description: 'Kardus bekas kemasan, kotak, dan lainnya. Pastikan untuk melipatnya agar tidak memakan banyak tempat. Hindari kardus yang terkontaminasi minyak atau sisa makanan.'
  },
  {
    id: '3',
    name: 'Aluminum Cans',
    category: 'Metal',
    pricePerKg: 12.0,
    image: 'https://picsum.photos/seed/aluminum-cans/300/200',
    description: 'Kaleng minuman aluminium memiliki nilai daur ulang yang tinggi. Proses daur ulangnya menghemat hingga 95% energi dibandingkan membuat dari bahan mentah.'
  },
    {
    id: '4',
    name: 'Glass Jars',
    category: 'Glass',
    pricePerKg: 0.5,
    image: 'https://picsum.photos/seed/glass-jars/300/200',
    description: 'Toples dan botol kaca dapat didaur ulang tanpa batas tanpa kehilangan kualitas. Pisahkan berdasarkan warna (bening, coklat, hijau) jika memungkinkan.'
  },
  {
    id: '5',
    name: 'Old Newspapers',
    category: 'Paper',
    pricePerKg: 0.7,
    image: 'https://picsum.photos/seed/newspapers/300/200',
    description: 'Koran dan majalah bekas. Pastikan kertas dalam keadaan kering dan tidak kotor.'
  },
  {
    id: '6',
    name: 'Used Batteries',
    category: 'E-waste',
    pricePerKg: 2.0,
    image: 'https://picsum.photos/seed/batteries/300/200',
    description: 'Baterai bekas termasuk limbah B3 (Bahan Berbahaya dan Beracun) dan harus ditangani secara khusus. Jangan dicampur dengan sampah lain.'
  },
];

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Main'
>;

const HomeScreen = () => {
  const { colors, isDarkMode } = useTheme();
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredItems =
    activeCategory === 'All'
      ? recyclableItems
      : recyclableItems.filter(item => item.category === activeCategory);

  const handleItemPress = (item: RecyclableItem) => {
    navigation.navigate('ItemDetail', { item });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <Header
        title="EcoCollect"
        leftComponent={<Avatar source={{ uri: 'https://i.pravatar.cc/150?u=jobayer' }} />}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[styles.greeting, { color: colors.text }]}>
          Welcome back, Jobayer!
        </Text>
        <Text style={[styles.subtitle, { color: colors.muted }]}>
          Let's make our planet cleaner, one item at a time.
        </Text>

        <View style={styles.categoriesContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map(category => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryChip,
                  { backgroundColor: colors.surface },
                  activeCategory === category && {
                    backgroundColor: colors.primary,
                  },
                ]}
                onPress={() => setActiveCategory(category)}>
                <Text
                  style={[
                    styles.categoryText,
                    { color: colors.text },
                    activeCategory === category && { color: '#fff' },
                  ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.itemsGrid}>
          {filteredItems.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.itemTouchable}
              onPress={() => handleItemPress(item)}>
              <Card style={styles.itemCard}>
                <Image source={{ uri: item.image }} style={styles.itemImage} />
                <View style={styles.itemInfo}>
                  <Text style={[styles.itemName, { color: colors.text }]}>
                    {item.name}
                  </Text>
                  <Text style={[styles.itemPrice, { color: colors.primary }]}>
                    ${item.pricePerKg.toFixed(2)}/kg
                  </Text>
                </View>
              </Card>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
  },
  greeting: {
    fontSize: fontSize.h2,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: fontSize.body,
    marginBottom: spacing.lg,
  },
  categoriesContainer: {
    marginBottom: spacing.lg,
  },
  categoryChip: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radii.full,
    marginRight: spacing.sm,
  },
  categoryText: {
    fontSize: fontSize.body,
    fontWeight: '600',
  },
  itemsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -spacing.sm,
  },
  itemTouchable: {
    width: '50%',
    padding: spacing.sm,
  },
  itemCard: {
    padding: 0,
    overflow: 'hidden',
  },
  itemImage: {
    width: '100%',
    height: 120,
  },
  itemInfo: {
    padding: spacing.md,
  },
  itemName: {
    fontSize: fontSize.label,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: fontSize.body,
    marginTop: spacing.xs,
  },
});

export default HomeScreen;
