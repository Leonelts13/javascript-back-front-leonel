import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const Task = ({ task }) => {
    return (
        <View style={styles.container}>
            <View style={styles.contenedorImagen}>
                <Image source={{ uri: task.urls.regular }} style={styles.image} />
            </View>
            <Text style={styles.descripcion}>{task.alt_description}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        //backgroundColor: 'pink',
        borderRadius: 10,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        paddingVertical: 15, // distancia del espacio interno iniciando en la parte superior
    },
    contenedorImagen: {
        width: '30%',
        height: '60%',
        borderRadius: 50,
        overflow: 'hidden',
        marginBottom: 15, //espacio par la descripcion
    },
    image: {
        width: '100%',
        height: '100%',
        aspectRatio: 1,
    },
    descripcion: {
        fontSize: 16,
        color: '#333333',
    },
});

export default Task;
