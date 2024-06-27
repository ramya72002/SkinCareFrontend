import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import Header from '../Header';

const Categories = ({ navigation, route }) => {
  const { preferredLanguage } = route.params || { preferredLanguage: 'en' };

  return (
    <View> 
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <Text style={styles.heading}>Categories</Text>
        <TouchableOpacity
          style={styles.box}
          onPress={() => navigation.navigate('SkinCancerTypes', { preferredLanguage })}
        >
          <Image
            source={require('./categoryImages/bb.png')}
            style={styles.image}
          />
          <Text style={styles.title}>Skin Cancer Types</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={styles.box}
        onPress={() => navigation.navigate('SkinCancerPrevention', { preferredLanguage })}
      >
        <Image
          source={require('./categoryImages/bb4.png')}
          style={styles.image}
        />
        <Text style={styles.title}>Skin Cancer Prevention</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.box}
        onPress={() => navigation.navigate('SefDermatology', { preferredLanguage })}
      >
        <Image
          source={require('./categoryImages/bb5.png')}
          style={styles.image}
        />
        <Text style={styles.title}>Common Skin Conditions</Text>
      </TouchableOpacity>
      </View>
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 20,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  heading: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#94499c',
  },
  box: {
    width: '100%',
    height: 150,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    position: 'absolute',
    opacity: 0.8,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
    zIndex: 1,
  },
});

export default Categories;
