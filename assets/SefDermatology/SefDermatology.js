import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import Header from '../Header';

const SefDermatology = ({ navigation  , route }) => {
    const { preferredLanguage } = route.params || { preferredLanguage: 'en' };
  
  return (
    <View style={styles.container}>
           <Header />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>

      <Text style={styles.mainHeading}>Common Skin Conditions</Text>
        <TouchableOpacity
          style={styles.typeButton}
          onPress={() => navigation.navigate("Infectious",{preferredLanguage})}
        >
          <ImageBackground source={require('./images/image33.png')} style={styles.image} imageStyle={styles.imageStyle}>
            <Text style={styles.buttonText}>Infectious Skin Diseases</Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.typeButton}
          onPress={() => navigation.navigate("Inflaauto",{preferredLanguage})}
        >
          <ImageBackground source={require('./images/image44.png')} style={styles.image} imageStyle={styles.imageStyle}>
            <Text style={styles.buttonText}>Inflammatory and Autoimmune Skin Conditions</Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.typeButton}
          onPress={() => navigation.navigate("Pigmentary",{preferredLanguage})}
        >
          <ImageBackground source={require('./images/image22.png')} style={styles.image} imageStyle={styles.imageStyle}>
            <Text style={styles.buttonText}>Pigmentary Disorders</Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.typeButton}
          onPress={() => navigation.navigate("Hair",{preferredLanguage})}
        >
          <ImageBackground source={require('./images/image11.png')} style={styles.image} imageStyle={styles.imageStyle}>
            <Text style={styles.buttonText}>Hair and Scalp Disorders</Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.typeButton}
          onPress={() => navigation.navigate("Envdisorder",{preferredLanguage})}
        >
          <ImageBackground source={require('./images/image88.png')} style={styles.image} imageStyle={styles.imageStyle}>
            <Text style={styles.buttonText}>Environmental and Occupational Disorders</Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.typeButton}
          onPress={() => navigation.navigate("Additional",{preferredLanguage})}
        >
          <ImageBackground source={require('./images/image.png')} style={styles.image} imageStyle={styles.imageStyle}>
            <Text style={styles.buttonText}>Additional Resources</Text>
          </ImageBackground>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 0,
    marginTop:1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  mainHeading: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#94499c',
    textAlign: 'center',
  },
  scrollContainer: {
    alignItems: 'center',
  },
  typeButton: {
    width: 350,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
    overflow: 'hidden',
  },
  buttonText: {
    fontSize: 26,
    marginBottom: 10,
    marginTop:75,
    textAlign: 'center',
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

export default SefDermatology;
