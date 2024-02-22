import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps'; // Import MapView from react-native-maps
import { useNavigation } from '@react-navigation/native';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

const DetailsScreen: React.FC<{ route: { params: { user: User } } }> = ({ route }) => {
  const { user } = route.params;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={[styles.card, styles.headerCard]}>
        <Text style={styles.headerText}>{user.name}</Text>
      </View>

      <View style={[styles.card, styles.dataCard]}>
        <Text>Name: {user.name}</Text>
        <Text>Email: {user.email}</Text>
        <Text>Street: {user.address.street}</Text>
        <Text>Phone: {user.phone}</Text>

        {/* Display Map */}
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: parseFloat(user.address.geo.lat),
              longitude: parseFloat(user.address.geo.lng),
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{
                latitude: parseFloat(user.address.geo.lat),
                longitude: parseFloat(user.address.geo.lng),
              }}
              title="User's Location"
              description="This is the user's location"
            />
          </MapView>
        </View>
        {/* End Display Map */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerCard: {
    backgroundColor: '#3498db',
  },
  dataCard: {
    backgroundColor: '#ecf0f1',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  mapContainer: {
    height: 200,
    marginVertical: 10,
  },
  map: {
    flex: 1,
  },
});

export default DetailsScreen;
