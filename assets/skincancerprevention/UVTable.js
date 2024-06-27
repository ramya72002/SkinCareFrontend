import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';

const data = [
  {
    uvIndex: '1-2',
    exposureCategory: 'Low',
    protectionRecommendation: 'No protection required',
    safetyPrecautions: [
      '- Minimal protection needed',
      '- You can safely stay outside using minimal sun protection'
    ],
    backgroundColor: '#90EE90' // Light Green
  },
  {
    uvIndex: '3-5',
    exposureCategory: 'Moderate',
    protectionRecommendation: 'Protection recommended',
    safetyPrecautions: [
      '- Apply sunscreen with SPF 30 or higher → reapply every 2 hours',
      '- Wear protective clothing: long-sleeved shirt + pants, wide-brimmed hat, and sunglasses'
    ],
    backgroundColor: '#FFEB3B' // Light Yellow
  },
  {
    uvIndex: '6-7',
    exposureCategory: 'High',
    protectionRecommendation: 'Protection required',
    safetyPrecautions: [
      '- Apply sunscreen with SPF 30 or higher → reapply every 2 hours',
      '- Wear protective clothing',
      '- Seek shade during midday hours when the sun is strongest (10AM – 4PM)'
    ],
    backgroundColor: '#FFA500' // Orange
  },
  {
    uvIndex: '8-10',
    exposureCategory: 'Very High',
    protectionRecommendation: 'Extra protection required',
    safetyPrecautions: [
      '- Take extra precautions: apply sunscreen with SPF 30 or higher generously → reapply every 2 hours',
      '- Wear protective clothing',
      '- Avoid outdoor activities during midday hours (10AM – 4PM)'
    ],
    backgroundColor: '#FF6347' // Red
  },
  {
    uvIndex: '11+',
    exposureCategory: 'Extreme',
    protectionRecommendation: 'Extra protection required',
    safetyPrecautions: [
      '- Limit outdoor exposure: stay indoors or in the shade as much as possible',
      '- Use sunscreen with SPF 30 or higher → reapply every 2 hours',
      '- Wear protective clothing',
      '- Avoid outdoor activities during midday hours (10AM – 4PM)'
    ],
    backgroundColor: '#EE82EE' // Violet
  }
];

const UVTable = () => {
  const renderAdditionalResource = () => {
    return (
      <View style={styles.contentBlock}>
        <Text style={styles.subtitle}>Additional resources:</Text>
        <TouchableOpacity onPress={() => Linking.openURL('https://www.who.int/news-room/questions-and-answers/item/radiation-the-ultraviolet-(uv)-index')}>
          <Text style={styles.link}> &#8226; https://www.who.int/news-room/questions-and-answers/item/radiation-the-ultraviolet-(uv)-index</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerCell}>UV Index</Text>
        <Text style={styles.headerCell}>Exposure Category</Text>
        <Text style={styles.headerCell}>Protection Recommendation</Text>
        <Text style={styles.headerCell}>Safety Precautions</Text>
      </View>

      {data.map((item, index) => (
        <View key={index} style={[styles.row, { backgroundColor: item.backgroundColor }]}>
          <Text style={styles.cell}>{item.uvIndex}</Text>
          <Text style={styles.cell}>{item.exposureCategory}</Text>
          <Text style={styles.cell}>{item.protectionRecommendation}</Text>
          <View style={styles.safetyPrecautions}>
            {item.safetyPrecautions.map((precaution, idx) => (
              <Text key={idx}>{precaution}</Text>
            ))}
          </View>
        </View>
      ))}

      {renderAdditionalResource()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#d3d3d3', // Darker grey
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
  safetyPrecautions: {
    flex: 1,
  },
  contentBlock: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
  },
  subtitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
    fontSize: 14,
  },
});

export default UVTable;
