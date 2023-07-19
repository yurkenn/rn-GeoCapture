import { Button, Image, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker';
import { Colors } from '../../constants/colors';

const ImagePicker = () => {
  const [pickedImage, setPickedImage] = useState(null);
  const [cameraPermission, requestPermission] = useCameraPermissions();
  const verifyPermissions = async () => {
    if (cameraPermission.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }
    if (cameraPermission.status === PermissionStatus.DENIED) {
      alert('You need to grant camera permissions to use this app.');
      return false;
    }
    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    setPickedImage(image.assets[0].uri);
  };

  let imagePreview = <Text style={styles.previewText}>No image taken yet!</Text>;

  if (pickedImage) {
    imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>{imagePreview}</View>
      <Button style={styles.button} title="Take Image" onPress={takeImageHandler} />
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 16,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  button: {
    width: '100%',
  },
  previewText: {
    textAlign: 'center',
    color: Colors.primary700,
  },
});
