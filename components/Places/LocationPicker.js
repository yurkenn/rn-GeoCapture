import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import OutlinedButton from '../ui/OutlinedButton';
import { Colors } from '../../constants/colors';
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from 'expo-location';
import { getMapPreview } from '../../util/location';
import { useNavigation } from '@react-navigation/native';

const LocationPicker = () => {
  const navigation = useNavigation();
  const [pickedLocation, setPickedLocation] = useState();
  const [permissionStatus, requestPermission] = useForegroundPermissions();

  const verifyPermission = async () => {
    if (permissionStatus.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (permissionStatus.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Permission Denied',
        'You need to grant location permission to use this feature',
        [{ text: 'Okay' }]
      );
      return false;
    }
    return true;
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      return;
    }
    try {
      const location = await getCurrentPositionAsync();
      setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
      console.log(location);
    } catch (error) {
      Alert.alert(
        'Could not fetch location',
        'Please try again later or pick a location on the map',
        [{ text: 'Okay' }]
      );
    }
  };

  const pickOnMapHandler = () => {
    navigation.navigate('Map');
  };

  let locationPreview = <Text>No location picked yet.</Text>;

  if (pickedLocation) {
    locationPreview = (
      <Image
        style={styles.image}
        source={{ uri: getMapPreview(pickedLocation.lat, pickedLocation.lng) }}
      />
    );
  }

  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.actions}>
        <OutlinedButton icon={'location'} onPress={getLocationHandler}>
          Locate User
        </OutlinedButton>
        <OutlinedButton icon={'map'} onPress={pickOnMapHandler}>
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
  },
});
