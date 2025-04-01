import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';

// Define types for message structure and the message state
interface Message {
  id: string;
  sender: string;
  content: string;
}

type Messages = {
  [key: string]: Message[]; // Index signature to allow any string key (contact names)
};

const Inbox = () => {
  const [messages, setMessages] = useState<Messages>({
    Alice: [
      { id: '1', sender: 'Alice', content: 'Hey! How are you?' },
      { id: '2', sender: 'You', content: 'I\'m good, thanks!' },
    ],
    Bob: [
      { id: '1', sender: 'Bob', content: 'Meeting at 3pm today.' },
      { id: '2', sender: 'You', content: 'Got it!' },
    ],
  });
  const [newMessage, setNewMessage] = useState('');
  const [selectedContact, setSelectedContact] = useState('Alice');

  // Function to handle sending a message
  const sendMessage = () => {
    if (newMessage.trim()) {
      const newMsg: Message = {
        id: (messages[selectedContact].length + 1).toString(),
        sender: 'You',
        content: newMessage,
      };
      setMessages((prevMessages) => ({
        ...prevMessages,
        [selectedContact]: [...prevMessages[selectedContact], newMsg],
      }));
      setNewMessage(''); // Clear input after sending
    }
  };

  return (
    <View style={styles.container}>
      {/* Left Section: Contacts */}
      <View style={styles.contactsContainer}>
        <FlatList
          data={Object.keys(messages)}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.contactItem}
              onPress={() => setSelectedContact(item)}
            >
              <Text style={styles.contactName}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Right Section: Messages */}
      <View style={styles.messagesContainer}>
        <Text style={styles.title}>{selectedContact}</Text>

        {/* Display messages */}
        <ScrollView style={styles.messageList}>
          {messages[selectedContact].map((item: Message) => (
            <View key={item.id} style={styles.message}>
              <Text style={styles.sender}>{item.sender}:</Text>
              <Text>{item.content}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Text Input for new message */}
        <TextInput
          style={styles.input}
          placeholder="Type a message"
          value={newMessage}
          onChangeText={setNewMessage}
        />

        {/* Send Button */}
        <TouchableOpacity style={styles.button} onPress={sendMessage}>
          <Text style={styles.buttonText}>Send Message</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
  },
  contactsContainer: {
    width: '30%',
    backgroundColor: '#f5f5f5', // Updated background color
    padding: 10,
  },
  contactItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  contactName: {
    fontSize: 18,
    color: '#333',
  },
  messagesContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff', // Light background for message area
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#ff7f50', // Consistent title color
  },
  messageList: {
    flex: 1,
    marginBottom: 20,
  },
  message: {
    backgroundColor: '#e1e1e1',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  sender: {
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#333', // Dark button color for consistency
    padding: 12,
    marginVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default Inbox;