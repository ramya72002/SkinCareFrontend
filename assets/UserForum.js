import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../Header';

const UserForum = () => {
  const [topics, setTopics] = useState([
    {
      id: '1',
      title: 'Welcome to the User Forum!',
      content: 'Feel free to ask any questions or share your experiences.',
      likes: 0,
      date: new Date().toLocaleString(),
    },
    // Add more predefined topics here if needed
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  const handlePostTopic = () => {
    if (newTitle && newContent) {
      const newTopic = {
        id: (topics.length + 1).toString(),
        title: newTitle,
        content: newContent,
        likes: 0,
        date: new Date().toLocaleString(),
      };
      setTopics([...topics, newTopic]);
      setNewTitle('');
      setNewContent('');
    }
  };

  const handleLike = (id) => {
    setTopics(
      topics.map((topic) =>
        topic.id === id ? { ...topic, likes: topic.likes + 1 } : topic
      )
    );
  };

  const renderItem = ({ item }) => (
    <View>
    <View style={styles.topic}>
      
      <View style={styles.topicHeader}>
        <Text style={styles.topicTitle}>{item.title}</Text>
        <Text style={styles.topicDate}>{item.date}</Text>
      </View>
      <Text style={styles.topicContent}>{item.content}</Text>
      <View style={styles.topicFooter}>
        <TouchableOpacity onPress={() => handleLike(item.id)} style={styles.likeButton}>
          <Ionicons name="thumbs-up-outline" size={20} color="blue" />
          <Text style={styles.likeText}>{item.likes}</Text>
        </TouchableOpacity>
      </View>
    </View>
    </View>
  );

  return (
    <View style={styles.container}>
           <Header />

      <Text style={styles.header}>User Forum</Text>
      <FlatList
        data={topics}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Topic Title"
          value={newTitle}
          onChangeText={setNewTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="Topic Content"
          value={newContent}
          onChangeText={setNewContent}
          multiline
        />
        <Button title="Post Topic" onPress={handlePostTopic} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f8ff',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  list: {
    marginBottom: 20,
  },
  topic: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  topicHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  topicTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  topicDate: {
    fontSize: 12,
    color: '#888',
  },
  topicContent: {
    fontSize: 16,
    marginBottom: 10,
  },
  topicFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeText: {
    marginLeft: 5,
    color: 'blue',
  },
  form: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
    backgroundColor: '#f9f9f9',
  },
});

export default UserForum;
