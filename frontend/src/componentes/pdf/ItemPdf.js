import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const ItemPdf = ({ item }) => {
  const { id, message, query } = item
  return (
    // TODO: Este bloque View es para los mensajes que envía el usuario
    <View key={id} style={styles.containerItem}>
      <View style={styles.containerPrompt}>
        {/* Mostramos la consulta del usuario */}
        <Text style={styles.text}>{query}</Text>
      </View>

      {/* Este bloque muestra los mensajes del chat */}
      <View style={styles.containerAvatar}>
        {/* Mostramos el icono del chatbot */}
        <View>
          <Text style={styles.avatar}>{"🤖"}</Text>
        </View>
        {/* Mostramos el mensaje */}
        <View style={styles.containerMessage}>
          <Text style={[styles.text, styles.messageText]}>
            {message}
            {"\n"}
          </Text>
        </View>
      </View>
    </View>
  )
}

export default ItemPdf;

const styles = StyleSheet.create({
  containerItem: {
    width: 380
  },
  containerPrompt: {
    backgroundColor: 'orange',
    maxWidth: '80%',
    borderRadius: 10,
    padding: 5,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginBottom: 10
  },
  containerAvatar: {
    flexDirection: 'row'
  },
  containerMessage: {
    flexDirection: 'row',
    backgroundColor: '#045C94',
    borderRadius: 10,
    padding: 5,
    maxWidth: '80%',
    alignSelf: 'flex-start',
    marginBottom: 10
  },
  text: {
    color: 'white',
    maxWidth: '100%',
  },
  messageText: {
    flexShrink: 1,
  },
  avatar: {
    width: 20,
  }
})
