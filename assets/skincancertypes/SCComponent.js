import React, { Component } from 'react';
import { View, Text, ScrollView, ActivityIndicator, Image, TouchableOpacity, Linking } from 'react-native';
import Header from '../Header';
import styles from '../styles'; // Import the styles

class SCComponent extends Component {
  constructor(props) {
    super(props);
    const { preferredLanguage } = props.route.params;
    this.state = {
      SCComponent: [],
      translatedSCComponent: [],
      selectedLanguage: preferredLanguage || 'en',
      loading: false,
      error: null,
    };

    // Images for the first three subtitles
    this.subtitleImages = [
      require('./banners/SCC.png'),
      require('./banners/ss22.png'),
    ];
  }

  componentDidMount() {
    this.fetchSCComponent();
  }

  // Fetch data from server
  fetchSCComponent = () => {
    this.setState({ loading: true });
    fetch('http://10.0.2.2/scc', {
      method: 'GET',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json();
      })
      .then((responseJson) => {
        this.setState({
          SCComponent: responseJson.tips,
          translatedSCComponent: responseJson.tips,
        }, () => {
          if (this.state.selectedLanguage !== 'en') {
            this.fetchTranslatedData(this.state.SCComponent, 'skincare');
          } else {
            this.setState({ loading: false });
          }
        });
      })
      .catch((error) => {
        this.setState({ error: error.message, loading: false });
      });
  };

  // Fetch translated data
  fetchTranslatedData = (data, type) => {
    if (!data.length) return;

    const formattedData = data.map((item) => item.replace(/\n/g, ' '));

    const requestBody = {
      content: formattedData,
      language: this.state.selectedLanguage,
    };

    fetch('http://10.0.2.2:80/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        return response.json().then((data) => {
          if (!response.ok) {
            throw new Error(`Server error: ${response.statusText}`);
          }
          return data;
        });
      })
      .then((translatedData) => {
        if (type === 'skincare') {
          this.setState({ translatedSCComponent: translatedData.translated_text, loading: false });
        }
      })
      .catch((error) => {
        this.setState({ error: error.message, loading: false });
      });
  };

  // Render content based on fetched data
  renderContent = (contentArray) => {
    const content = [];
    let currentSubtitle = null;
    let currentContent = [];
    let imageIndex = 0;

    contentArray.forEach((item, idx) => {
      if (item.startsWith('■')) {
        if (currentSubtitle) {
          content.push(
            <View key={currentSubtitle} style={styles.contentBlock}>
              <Text style={styles.subtitle}>{currentSubtitle}</Text>
              {imageIndex < this.subtitleImages.length && (
                <Image
                  style={styles.subtitleImage}
                  source={this.subtitleImages[imageIndex++]}
                />
              )}
              {currentContent.map((point, index) => (
                <View key={index} style={styles.bullet}>
                  <Text style={styles.bulletText}>{'\u2022'}</Text>
                  <Text style={styles.bulletText}>{point}</Text>
                </View>
              ))}
            </View>
          );
        }
        content.push(<Text key={item} style={styles.title}>{item.substring(2)}</Text>);
        currentSubtitle = null;
        currentContent = [];
      } else if (item.startsWith('●')) {
        if (currentSubtitle) {
          content.push(
            <View key={currentSubtitle} style={styles.contentBlock}>
              <Text style={styles.subtitle}>{currentSubtitle}</Text>
              {imageIndex < this.subtitleImages.length && (
                <Image
                  style={styles.subtitleImage}
                  source={this.subtitleImages[imageIndex++]}
                />
              )}
              {currentContent.map((point, index) => (
                <View key={index} style={styles.bullet}>
                  <Text style={styles.bulletText}>{'\u2022'}</Text>
                  <Text style={styles.bulletText}>{point}</Text>
                </View>
              ))}
            </View>
          );
        }
        currentSubtitle = item.substring(2);
        currentContent = [];
      } else if (item.startsWith('->')) {
        currentContent.push(item.substring(2));
      }
    });

    if (currentSubtitle) {
      content.push(
        <View key={currentSubtitle} style={styles.contentBlock}>
          <Text style={styles.subtitle}>{currentSubtitle}</Text>
          {imageIndex < this.subtitleImages.length && (
            <Image
              style={styles.subtitleImage}
              source={this.subtitleImages[imageIndex++]}
            />
          )}
          {currentContent.map((point, index) => (
            <View key={index} style={styles.bullet}>
              <Text style={styles.bulletText}>{'\u2022'}</Text>
              <Text style={styles.bulletText}>{point}</Text>
            </View>
          ))}
        </View>
      );
    }

    // Add additional resource at the end
    content.push(
      <View key="additional-resource" style={styles.contentBlock}>
        <Text style={styles.subtitle}>Additional resources:</Text>
        <TouchableOpacity onPress={() => Linking.openURL('https://www.mayoclinic.org/diseases-conditions/squamous-cell-carcinoma/symptoms-causes/syc-20352480')}>
          <Text style={styles.link}> &#8226; https://www.mayoclinic.org/diseases-conditions/squamous-cell-carcinoma/symptoms-causes/syc-20352480</Text>
        </TouchableOpacity>
      </View>
    );
    return content;
  };

  render() {
    const { translatedSCComponent, loading, error } = this.state;
    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.scrollContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#94499c" />
          ) : (
            <ScrollView contentContainerStyle={styles.scrollView}>
              {this.renderContent(translatedSCComponent)}
            </ScrollView>
          )}
          {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
      </View>
    );
  }
}

export default SCComponent;
