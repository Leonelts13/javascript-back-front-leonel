import React, { useRef, useState } from 'react'
import { FlatList, StatusBar } from 'react-native'
import { View, Text, StyleSheet, TouchableOpacity, Modal, ImageBackground } from 'react-native'
//import { useCompletion } from '../hooks/useCompletion'
import { useCompletion } from '../hooks/useCompletation.js'
import MessageInput from './MessageInput'
import Icon from 'react-native-vector-icons/FontAwesome'
import Item from './Item'


const trashIcon = <Icon name='trash' size={20} color="red" />


const Chat = () => {
  const flatList = useRef(null)
  const { listMessage, clearList, prompt, setPrompt, onSubmit } = useCompletion()


  const handleSelect = (value) => {
    setSelectedValue(value);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../../assets/fondo.jpg')} resizeMode="cover" style={styles.imagenFondo}>
        <Text style={styles.title}>Conversación</Text>

        {
          listMessage.length === 0
          &&
          <View style={styles.titleVoid}>
            <Text style={styles.message}>¡Hola! Soy un bot que te ayudará a responder tus preguntas</Text>
            <Text style={{ fontSize: 50 }}>{"🦉"}</Text>
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
        <MessageInput prompt={prompt} setPrompt={setPrompt} onSubmit={onSubmit} type="default" />
      </ImageBackground>
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
  imagenFondo: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
},
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    margin: 20,
    color: 'white',
  },
  titleVoid: {
    margin: 20,
    textAlign: 'center',
    color: 'gray',
    width: '85%',
    height: 140,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'red',
    borderWidth: 1,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    paddingVertical: 8, // Reducido el padding vertical
    paddingHorizontal: 16, // Reducido el padding horizontal
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '90%', // Reducido el ancho del botón
    marginBottom: 10,
    borderRadius: 25, // Redondeado los bordes
    backgroundColor: 'white',

  },
  buttonText: {
    fontSize: 14, // Reducido el tamaño del texto del botón
    color: 'black',
    textAlign: 'center',
  },
  iconContainer: {
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15, // Reducido el padding
    width: '80%',
    maxHeight: '60%', // Reducido el tamaño máximo
    borderRadius: 30,
  },
  option: {
    paddingVertical: 14, // Aumentado el padding vertical para agregar espacio
    //paddingHorizontal: 16, // Añadido padding horizontal para espaciado lateral
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  optionText: {
    fontSize: 14,
    color: 'black',
    textAlign: 'center',
  },
});
