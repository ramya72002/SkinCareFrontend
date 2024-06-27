import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView,ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../Header';

const SkinCancerPrevention = ({ navigation  , route }) => {
  const { preferredLanguage } = route.params || { preferredLanguage: 'en' };

  return (
    <View style={styles.container}>
           <Header />

      <Text style={styles.mainHeading}>Skin Cancer Prevention</Text>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity
          style={styles.typeButton}
          onPress={() => navigation.navigate("SunSafety",{ preferredLanguage })}
        >
          <ImageBackground source={require('./images/ss1.png')} style={styles.image} imageStyle={styles.imageStyle}>
            <Text style={styles.buttonText}>Sun Safety Practices</Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.typeButton}
          onPress={() => navigation.navigate("TraditionalClothing",{ preferredLanguage })}
        >
          <ImageBackground source={require('./images/ss2.png')} style={styles.image} imageStyle={styles.imageStyle}>
            <Text style={styles.buttonText}>Traditional Clothing</Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.typeButton}
          onPress={() => navigation.navigate("UVindex",{ preferredLanguage })}
        >
          <ImageBackground source={require('./images/ss4.png')} style={styles.image} imageStyle={styles.imageStyle}>
            <Text style={styles.buttonText}>UV index</Text>
          </ImageBackground>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20,
    marginTop:50,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  mainHeading: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#94499c',
    textAlign: 'center',
  },
  scrollContainer: {
    alignItems: 'center',
  },
  typeButton: {
    width: 300,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
    overflow: 'hidden',
  },
  buttonText: {
    fontSize: 26,
    marginBottom: 5,
    marginTop:50,
    // color: '#fff',
    // textAlign: 'center',
    fontWeight: 'bold',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    borderRadius: 10,
    opacity: 0.8,
  },
});

export default SkinCancerPrevention;
