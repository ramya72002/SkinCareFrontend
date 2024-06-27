import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Header from '../Header';

const Weather = () => {
  const [selectedState, setSelectedState] = useState('');
  const [city, setCity] = useState('');
  const [cities, setCities] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [uvIndex, setUvIndex] = useState([]);
  const [wind, setWind] = useState([]);

  useEffect(() => {
    if (selectedState) {
      fetchCities();
    }
  }, [selectedState]);

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
    const requestBody = JSON.stringify({ state: selectedState, city });

    try {
      const [weatherResponse, uvIndexResponse, windResponse] = await Promise.all([
        fetch('http://10.0.2.2/weather', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: requestBody,
        }),
        fetch('http://10.0.2.2/uvindex', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: requestBody,
        }),
        fetch('http://10.0.2.2/wind', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: requestBody,
        }),
      ]);

      const weatherData = await weatherResponse.json();
      const uvIndexData = await uvIndexResponse.json();
      const windData = await windResponse.json();

      setWeatherData(weatherData.slice(0, 2));
      setUvIndex(uvIndexData.slice(0, 2));
      setWind(windData.slice(0, 3));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    
    <View style={styles.container}>
           
       {/* Picker for selecting state */}
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
        <Picker.Item label="TamilNadu" value="Tamil Nadu" />
        <Picker.Item label="Telangana" value="Telangana" />
        <Picker.Item label="Tripura" value="Tripura" />
        <Picker.Item label="Uttar Pradesh" value="UttarPradesh" />
        <Picker.Item label="Uttarakhand" value="Uttarakhand" />
        <Picker.Item label="West Bengal" value="WestBengal" />
      </Picker>
      
      {/* Picker for selecting city */}
      <Picker
        selectedValue={city}
        onValueChange={(itemValue) => setCity(itemValue)}
        style={styles.input}
        enabled={cities.length > 0}  // Enable only if cities are available
      >
        <Picker.Item label="Select City" value="" />
        {cities.map((cityName, index) => (
          <Picker.Item key={index} label={cityName} value={cityName} />
        ))}
      </Picker>

      {/* Button to fetch data */}
      <Button title="Fetch Data" onPress={fetchData} />
      
      {/* Weather Report */}
      <Text style={styles.title}>Weather Report</Text>
      <View style={styles.table}>
        {weatherData.map((row, index) => (
          <View key={index} style={styles.row}>
            {row.map((cell, cellIndex) => (
              <Text key={cellIndex} style={styles.cell}>{cell}</Text>
            ))}
          </View>
        ))}
      </View>

      {/* UV Index Report */}
      <Text style={styles.title}>UV Index Report</Text>
      <View style={styles.table}>
        {uvIndex.map((row, index) => (
          <View key={index} style={styles.row}>
            {row.map((cell, cellIndex) => (
              <Text key={cellIndex} style={styles.cell}>{cell}</Text>
            ))}
          </View>
        ))}
      </View>

      {/* Wind Direction Report */}
      <Text style={styles.title}>Wind Direction Report</Text>
      <View style={styles.table}>
        {wind.map((row, index) => (
          <View key={index} style={styles.row}>
            {row.map((cell, cellIndex) => (
              <Text key={cellIndex} style={styles.cell}>{cell}</Text>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '80%',
  },
  table: {
    borderWidth: 1,
    borderColor: 'black',
    marginTop: 10,
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 10,
    width: '100%',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    padding: 10,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'black',
    fontWeight: 'bold',
    color: 'red',
  },
});

export default Weather;
