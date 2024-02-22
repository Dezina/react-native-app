import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Navbar: React.FC = () => {
  return (
    <View style={styles.navbar}>
      <Text style={styles.navbarText}>My App</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    height: 60,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navbarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Navbar;