import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Alert } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import Header from '@/components/ui/Header';
import { useTheme } from '@/theme/ThemeProvider';
import { spacing, fontSize } from '@/theme/theme';

const MapScreen = () => {
  const { colors, isDarkMode } = useTheme();

  const initialRegion = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const markers = [
    {
      latlng: { latitude: 37.78825, longitude: -122.4324 },
      title: 'Recycling Center A',
      description: 'Open 9am - 5pm',
    },
    {
      latlng: { latitude: 37.7749, longitude: -122.4194 },
      title: 'Eco Savers Point B',
      description: '24/7 Drop-off',
    },
  ];

  const onMarkerPress = (title: string) => {
    Alert.alert('Marker Pressed', `You pressed on ${title}`);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <Header title="Drop-off Locations" />
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={initialRegion}
          mapType={isDarkMode ? 'standard' : 'standard'} // Can be customized further
          userInterfaceStyle={isDarkMode ? 'dark' : 'light'}
          >
          {markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={marker.latlng}
              onPress={() => onMarkerPress(marker.title)}>
              <Callout tooltip>
                <View style={[styles.calloutView, { backgroundColor: colors.surface }]}>
                  <Text style={[styles.calloutTitle, { color: colors.text }]}>{marker.title}</Text>
                  <Text style={[styles.calloutDescription, { color: colors.muted }]}>{marker.description}</Text>
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  calloutView: {
    padding: spacing.md,
    borderRadius: 8,
    width: 150,
  },
  calloutTitle: {
    fontSize: fontSize.body,
    fontWeight: 'bold',
  },
  calloutDescription: {
    fontSize: fontSize.caption,
  },
});

export default MapScreen;
