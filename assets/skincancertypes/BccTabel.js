import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';

const data = [
  {
    study: "Raina et al.",
    participants: "46 cases of BCC assessed in a hospital-based observational study which was carried out in the pathology and dermatology departments of a tertiary care center of Himachal Pradesh, India, from January 2012 to December 2017",
    age: "65.7±12.9 years",
    ratio: "1.9:1",
    site: "Head and neck (mostly nose)",
    type: "Solid"
  },
  {
    study: "Malhotra et al.",
    participants: "34 consecutive cases of clinically diagnosed BCC who attended a referral hospital in North India from January 2007 to December 2009",
    age: "40–60 years",
    ratio: "1.6:1",
    site: "Head and neck (mostly medial/ lateral canthus of eye)",
    type: "Solid-nodular"
  },
  {
    study: "Kumar et al.",
    participants: "36 patients with BCC assessed in a hospital based cross sectional study in Punjab, North India (2011–2013)",
    age: "60.9 years",
    ratio: "0.6:1",
    site: "Head and neck (mostly nose)",
    type: "Nodular"
  },
  {
    study: "George et al.",
    participants: "A retrospective study in 29 patients (with histopathologically confirmed BCC) who attended a referral hospital in the Indian state of Kerala from 2012 to October 2018",
    age: "64.2 years",
    ratio: "0.6:1",
    site: "Face (mostly nose)",
    type: "Superficial spreading variant"
  }
];

const BccTable = () => {
  const renderAdditionalResource = () => {
    return (
      <View style={styles.contentBlock}>
        <Text style={styles.subtitle}>Additional resources:</Text>
        <TouchableOpacity onPress={() => Linking.openURL('https://www.mayoclinic.org/diseases-conditions/basal-cell-carcinoma/symptoms-causes/syc-20354187')}>
          <Text style={styles.link}> &#8226;https://www.mayoclinic.org/diseases-conditions/basal-cell-carcinoma/symptoms-causes/syc-20354187</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollView style={styles.tableContainer}>
      <View style={styles.tableHeaderRow}>
        <Text style={[styles.tableHeader, { flex: 3 }]}>Study</Text>
        <Text style={[styles.tableHeader, { flex: 6 }]}>Study participants, study setting</Text>
        <Text style={[styles.tableHeader, { flex: 2 }]}>Mean age</Text>
        <Text style={[styles.tableHeader, { flex: 2 }]}>Male to female ratio</Text>
        <Text style={[styles.tableHeader, { flex: 3 }]}>Most common site affected</Text>
        <Text style={[styles.tableHeader, { flex: 3 }]}>Most common histological type</Text>
      </View>
      {data.map((item, index) => (
        <View key={index} style={styles.tableRow}>
          <Text style={[styles.tableCell, { flex: 3 }]}>{item.study}</Text>
          <Text style={[styles.tableCell, { flex: 6 }]}>{item.participants}</Text>
          <Text style={[styles.tableCell, { flex: 2 }]}>{item.age}</Text>
          <Text style={[styles.tableCell, { flex: 2 }]}>{item.ratio}</Text>
          <Text style={[styles.tableCell, { flex: 3 }]}>{item.site}</Text>
          <Text style={[styles.tableCell, { flex: 3 }]}>{item.type}</Text>
        </View>
      ))}
      {renderAdditionalResource()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  tableContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  tableHeaderRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 5,
  },
  tableHeader: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 5,
  },
  tableRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  tableCell: {
    fontSize: 14,
    paddingHorizontal: 5,
    textAlign: 'center',
    flexWrap: 'wrap',
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

export default BccTable;
