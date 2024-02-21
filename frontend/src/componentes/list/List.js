import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Modal, Alert, FlatList } from "react-native";
import Task from "./Task";
import Profile from "./Profile";
import axios from "axios";

const ListComponent = () => {
    const [taskItems, setTaskItems] = useState([]);
    const [showProfile, setShowProfile] = useState(false);
    const [task, setTask] = useState();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://api.unsplash.com/photos/', {
                params: {
                    client_id: 'tmXX2qlmRsZbsX7eXhvWsY1wfSpKeQj6fU9EQN0fkAw'
                }
            });
            const jsonData = response.data;
            setTaskItems(jsonData);
        } catch (error) {
            console.error('error', error);
        }
    }

    const Item = ({ task }) => {
        return (
            <TouchableOpacity style={styles.perimetroItem} onPress={() => {
                getProfile(task);
            }}>
                <Task task={task} />
            </TouchableOpacity>
        );
    }

    const getProfile = (task) => {
        setShowProfile(true);
        setTask(task);
    }

    const closeProfile = () => {
        setShowProfile(false);
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../../assets/fondo.jpg')} resizeMode="cover" style={styles.imagenFondo}>
                {taskItems &&
                    <View style={styles.contenedorTareas}>
                        <Text style={styles.tituloSeccion}>Lista de Axios</Text>
                        <FlatList
                            data={taskItems}
                            renderItem={({ item }) => <Item task={item} />}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                }
                <View style={{ flex: 1 }}>
                    <Modal
                        transparent={true}
                        animationType={'slide'}
                        visible={showProfile}
                        onRequestClose={() => {
                            Alert.alert('Modal ha sido cerrado');
                            setShowProfile(false);
                        }}
                    >
                        <View style={styles.ModalCentrado}>
                            <View style={styles.ModalContenedor}>
                                <Profile task={task} closeProfile={closeProfile} />
                            </View>
                        </View>
                    </Modal>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imagenFondo: {
        flex: 1,
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    contenedorTareas: {
        paddingTop: 40,
        paddingHorizontal: 20,
        paddingBottom: 50, // Ajuste para dejar espacio para el botón Cerrar y evitar superposiciones
        alignItems: 'center',
    },
    tituloSeccion: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
    },
    itemsContenedor: {
        width: '100%',
        alignItems: 'center',
    },
    perimetroItem: { //tarjeta de cada item

        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        width: '100%',
        height: 210,         // Cambia esto al tamaño deseado

        //distancia de la tarjeta
        marginVertical: 10,    // distanciaa entre tarjetas --> es el espacio externo
        //paddingVertical: 10,   // distancia interna de la tarjeta
        alignItems: 'center',

        //borde de la tarjeta
        borderRadius: 10,
        borderColor: 'rgba(192, 192, 192, 0.8)',
        borderWidth: 5,

        //sombras
        shadowColor: 'black',
        shadowOpacity: 0.1,
        shadowRadius: 60,
        elevation: 5,
        //superpusicion
        overflow: 'hidden',
    },

    ModalCentrado: { //espacio invisible donde se mostrara el modal
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //marginTop: 45,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    ModalContenedor: {
        justifyContent: 'center',
        alignItems: 'center',
        //padding: 5,
        alignItems: 'center',
        width: '60%',
        height: '50%',
        overflow: 'hidden',
        borderRadius: 20,
        borderColor: 'rgba(192, 192, 192, 0.8)',
        borderWidth: 5,

    },
    modalText: {
        marginBottom: 1,
        textAlign: 'center',
        width: '100%',
        height: '100%', // Ajustamos la altura al 100% para ocupar todo el espacio disponible
        color: 'black',
        backgroundColor: 'blue',
        borderColor: 'red',
        borderWidth: 5,
    },

});

export default ListComponent;