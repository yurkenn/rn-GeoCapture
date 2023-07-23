import { Alert, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import IconButton from '../components/ui/IconButton';
const Map = ({ navigation, route }) => {
  const initialLocation = route.params
    ? { lat: route.params.initialLat, lng: route.params.initialLng }
    : null;

  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  const mapRegion = {
    latitude: initialLocation ? initialLocation.lat : 37.78,
    longitude: initialLocation ? initialLocation.lng : -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const selectLocationHandler = (event) => {
    if (initialLocation) {
      return;
    }
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;
    setSelectedLocation({
      lat: lat,
      lng: lng,
    });
  };

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert('No location picked!', 'Please pick a location (by tapping on map) first.', [
        { text: 'Okay' },
      ]);
      return;
    }
    navigation.navigate('AddPlace', {
      pickedLat: selectedLocation.lat,
      pickedLng: selectedLocation.lng,
    });
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
    if (initialLocation) {
      return;
    }
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton icon={'save'} color={tintColor} size={24} onPress={savePickedLocationHandler} />
      ),
    });
  }, [navigation, savePickedLocationHandler, initialLocation]);

  return (
    <MapView onPress={selectLocationHandler} style={styles.map} initialRegion={mapRegion}>
      {selectedLocation && (
        <Marker
          title="Picked Location"
          coordinate={{ latitude: selectedLocation.lat, longitude: selectedLocation.lng }}
        />
      )}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
