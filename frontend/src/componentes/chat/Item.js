import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Item = ({ item }) => {
  const { id, message, prompt, numTokens, loading } = item
  return (
    // Este bloque View es para los mensajes que envía el usuario
    <View key={id} style={styles.containerItem}>
      <View style={styles.containerPrompt}>
        <Text style={styles.text}>{prompt}</Text>
      </View>
      {
        // TODO: Este bloque muestra los mensajes del chat
        !loading && (
          <View style={styles.containerAvatar}>
            {/* Mostramos el icono del chatbot */}
            <View>
              <Text style={styles.avatar}>{"🤖"}</Text>
            </View>
            <View style={styles.containerMessage}>
              {/* Mostramos el mensaje */}
              <Text style={[styles.text, styles.messageText]}>
                {message}
                {"\n"}
                {/* Mostramos el número de tokens */}
                <Text style={styles.boldText}>
                  Tokens: {numTokens}
                </Text>
              </Text>
            </View>
          </View>
        )
      }
    </View>
  )
}

export default Item;

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
  boldText: {
    fontWeight: 'bold',
  },
  avatar: {
    width: 20,
  }
})
