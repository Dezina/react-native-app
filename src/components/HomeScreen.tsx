import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  withRepeat,
} from 'react-native-reanimated';

const window = Dimensions.get('window');
const screenHeight = window.height;
const screenWidth = window.width;

const HomeScreen: React.FC = () => {
  const numBirds = 10;
  const birds = Array.from({ length: numBirds });
  const gardenBackground = { uri: 'https://i.insider.com/5a61087d55ac562d008b4794?width=700' };
  const birdsImage = { uri: 'https://i.imgur.com/FGjKGEb.gif' };

  const animateBird = () => {
    return withRepeat(
      withTiming(screenWidth, { duration: 15000, easing: Easing.linear }),
      -1, // Infinite repeat
      true
    );
  };

  const birdX = birds.map(() => useSharedValue(-50));

  React.useEffect(() => {
    birdX.forEach((sharedValue) => {
      sharedValue.value = animateBird();
    });
  }, []);

  const birdStyles = birdX.map((sharedValue, index) => {
    return useAnimatedStyle(() => {
      return {
        transform: [{ translateX: sharedValue.value }],
        top: 0, // Adjust this value to position the birds at the top
      };
    });
  });

  return (
    <View style={styles.container}>
      <ImageBackground source={gardenBackground} style={styles.backgroundImage}>
        {birds.map((_, index) => (
          <Animated.Image
            key={index}
            source={birdsImage}
            style={[styles.bird, birdStyles[index]]}
          />
        ))}
      </ImageBackground>
      <Text style={styles.description}>
        Enjoy the peaceful birds in our beautiful gardening park.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  bird: {
    width: 200,
    height: 150,
    position: 'absolute',
  },
  description: {
    fontStyle: 'italic',
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
    color: '#000',
  },
});

export default HomeScreen;
