import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import Header from '../Header';

const SkinCancerTypes = ({ navigation  , route }) => {
    const { preferredLanguage } = route.params || { preferredLanguage: 'en' };
  
  return (
    <View style={styles.container}>
           <Header />

      <Text style={styles.mainHeading}>Skin Cancer Types</Text>
       <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity
          style={styles.typeButton}
          onPress={() => navigation.navigate("BCComponent",{preferredLanguage})}
        >
          <ImageBackground source={require('./BCC.jpg')} style={styles.image} imageStyle={styles.imageStyle}>
            <Text style={styles.buttonText}>BCC</Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.typeButton}
          onPress={() => navigation.navigate("SCComponent",{preferredLanguage})}
        >
          <ImageBackground source={require('./SCC.jpg')} style={styles.image} imageStyle={styles.imageStyle}>
            <Text style={styles.buttonText}>SCC</Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.typeButton}
          onPress={() => navigation.navigate("MelanomaComponent",{preferredLanguage})}
        >
          <ImageBackground source={require('./MEM.jpg')} style={styles.image} imageStyle={styles.imageStyle}>
            <Text style={styles.buttonText}>Melanoma</Text>
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
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#94499c',
    textAlign: 'center',
  },
  scrollContainer: {
    alignItems: 'center',
  },
  typeButton: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
    overflow: 'hidden',
  },
  buttonText: {
    fontSize: 26,
    color: '#fff',
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

export default SkinCancerTypes;
