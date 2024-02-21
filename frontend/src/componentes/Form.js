import React, { useEffect, useState } from 'react';
import { FlatList, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View, Animated, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const pencilIcon = <Icon name='pencil' size={20} color="blue" />;
const trashIcon = <Icon name='trash' size={20} color="red" />;

const initialFullName = { nombre: '', apellido: '', edad: '' };

export default function Form() {
  const [fullName, setFullName] = useState(initialFullName);
  const [listNames, setListNames] = useState([]);
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    fetchData();
    fadeIn();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://192.168.100.8:4000/tasks');
      const jsonData = await response.json();
      setListNames(jsonData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    const { nombre, apellido, edad, id } = fullName;
    const intEdad = parseInt(edad, 10);
    const persona = { nombre, apellido, edad: intEdad };

    try {
      const url = id ? `http://192.168.100.8:4000/tasks/${id}` : 'http://192.168.100.8:4000/tasks';
      const method = id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(persona)
      });

      const jsonData = await response.json();
      console.log(id ? 'Datos modificados:' : 'Datos creados:', jsonData);
    } catch (error) {
      console.error(id ? 'Error al modificar los datos:' : 'Error al crear datos:', error);
    }

    fetchData();
    setFullName(initialFullName);
  };

  const handleChange = (name, value) => {
    setFullName(prevFullName => ({ ...prevFullName, [name]: value }));
  };

  const handleDelete = async (idPersona) => {
    try {
      const response = await fetch(`http://192.168.100.8:4000/tasks/${idPersona}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const jsonData = await response.json();
      console.log('Datos eliminados:', jsonData);
    } catch (error) {
      console.error('Error al eliminar datos:', error);
    }

    fetchData();
    setFullName(initialFullName);
  };

  const handleEdit = async (idPersona) => {
    try {
      const response = await fetch(`http://192.168.100.8:4000/tasks/${idPersona}`);
      const { nombre, apellido, edad } = await response.json();
      const persona = { id: idPersona, nombre, apellido, edad: edad.toString() };
      setFullName(persona);
      console.log('Datos encontrados:', persona);
    } catch (error) {
      console.error('Error al encontrar el dato:', error);
    }
  };

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const Card = ({ data }) => {
    const { id, nombre, apellido, edad } = data;
    return (
      <Animated.View style={[styles.containerItem, { opacity: fadeAnim }]}>
        <View style={styles.itemFullName}>
          <Text style={[styles.letraTamaño]}>{nombre} {apellido} {edad}</Text>
        </View>
        <View style={styles.itemActions}>
          <TouchableOpacity onPress={() => handleEdit(id)}>
            <Text style={styles.icon}>{pencilIcon}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDelete(id)}>
            <Text style={styles.icon}>{trashIcon}</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  };

  return (
    <ImageBackground source={require('../../assets/fondo.jpg')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Completa los campos</Text>
          <TextInput
            style={styles.inputText}
            placeholder='Nombre'
            value={fullName.nombre}
            onChangeText={value => handleChange('nombre', value)}
          />
          <TextInput
            style={styles.inputText}
            placeholder='Apellido'
            value={fullName.apellido}
            onChangeText={value => handleChange('apellido', value)}
          />
          <TextInput
            style={styles.inputText}
            placeholder='Edad'
            value={fullName.edad}
            keyboardType='numeric'
            onChangeText={value => handleChange('edad', value)}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.textButton}>{fullName.id ? 'Editar' : 'Guardar'}</Text>
        </TouchableOpacity>

        <FlatList
          data={listNames}
          renderItem={({ item }) => <Card data={item} />}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.flatListContainer}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: { //datos de la persona
    width: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    marginTop: StatusBar.currentHeight + 20, // Ajusta el margen 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputText: { //cuadros de ingreso de datos
    width: '100%',
    backgroundColor: "#dcdcdc",
    color: "black",
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    width: '40%',
    height: 40,
    backgroundColor: '#007bff',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  textButton: {
    color: '#fff',
    fontSize: 16,
  },
  flatListContainer: {
    width: '90%',
    //height: '90%',
    alignItems: 'center',
    //height: 100,
    overflow: 'hidden',
  },
  containerItem: { //etiquetas de cada persona, lita de personas en la db
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    height: 60,
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  itemFullName: {
    width: '70%',
    height: '100%',

  },
  letraTamaño: {
    fontSize: 16,
  },
  itemActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '35%',
    height: 30,
  },
  icon: {
    color: '#3498db',
    width: '100%',
    height: '100%',
  },
});
