import React, { useRef } from 'react'
import { FlatList, StatusBar } from 'react-native'
import { View, Text, StyleSheet } from 'react-native'
//import { useCompletion } from '../hooks/useCompletion'
import { useCompletion } from '../hooks/useCompletation.js'
import MessageInput from './MessageInput'
import Icon from 'react-native-vector-icons/FontAwesome'
import Item from './Item'

const trashIcon = <Icon name='trash' size={20} color="red" />

const Chat = () => {
  const flatList = useRef(null)
  const { listMessage, clearList, prompt, setPrompt, onSubmit } = useCompletion()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Conversación</Text>
      {
        listMessage.length === 0
        &&
        <View style={styles.titleVoid}>
          <Text style={styles.message}>¡Hola! Soy un bot que te ayudará a responder tus preguntas. Escribe algo para comenzar.</Text>
          <Text style={{ fontSize: 50 }}>{"🐧"}</Text>
        </View>
      }
      <FlatList
        ref={flatList}
        data={listMessage}
        renderItem={({ item }) => <Item item={item} />}
        onContentSizeChange={() => listMessage.length > 0 && flatList.current.scrollToEnd({ animated: true })}
      />
      {
        listMessage.length > 0
        &&
        <Text onPress={clearList}>
          {trashIcon}
        </Text>
      }
      <MessageInput prompt={prompt} setPrompt={setPrompt} onSubmit={onSubmit} type="numeric" />
    </View>
  )
}

export default Chat

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: StatusBar.currentHeight || 0
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    margin: 20
  },
  titleVoid: {
    margin: 20,
    textAlign: 'center',
    color: 'gray',
    width: 370,
    height: 150,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
  }
})