import { useState } from 'react'
import { completionApi } from '../service/completationApi.js'

export function useCompletion() {
  const [prompt, setPrompt] = useState('') //almacena el mensaje actual que el usuario está escribiendo.
  const [listMessage, setListMessage] = useState([]) // almacena la lista de mensajes en la conversación.

  const onSubmit = async () => {
    //TODO: ESTE BLOQUE AGREGA UN MENSAJE VACIO A LA LISTA DE MENSAJES
    setListMessage((prevValues) => [ //con la lista anterior al mensaje
      ...prevValues, // copiamos todos los elementos de la lista
      {
        id: prevValues.length,
        prompt: prompt,
        numTokens: 0, // inicializamos el numero de tokens
        message: '', //iniciamos vacio el nuevo mensaje
        loading: true // confirmamos que el mensaje esta en proceso de carga
      }
    ])
    //limpiamos el input del mensaje
    setPrompt('')
    const message1 = { message: prompt };

    //const { message, numTokens } = await completionApi({ prompt }) // llamamos a completionApi

    try {
      const response = await fetch('http://192.168.100.8:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(message1)
      });
      const jsonData = await response.json();
      //console.log('Datos creados:', jsonData);
      const { message, numTokens } = jsonData;

      //para que devuelva un objeto con dos props, el mensaje de respuesta y el numero de tokens

      //TODO: ESTA LINEA AGREMA LOS VALORES AL MENSAJE VACIO CREADO ANTES
      setListMessage((prevValues) =>
        prevValues.map((item) => { //usamos 'map' para iterar sobre cada elemento de la lista
          if (item.prompt === prompt) {
            return {
              ...item, //copiamos todas las propiedades de 'item'
              numTokens: numTokens, //actualizamos el numero de los tokens
              message: message, // actualizamos el mensaje obtenido
              loading: false // indicamos que el mensaje ha sido cargado
            }
          }
          return item
        })
      )
    } catch (error) {
      console.error('Error al crear datos:', error);
    }

  }

  const clearList = () => {
    setListMessage([])
  }

  return { listMessage, prompt, setPrompt, clearList, onSubmit }

}