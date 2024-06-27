import React, { Component } from 'react';
import { View, Text, ScrollView,TouchableOpacity, ActivityIndicator,Linking, Image } from 'react-native';
import Header from '../Header';
import styles from '../styles'; // Import the styles

class MelanomaComponent extends Component {
  constructor(props) {
    super(props);
    const { preferredLanguage } = props.route.params;
    this.state = {
      MelanomaComponent: [],
      translatedMelanomaComponent: [],
      selectedLanguage: preferredLanguage || 'en',
      loading: false,
      error: null,
    };

    // Images for the first three subtitles
    this.subtitleImages = [
      require('./banners/mem1.png'),
      require('./banners/mem2.png'),
      require('./banners/mem22.png'),
      require('./banners/mem33.png'),
      // require('./banners/mem44.png'),
      require('./banners/A.jpeg'),
      require('./banners/B.jpeg'),
      require('./banners/C.jpeg'),
      require('./banners/D.jpeg'),
      require('./banners/E.jpeg'),
      require('./banners/A.jpeg'),
    ];
  }

  componentDidMount() {
    this.fetchMelanomaComponent();
  }

  fetchMelanomaComponent = () => {
    this.setState({ loading: true });
    fetch('http://10.0.2.2/mem', {
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
          MelanomaComponent: responseJson.tips,
          translatedMelanomaComponent: responseJson.tips,
        }, () => {
          if (this.state.selectedLanguage !== 'en') {
            this.fetchTranslatedData(this.state.MelanomaComponent, 'skincare');
          } else {
            this.setState({ loading: false });
          }
        });
      })
      .catch((error) => {
        this.setState({ error: error.message, loading: false });
      });
  };

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
          this.setState({ translatedMelanomaComponent: translatedData.translated_text, loading: false });
        }
      })
      .catch((error) => {
        this.setState({ error: error.message, loading: false });
      });
  };

  renderContent = (contentArray) => {
    const content = [];
    let currentSubtitle = null;
    let currentContent = [];
    let imageIndex = 0;

    contentArray.forEach((item) => {
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
      } else if (item.startsWith('>>')) {
        content.push(
          <View key={item} style={styles.halfContentBlock}>
            <View style={styles.leftContent}>
              <Text style={styles.halfContentText}>{item.substring(2)}</Text>
            </View>
            {imageIndex < this.subtitleImages.length && (
              <View style={styles.rightContent}>
                <Image
                  style={styles.halfContentImage}
                  source={this.subtitleImages[imageIndex++]}
                />
              </View>
            )}
          </View>
        );
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
        <TouchableOpacity onPress={() => Linking.openURL('https://www.mayoclinic.org/diseases-conditions/melanoma/symptoms-causes/syc-20374884#:~:text=deeper%20skin%20layers.-,Melanoma%20is%20a%20kind%20of%20skin%20cancer%20that%20starts%20in,%2C%20back%2C%20face%20and%20legs')}>
          <Text style={styles.link}> &#8226; https://www.mayoclinic.org/diseases-conditions/melanoma/symptoms-causes/syc-20374884#:~:text=deeper%20skin%20layers.-,Melanoma%20is%20a%20kind%20of%20skin%20cancer%20that%20starts%20in,%2C%20back%2C%20face%20and%20legs</Text>
        </TouchableOpacity>
      </View>
    );

    return content;
  };

  render() {
    const { translatedMelanomaComponent, loading, error } = this.state;
    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.scrollContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#94499c" />
          ) : (
            <ScrollView contentContainerStyle={styles.scrollView}>
              {this.renderContent(translatedMelanomaComponent)}
            </ScrollView>
          )}
          {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
      </View>
    );
  }
}

export default MelanomaComponent;
