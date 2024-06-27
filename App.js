import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from './assets/Login';
import Signup from './assets/Signup';
import Categories from './assets/Categories';
import Weather from './assets/Weather';
import FindDermatologist from './assets/FindDermatologist';
import CustomFooter from './CustomFooter';
import SkinCancerTypes from './assets/skincancertypes/SkinCancerTypes';
import HomepageText from './assets/HomepageText';
import BCComponent from './assets/skincancertypes/BCComponent';
import BccTabel from './assets/skincancertypes/BccTabel';
import SCComponent from './assets/skincancertypes/SCComponent';
import MelanomaComponent from './assets/skincancertypes/MelanomaComponent';
import SkinCancerPrevention from './assets/skincancerprevention/SkinCancerPrevention';
import SunSafety from './assets/skincancerprevention/SunSafety';
import TraditionalClothing from './assets/skincancerprevention/TraditionalClothing';
import UVindex from './assets/skincancerprevention/UVindex';
import UVTable from './assets/skincancerprevention/UVTable';
import SefDermatology from './assets/SefDermatology/SefDermatology';
import Infectious from './assets/SefDermatology/Infectious';
import Inflaauto from './assets/SefDermatology/Inflaauto';
import Hair from './assets/SefDermatology/Hair';
import Envdisorder from './assets/SefDermatology/Envdisorder';
import Additional from './assets/SefDermatology/Additional';
import Pigmentary from './assets/SefDermatology/Pigmentary';
import UserForum from './assets/UserForum';
import Profile from './assets/Profile';
import ProfileHeader from './assets/ProfileHeader.';

const Stack = createNativeStackNavigator();

const App = () => {
  const [currentRoute, setCurrentRoute] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const loginDataString = await AsyncStorage.getItem('loginData');

      if (loginDataString === "null" || !loginDataString) {
        console.log('Login data is null or not found:', loginDataString);
        setCurrentRoute('Login');
      } else {
        const loginData = JSON.parse(loginDataString);

        if (loginData && loginData.email && loginData.contactNumber) {
          console.log('Login data found:', loginData);
          setCurrentRoute('Categories');
        } else {
          console.log('Invalid login data:', loginDataString);
          setCurrentRoute('Login');
        }
      }
    } catch (error) {
      console.error('Error checking login status:', error);
      setCurrentRoute('Login');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    // Render a loading screen or spinner
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer
      onStateChange={(state) => {
        const route = state.routes[state.index];
        setCurrentRoute(route.name);
      }}
    >
      <View style={styles.container}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={currentRoute}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="HomepageText" component={HomepageText} />

          <Stack.Screen name="Categories" component={Categories} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="ProfileHeader" component={ProfileHeader} />

          <Stack.Screen name="Weather" component={Weather} />
          <Stack.Screen name="FindDermatologist" component={FindDermatologist} />
          <Stack.Screen name="UserForum" component={UserForum} />
          <Stack.Screen name="SkinCancerTypes" component={SkinCancerTypes} />
          <Stack.Screen name="BCComponent" component={BCComponent} />
          <Stack.Screen name="BccTabel" component={BccTabel} />
          <Stack.Screen name="SCComponent" component={SCComponent} />
          <Stack.Screen name="MelanomaComponent" component={MelanomaComponent} />
          <Stack.Screen name="SkinCancerPrevention" component={SkinCancerPrevention} />
          <Stack.Screen name="UVTable" component={UVTable} />
          <Stack.Screen name="UVindex" component={UVindex} />
          <Stack.Screen name="TraditionalClothing" component={TraditionalClothing} />
          <Stack.Screen name="SunSafety" component={SunSafety} />
          <Stack.Screen name="SefDermatology" component={SefDermatology} />
          <Stack.Screen name="Infectious" component={Infectious} />
          <Stack.Screen name="Inflaauto" component={Inflaauto} />
          <Stack.Screen name="Hair" component={Hair} />
          <Stack.Screen name="Pigmentary" component={Pigmentary} />
          <Stack.Screen name="Envdisorder" component={Envdisorder} />
          <Stack.Screen name="Additional" component={Additional} />
        </Stack.Navigator>
        {(['Categories','Profile', 'Weather', 'BCComponent', 'SCComponent', 'MelanomaComponent', 'SkinCancerTypes'].includes(currentRoute)) && <CustomFooter />}
      </View>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
