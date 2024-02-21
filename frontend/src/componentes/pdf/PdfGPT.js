import React, { useRef, useState } from 'react'
import { ActivityIndicator, FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import * as DocumentPicker from 'expo-document-picker'
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { inferenceApi } from '../service/inferenceApi';
import MessageInput from '../chat/MessageInput';
import ItemPdf from './ItemPdf';

const EmptyDocument = ({ pickDocument }) => (
  <View style={styles.containerUpload}>
    <Feather name="file" size={50} color="black" />
    <Text style={styles.containerTitle}>Carga tus archivos aquí</Text>
    <Text style={styles.containerSupport}>Formatos soportados: PDF</Text>
    <TouchableOpacity style={styles.button} onPress={pickDocument}>
      <Text style={styles.textButton}>Buscar PDF</Text>
    </TouchableOpacity>
  </View>
)

const DocumentUploaded = ({ document, isLoaded, handleClean }) => {
  return (
    <View style={!isLoaded ? styles.containerUpload : styles.containerLoaded}>
      {/* tamaño del icono del PDF*/}
      <Feather name="file" size={!isLoaded ? 50 : 25} color="black" /> 
      {/* el titulo del documento*/}
      <Text style={!isLoaded ? styles.containerTitle : styles.containerTitleLoaded}>{document.name}</Text>
      {/* convertimos el tamaño del documento a MB*/}
      {!isLoaded && <Text style={styles.containerSupport}>Tamaño: {convertBytesToMB(document.size)}</Text>}
      
      {!isLoaded && <Text style={[styles.textButton, { marginTop: 10, fontSize: 16 }]}>PDF</Text>}
      {/* definimos el color del icono para borrar el documento PDF */}
      {isLoaded && <TouchableOpacity onPress={handleClean}>
        <MaterialIcons name='cancel' size={24} color='red' />
      </TouchableOpacity>}
    </View>
  )
}

const convertBytesToMB = (bytes) => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (bytes === 0) return '0 Byte'
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024))) //calculamos el indice apropiado para la unidad de medida que esta en la matriz
  return `${Math.round(bytes / Math.pow(1024, i), 2)} ${sizes[i]}` //retornamos el tamaño apropiado para el documento y la medida que se encuentra en la matriz
}

const PdfGPT = () => {
  const [document, setDocument] = useState(null)
  const [query, setQuery] = useState()
  const [listMessage, setListMessage] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const flatList = useRef(null)

  const pickDocument = async () => {
    try {
      const { assets, canceled } = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf', // Tipo de documento a seleccionar
        copyToCacheDirectory: true, // Copiar el archivo seleccionado al directorio de caché
      });
    
      if (!canceled && assets.length > 0) {
        const { mimeType, name, size, uri } = assets[0];
        setDocument({ type: mimeType, name, size, uri });
        // console.log("Nombre del archivo:", name);
        // console.log("Tamaño del archivo (bytes):", size);
        // console.log("URI del archivo:", uri);
      } else {
        setDocument(null); // Establecer el documento como null si la operación fue cancelada o no se seleccionó ningún archivo
      }
    } catch (error) {
      console.log('Error al seleccionar el PDF:', error);
    }
  }

  const handleCancel = () => {
    setDocument(null)
  }

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const handleClean = () => {
    setDocument(null)
    setIsLoaded(false)
    setListMessage([])
  }

  const handleUpload = async () => {
    setIsLoading(true) // para mostrar el circulo que esta cargando la informacion
    const formData = new FormData() // se usa para mandar datos al servidor o backend
    formData.append('pdf', document)
    formData.append('question', query)

    console.log("esta bien el formato??-------------Z>>>>", formData)
    //console.log(data.get('pdf'))
    try {
      const response = await inferenceApi({ data: formData })
      console.log("que saaaaaaaaaaaaaaale aqui: ",response);
      const data = { // creamos un nuevo objeto 'data'
        id: listMessage.length + 1,
        message: response.message.text || 'No se pudo obtener una respuesta',
        query
      }
      setListMessage([...listMessage, data]) //actualizamos la lista agregando el mensaje al final del array
    } catch (error) {
      console.log('Error al obtener respuesta del servido88888888888r')
    } finally {
      setQuery('')
      setIsLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PDF</Text>
      {!document
        ? <EmptyDocument pickDocument={pickDocument} />
        : <DocumentUploaded document={document} isLoaded={isLoaded} handleClean={handleClean} />
      }
      {(document && !isLoaded) &&
        <View style={styles.containerButtons}>
          <TouchableOpacity style={styles.buttonCancelar} onPress={handleCancel}>
            <Text style={styles.buttonCancelar}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonCargar} onPress={handleLoad}>
            <Text style={styles.textButtonCargar}>Cargar</Text>
          </TouchableOpacity>
        </View>
      }
      <FlatList
        data={listMessage}
        style={{ marginTop: 20 }}
        ref={flatList}
        renderItem={({ item }) => (<ItemPdf item={item} />)}
        onContentSizeChange={() => listMessage.length > 0 && flatList.current.scrollToEnd({ animated: true })}
      />
      {/* para que se vea un circulo que esta cargando la informacion */}
      {isLoading && <ActivityIndicator size="large" color="blue" />}
      {(document && isLoaded) && <MessageInput prompt={query} setPrompt={setQuery} onSubmit={handleUpload} />}
    </View>
  )
}

export default PdfGPT

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: StatusBar.currentHeight || 0,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20
  },
  containerUpload: { // cuadro para subir el pdf
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderStyle: 'dashed',
    borderColor: 'gray',
    width: '80%',
    height: 250,
    backgroundColor: 'white'
  },
  containerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    backgroundColor: 'red'
  },
  containerSupport: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  textButton: {
    color: 'blue',
    textAlign: 'center'
  },
  containerButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: 240,
    marginTop: 30,
  },
  buttonCargar: {
    width: 120,
    height: 35,
    backgroundColor: 'blue',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonCancelar: {
    height: 35,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textButtonCancelar: {
    color: 'blue',
  },
  textButtonCargar: {
    color: 'white',
  },
  containerLoaded: { // cuadro donde esta el nombre del documento par ya usar chatgpt
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    borderStyle: 'dashed',
    borderColor: 'gray',
    width: '80%',
    paddingVertical: 10,
  },
  containerTitleLoaded: { //para cambiar el tipo de letra del titulo del documento en las preguntas
    fontWeight: 'bold',
    marginLeft: 10,
  }
})