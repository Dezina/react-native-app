import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../HomeScreen';
import ListScreen from '../ListScreen';
import GameScreen from '../GameScreen';
import CrudScreen from '../CrudScreen';

const Tab = createBottomTabNavigator();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: any;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline'; // Example Ionicons names
            } else if (route.name === 'Records') {
              iconName = focused ? 'list' : 'list-outline';
            } else if (route.name === 'Game') {
              iconName = focused ? 'game-controller' : 'game-controller-outline';
            } else if (route.name === 'Crud') {
              iconName = focused ? 'create' : 'create-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Records" component={ListScreen} />
        <Tab.Screen name="Game" component={GameScreen}/>
        <Tab.Screen name="Crud" component={CrudScreen}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
