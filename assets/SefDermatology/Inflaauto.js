import React, { Component } from 'react';
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity, Image, Linking } from 'react-native';
import Header from '../Header';
import styles from '../styles'; // Import the styles

class Inflaauto extends Component {
  constructor(props) {
    super(props);
    const { preferredLanguage } = props.route.params;
    this.state = {
      inflaauto: [],
      translatedinflaauto: [],
      selectedLanguage: preferredLanguage || 'en',
      loading: false,
      error: null,
    };

    // Images for the first three subtitles (assuming these are used in the component)
    this.subtitleImages = [
      require('./banners/inflauto/image1.png'),
      require('./banners/inflauto/image4.png'),
      require('./banners/inflauto/image7.png'),
      require('./banners/inflauto/image10.png'),
      require('./banners/inflauto/image13.png'),
      require('./banners/inflauto/image16.png'),
    ];
  }

  componentDidMount() {
    this.fetchInflaauto();
  }

  // Fetch data from server
  fetchInflaauto = () => {
    this.setState({ loading: true });
    fetch('http://10.0.2.2/inflaauto', {
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
          inflaauto: responseJson.tips,
          translatedinflaauto: responseJson.tips,
        }, () => {
          if (this.state.selectedLanguage !== 'en') {
            this.fetchTranslatedData(this.state.inflaauto, 'skincare');
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
      }).then((translatedData) => {
        if (type === 'skincare') {
          this.setState({ translatedinflaauto: translatedData.translated_text, loading: false });
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

    contentArray.forEach((item) => {
      if (item.startsWith('■')) {
        // Render previous section if exists
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
        // Push the new section title
        content.push(<Text key={item} style={styles.title}>{item.substring(2)}</Text>);
        // Reset current subtitle and content
        currentSubtitle = null;
        currentContent = [];
      } else if (item.startsWith('●')) {
        // Render previous section if exists
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
        // Set current subtitle
        currentSubtitle = item.substring(2);
        // Reset current content
        currentContent = [];
      } else if (item.startsWith('->')) {
         if (currentSubtitle) {
          currentContent.push(item.substring(2));
        } 
        else {
          // If there's no subtitle yet, treat it as regular content (or handle as needed)
          content.push(
            <View key={item} style={styles.contentBlock}>
              <Text style={styles.regularText}> * {item.substring(2)}</Text>
            </View>
          );
          
        }
      } else if (item.startsWith('>>')) {
        // Render the bold section title
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
        content.push(
          <Text key={item} style={styles.subtitleBold}>{item.substring(2)}</Text>
        );
        currentSubtitle = null;
        currentContent = [];
      }
    });

    // Render the last section if exists
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
        <TouchableOpacity onPress={() => Linking.openURL('https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10650048/')}>
          <Text style={styles.link}> &#8226; https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10650048/</Text>
        </TouchableOpacity>
      </View>
    );

    return content;
  };

  render() {
    const { translatedinflaauto, loading, error } = this.state;
    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.scrollContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#94499c" />
          ) : (
            <ScrollView contentContainerStyle={styles.scrollView}>
              {this.renderContent(translatedinflaauto)}
            </ScrollView>
          )}
          {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
      </View>
    );
  }
}

export default Inflaauto;
