import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, Image, ActivityIndicator, TouchableOpacity, Linking } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import Header from '../Header';
import { Ionicons } from '@expo/vector-icons'; // Assuming you use Expo for icons

const FindDermatologist = () => {
  const navigation = useNavigation();
  const [selectedState, setSelectedState] = useState('');
  const [city, setCity] = useState('');
  const [cities, setCities] = useState([]);
  const [FindDermatologistData, setFindDermatologistData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [showBanner, setShowBanner] = useState(true); // State to control banner visibility

  const bannerImages = [
    require('./dermaBanner/derma.png'),
    require('./dermaBanner/derma1.png'),
    require('./dermaBanner/derma2.png'),
    require('./dermaBanner/derma3.png'),
  ];

  useEffect(() => {
    if (selectedState) {
      fetchCities();
    }
  }, [selectedState]);

  useEffect(() => {
    startBannerSlideshow();
    return () => {
      clearInterval(this.bannerInterval);
    };
  }, []);

  const startBannerSlideshow = () => {
    const bannerInterval = setInterval(() => {
      setCurrentBannerIndex(prevIndex => (prevIndex + 1) % bannerImages.length);
    }, 3000);
    return bannerInterval;
  };

  const fetchCities = async () => {
    const requestBody = JSON.stringify({ state: selectedState });
    try {
      const response = await fetch('http://10.0.2.2/cities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: requestBody,
      });

      if (response.ok) {
        const data = await response.json();
        setCities(data.cities);
      } else {
        console.error('Failed to fetch cities');
      }
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    const requestBody = JSON.stringify({ state: selectedState, city });

    try {
      const response = await fetch('http://10.0.2.2/Doctordetails1', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: requestBody,
      });

      if (response.ok) {
        const responseData = await response.json();
        const FindDermatologistData = responseData.true;
        setFindDermatologistData(FindDermatologistData);
        setLoading(false);
        setShowBanner(false); // Hide banner on data fetch
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      
      {showBanner && (
        <Image
          style={styles.banner}
          source={bannerImages[currentBannerIndex]}
          resizeMode="cover"
        />
      )}
      
      <Text style={styles.mainHeading}>Find Dermatologist In Single Click</Text>
      
      <Picker
        selectedValue={selectedState}
        onValueChange={(itemValue) => setSelectedState(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Select State" value="" />
        <Picker.Item label="Andhra Pradesh" value="AndhraPradesh" />
        <Picker.Item label="Arunachal Pradesh" value="ArunachalPradesh" />
        <Picker.Item label="Assam" value="Assam" />
        <Picker.Item label="Bihar" value="Bihar" />
        <Picker.Item label="Chhattisgarh" value="Chhattisgarh" />
        <Picker.Item label="Goa" value="Goa" />
        <Picker.Item label="Gujarat" value="Gujarat" />
        <Picker.Item label="Haryana" value="Haryana" />
        <Picker.Item label="Himachal Pradesh" value="HimachalPradesh" />
        <Picker.Item label="Jharkhand" value="Jharkhand" />
        <Picker.Item label="Karnataka" value="Karnataka" />
        <Picker.Item label="Kerala" value="Kerala" />
        <Picker.Item label="Madhya Pradesh" value="MadhyaPradesh" />
        <Picker.Item label="Maharashtra" value="Maharashtra" />
        <Picker.Item label="Manipur" value="Manipur" />
        <Picker.Item label="Meghalaya" value="Meghalaya" />
        <Picker.Item label="Mizoram" value="Mizoram" />
        <Picker.Item label="Nagaland" value="Nagaland" />
        <Picker.Item label="Odisha" value="Odisha" />
        <Picker.Item label="Punjab" value="Punjab" />
        <Picker.Item label="Rajasthan" value="Rajasthan" />
        <Picker.Item label="Sikkim" value="Sikkim" />
        <Picker.Item label="Tamil Nadu" value="Tamil Nadu" />
        <Picker.Item label="Telangana" value="Telangana" />
        <Picker.Item label="Tripura" value="Tripura" />
        <Picker.Item label="Uttar Pradesh" value="UttarPradesh" />
        <Picker.Item label="Uttarakhand" value="Uttarakhand" />
        <Picker.Item label="West Bengal" value="WestBengal" />
      </Picker>
      
      <Picker
        selectedValue={city}
        onValueChange={(itemValue) => setCity(itemValue)}
        style={styles.input}
        enabled={cities.length > 0}
      >
        <Picker.Item label="Select City" value="" />
        {cities.map((cityName, index) => (
          <Picker.Item key={index} label={cityName} value={cityName} />
        ))}
      </Picker>
      
      <Button
        title="Find Nearby Dermatologist"
        onPress={fetchData}
        disabled={!selectedState || !city || loading}
      />
      
      <ScrollView style={styles.scrollContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#94499c" style={styles.loader} />
        ) : (
          FindDermatologistData.map((item, index) => (
            <View key={index} style={styles.itemContainer}>
              <Text style={styles.itemText}>Name: {item.name}</Text>
              <Text style={styles.itemText}>Address: {item.address}</Text>
              <Text style={styles.itemText}>City: {item.city}</Text>
              <TouchableOpacity onPress={() => Linking.openURL(`tel:${item.phone}`)}>
                <Text style={[styles.itemText, styles.phoneLink]}>Phone: {item.phone}</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
        {error && <Text style={styles.errorText}>{error}</Text>}
      </ScrollView>

      {/* Footer navigation */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('Categories')}>
          <Ionicons name="home" size={24} color="white" />
          <Text style={styles.tabText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('UserForum')}>
          <Ionicons name="people-outline" size={24} color="white" />
          <Text style={styles.tabText}>User Forum</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('Profile')}>
        <Ionicons name="person" size={24} color="white" />
        <Text style={styles.tabText}>Profile</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  banner: {
    width: '100%',
    height: '30%',
    borderRadius: 10,
    marginBottom: 20,
  },
  mainHeading: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#94499c',
  },
  input: {
    width: '80%',
    marginBottom: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 15,
    paddingHorizontal: 10,
  },
  loader: {
    marginTop: 20,
  },
  scrollContainer: {
    width: '100%',
    marginTop: 50,
  },
  itemContainer: {
    backgroundColor: '#94499c',
    color:"white",
    padding: 15,
    marginBottom: 10,
    marginLeft:10,
    marginRight:10,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 10, height: 2 },
  },
  itemText: {
    fontSize: 15,
    marginBottom: 5,
    color:"white",
  },
  phoneLink: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#94499c',
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  tabText: {
    color: 'white',
    marginTop: 5,
  },
});

export default FindDermatologist;
