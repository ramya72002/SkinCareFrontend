import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, ImageBackground } from 'react-native';

class HomepageText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    // Simulate a loading delay
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }

    return (
      <ScrollView>
                <ImageBackground source={require('./categoryImages/bghome3.jpg')} style={styles.background}>

           <View style={styles.container}>
            <View style={styles.box}>
              <Text style={styles.header}>Welcome to Sun Safety and Skin Health Awareness App</Text>
              <Text style={styles.paragraph}>
                We are dedicated to enhancing skin health awareness and providing essential resources for improving access to dermatological care across India. 
                Our mission is to promote sun safety and skin cancer awareness tailored to the diverse population of India.
              </Text>
            </View>
            
            <View style={styles.box}>
              <Text style={styles.subHeader}>Why is Skin Health Important?</Text>
              <Text style={styles.paragraph}>
                Skin cancer is a growing concern worldwide, and India is no exception. With our app, you can learn about different types of skin cancer, their risk factors, and how to prevent them. 
                We also provide information on other common skin conditions influenced by India's unique climatic and socioeconomic factors.
              </Text>
            </View>

            <View style={styles.box}>
              <Text style={styles.subHeader}>Explore Our Features</Text>
              <Text style={styles.listItem}>• Detailed information on various types of skin cancer including Basal Cell Carcinoma, Squamous Cell Carcinoma, and Malignant Melanoma.</Text>
              <Text style={styles.listItem}>• Sun safety practices tailored to traditional Indian clothing.</Text>
              <Text style={styles.listItem}>• Early detection tips using the ABCDE method for melanoma.</Text>
              <Text style={styles.listItem}>• Resources for other common dermatologic conditions.</Text>
            </View>
            
            <View style={styles.box}>
              <Text style={styles.paragraph}>
                Together, let's take a proactive approach to skin health. Start exploring the app to learn more and take control of your skin health today!
              </Text>
            </View>
           
                        {/* Login Button */}
                        <TouchableOpacity
              style={styles.loginButton}
              onPress={() => this.props.navigation.navigate('Login')}
            >
              <Text style={styles.loginButtonText}>Go to Login</Text>
            </TouchableOpacity>

          
            </View>
            </ImageBackground>
       </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  container: {
    padding: 10,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    backgroundColor: 'rgba(148, 73, 156, 0.8)',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 20,
    lineHeight: 24,
    color: 'white',
    marginBottom: 10,
  },
  listItem: {
    fontSize: 20,
    lineHeight: 24,
    color: 'white',
    marginBottom: 5,
    marginLeft: 10,
  },
  loginButton: {
    backgroundColor: '#94499c',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
 
});

export default HomepageText;
