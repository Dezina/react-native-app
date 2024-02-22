import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import DetailsScreen from './DetailsScreen';

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
    }
},
phone: string;
website: string;
company: {
  name: string;
  catchPhrase: string;
  bs: string;
}
}

const Stack = createStackNavigator();


const ListScreen: React.FC = () => {
  const [data, setData] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigation = useNavigation();

  const navigateToDetails = (user: User) => {
    navigation.navigate('Details', { user });
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderItem = ({ item }: { item: User }) => (
    <TouchableOpacity onPress={() => navigateToDetails(item)}>
      <View style={styles.listItem}>
        <Text>{item.name}</Text>
        <Text>{item.email}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <Stack.Navigator>
      <Stack.Screen name="List" options={{ headerShown: false }}>
        {() => (
          <View style={styles.container}>
            <Text style={styles.text}>Data records</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search..."
              onChangeText={(text) => setSearchTerm(text)}
            />
            <FlatList
              data={filteredData}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderItem}
            />
          </View>
        )}
      </Stack.Screen>
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '80%',
  },
  listItem: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    width: '80%',
    display: 'flex'
  },
});

export default ListScreen;
