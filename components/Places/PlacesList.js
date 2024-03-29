import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import PlaceItem from './PlaceItem';
import { Colors } from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';

const PlacesList = ({ places }) => {
  const navigation = useNavigation();
  if (!places || places.length === 0)
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>No places found - start adding some</Text>
      </View>
    );

  const selectPlaceHandler = (id) => {
    navigation.navigate('PlaceDetail', {
      placeId: id,
    });
  };

  const renderItem = ({ item }) => <PlaceItem place={item} onSelect={selectPlaceHandler} />;

  return (
    <FlatList
      style={styles.list}
      data={places}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
    />
  );
};

export default PlacesList;

const styles = StyleSheet.create({
  list: {
    margin: 24,
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbackText: {
    fontSize: 16,
    color: Colors.primary200,
  },
});
