import React, { useEffect, useState } from 'react'
import { FlatList, StatusBar } from 'react-native'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const pencilIcon = <Icon name='pencil' size={20} color="blue" />
const trashIcon = <Icon name='trash' size={20} color="red" />

const initialData = [] //definimos una lista vacia

const initialFullName = { nombre: '', apellido: '', edad: '' } // creamos un objeto persona

export default function Form() {

  useEffect(() => {
    fetchData()
  }, [])
  //console.log(jsonData)

  const [fullName, setFullName] = useState(initialFullName) // para almacenar el nombre y apellido
  const [listNames, setListNames] = useState(initialData) //para almacena la lista de personas

  //cargamos los datos de la base de datos del backend
  const fetchData = async () => {
    setListNames(initialData)
    try {
      const response = await fetch('http://192.168.100.8:4000/tasks')
      const jsonData = await response.json()
      //setTaskItems(jsonData)
      setListNames(jsonData)
    } catch (error) {
      console.error(error)
    }
  }

  const onSubmit = async () => {
    const { nombre, apellido, edad } = fullName //extraemos nombre y apellido de 'fullName
    const intEdad = parseInt(edad, 10);
    const persona = { nombre: nombre, apellido: apellido, edad: intEdad };

    if (fullName.id) { // verificamos si esta editando
      try {
        //hacemos un PUT al api rest del backend
        const response = await fetch(`http://192.168.100.8:4000/tasks/${fullName.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(persona)
        });
        const jsonData = await response.json();
        console.log('Datos modificados:', jsonData);
      } catch (error) {
        console.error('Error al modificar los datos:', error);
      }
    } else { // caso contrario ingresamos un usuario

      //hacemos un POST al api rest del backend
      try {
        const response = await fetch('http://192.168.100.8:4000/tasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(persona)
        });
        const jsonData = await response.json();
        console.log('Datos creados:', jsonData);
      } catch (error) {
        console.error('Error al crear datos:', error);
      }

    }
    fetchData() // actualizamos la información
    setFullName(initialFullName)
  }

  const handleChange = (name, value) => {
    setFullName((prevFullName) => ({
      ...prevFullName,
      [name]: value
    }))
  }

  const handleDelete = async (idPersona) => {
     //hacemos un DELETE al api rest del backend
    try {
      const response = await fetch(`http://192.168.100.8:4000/tasks/${idPersona}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const jsonData = await response.json();
      console.log('Datos eliminados:', jsonData);
    } catch (error) {
      console.error('Error al eliminar datos:', error);
    }

    fetchData() // actualizamos la información
    setFullName(initialFullName)
  }

  const handleEdit = async (idPersona) => {
    try {
      const response = await fetch(`http://192.168.100.8:4000/tasks/${idPersona}`);
      const data = await response.json();
      //const foundItem = listNames.find((item) => item.id === id);
      const {nombre, apellido, edad } = data;
      const edadString = edad.toString();
      const persona = { id: idPersona, nombre: nombre, apellido: apellido, edad: edadString };
      setFullName(persona)
      console.log('Datos encontrados:', data);
    } catch (error) {
      console.error('Error al encontrar el dato:', error);
    }
  }

  const Card = ({ data }) => {
    const { id, nombre, apellido, edad } = data
    return (
      <View style={styles.containerItem}>
        <View style={styles.itemFullName}>
          <Text key={id} > {nombre}  {apellido}  {edad}</Text>
        </View>
        <View style={styles.itemActions}>
          <Text onPress={() => handleEdit(id)} >{pencilIcon}</Text>
          <Text onPress={() => handleDelete(id)}>{trashIcon}</Text>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>
          Completa los campos
        </Text>
        <TextInput
          style={styles.inputText}
          placeholder='Ingresa tu nombre'
          value={fullName.nombre}
          onChangeText={value => handleChange('nombre', value)}
        />
        <TextInput
          style={styles.inputText}
          placeholder='Ingresa tu apellido'
          value={fullName.apellido}
          onChangeText={value => handleChange('apellido', value)}
        />
        <TextInput
          style={styles.inputText}
          placeholder='Ingresa tu edad'
          value={fullName.edad}
          keyboardType='numeric'
          onChangeText={value => handleChange('edad', value)}

        />
      </View>

      <TouchableOpacity style={styles.button} onPress={onSubmit}>
        <Text style={styles.textButton}>
          {
            fullName.id ? 'Editar' : 'Guardar'
          }
        </Text>
      </TouchableOpacity>

      <FlatList
        data={listNames}
        renderItem={({ item }) => <Card data={item} />}
      >
      </FlatList>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: StatusBar.currentHeight || 0,
  },
  formContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20
  },
  inputText: {
    width: 300,
    backgroundColor: "white",
    color: "gray",
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
    borderRadius: 15,
    textAlign: 'center',
    // fontSize: 10
  },
  button: {
    width: 120,
    height: 35,
    backgroundColor: 'blue',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textButton: {
    color: 'white',
    // fontSize: 10,
    textAlign: 'center'
  },
  containerItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 300,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  itemFullName: {
    width: '70%',
    //backgroundColor: 'red',
  },
  itemActions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '30%'
  }
})
