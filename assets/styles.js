// styles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
  contentBlock: {
    marginBottom: 10,
  },
  halfContentBlock: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  leftContent: {
    flex: 1,
    paddingRight: 10,
  },
  rightContent: {
    width: 150, // Adjust width as needed
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    backgroundColor: '#94499c',
    color: 'white',
    textAlign: 'center',
    paddingVertical: 10,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 10,
    
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#e1e1e1',
    color: '#333',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderRadius: 10,
  },
  regularText: {
    fontSize: 16,
    lineHeight: 20,
    // paddingVertical: 20,
    color: '#333', // Example color
  },
  subtitleBold:{fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginBottom: 10,
    borderRadius: 10,},
  subtitleImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  bullet: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  bulletText: {
    fontSize: 15,
    color: '#555',
    marginRight: 10,
    
  },
  halfContentText: {
    fontSize: 15,
    color: '#555',
    
  },
  halfContentImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  
  table: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#e1e1e1',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  tableBody: {
    flexDirection: 'column',
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCell: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontSize: 15,
    color: '#555',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});

export default styles;