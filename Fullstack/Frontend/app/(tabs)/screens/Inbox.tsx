// Inbox.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StyleSheet,
  Dimensions,
  Image,
  Platform,
  StatusBar
} from 'react-native';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

interface Message {
  id: string;
  sender: string;
  content: string;
}

type Messages = {
  [key: string]: Message[];
};

const Inbox = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<Messages>({
    Alice: [
      { id: '1', sender: 'Alice', content: 'Hey! How are you?' },
      { id: '2', sender: 'You', content: "I'm good, thanks!" },
    ],
    Bob: [
      { id: '1', sender: 'Bob', content: 'Meeting at 3pm today.' },
      { id: '2', sender: 'You', content: 'Got it!' },
    ],
  });

  const [newMessage, setNewMessage] = useState('');
  const [selectedContact, setSelectedContact] = useState('Alice');

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
      setNewMessage('');
    }
  };

  const HEADER_HEIGHT = 80; // Adjust depending on your design
  const HEADER_OFFSET = 
    (Platform.OS === 'ios' ? StatusBar.currentHeight || 44 : StatusBar.currentHeight || 0) 
    + HEADER_HEIGHT;

  return (
    <View style={styles.container}>

      {/* Fixed Header */}
      <View 
        style={[
          styles.topBar, 
          { 
            position: 'absolute', 
            top: Platform.OS === 'ios' ? StatusBar.currentHeight || 44 : StatusBar.currentHeight || 0 
          }
        ]}
      >
        <TouchableOpacity>
        </TouchableOpacity>

        <View style={styles.logoContainer}>
          <Image source={require('../../../assets/images/OmniGymLogo.png')} style={styles.logo} />
        </View>

        <TouchableOpacity style={styles.sideIcon} onPress={() => router.replace('/(tabs)/Login')}>
          <Text style={styles.logout}>LOGOUT</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={[styles.mainContent, { marginTop: HEADER_OFFSET }]}>
        <View style={styles.contactsContainer}>
          <FlatList
            data={Object.keys(messages)}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.contactItem} onPress={() => setSelectedContact(item)}>
                <Text style={styles.contactName}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>

        <View style={styles.messagesContainer}>
          <Text style={styles.title}>{selectedContact}</Text>

          <ScrollView style={styles.messageList}>
            {messages[selectedContact].map((item: Message) => (
              <View key={item.id} style={styles.message}>
                <Text style={styles.sender}>{item.sender}:</Text>
                <Text>{item.content}</Text>
              </View>
            ))}
          </ScrollView>

          <TextInput
            style={styles.input}
            placeholder="Type a message"
            value={newMessage}
            onChangeText={setNewMessage}
          />

          <TouchableOpacity style={styles.button} onPress={sendMessage}>
            <Text style={styles.buttonText}>Send Message</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  topBar: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 28.25,
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
    borderBottomWidth: 7,
    borderBottomColor: '#E97451',
    elevation: 5,
  },

  logoContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: -1,
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginBottom: 7
  },

  sideIcon: {
    zIndex: 1,
  },
  logout: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
    bottom: -18.5,
  },

  mainContent: {
    flexDirection: 'row',
    flex: 1,
  },

  contactsContainer: {
    width: '30%',
    backgroundColor: '#f5f5f5',
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
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#ff7f50',
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
    backgroundColor: '#333',
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

//#codebase