import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Swiper from 'react-native-swiper';
import LottieView from 'lottie-react-native';
import CustomButton from '../components/CustomButton';
import { setUserFirstTime } from '../utils/storage';

const slides = [
  {
    id: 1,
    heading: 'WELCOME',
    text: 'Welcome to Task Manager',
    animation: require('../assets/firstIntro.json'),
  },
  {
    id: 2,
    heading: 'ORGANIZE',
    text: 'Organize Your Tasks efficiently',
    animation: require('../assets/SecondIntro.json'),
  },
  {
    id: 3,
    heading: 'REMINDER',
    text: 'Stay on Track with Reminders',
    animation: require('../assets/thirdIntro.json'),
  },
];

const IntroScreen = ({navigation}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleStartedFlow =  async () =>{
      await setUserFirstTime(false);
      navigation.replace('LoginScreen');
  };

  return (
    <View style={styles.container}>
      <Swiper
        showsPagination={true}
        loop={false}
        onIndexChanged={index => {
          setCurrentIndex(index);
        }}>
        {slides.map(slide => (
          <View key={slide.id} style={styles.slide}>
            <Text style={styles.header}>{slide.heading}</Text>
            <LottieView
              source={slide.animation}
              autoPlay
              loop
              style={styles.animation}
            />
            <Text style={styles.text}>{slide.text}</Text>
          </View>
        ))}
      </Swiper>
      {currentIndex === slides.length - 1 && (
        <View style={styles.buttonContainer}>
          <CustomButton
            text="Get Started"
            onPress={handleStartedFlow}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    position: 'absolute',
    top: 100,
  },
  animation: {
    flex: 1,
    width: 300,
    height: 300,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    position: 'absolute',
    bottom: 140,
    width: '80%',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    marginBottom:20,
  },
  swiper: {
    flex: 1,
  },
});

export default IntroScreen;
