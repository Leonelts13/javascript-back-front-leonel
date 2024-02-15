import React from 'react'
import { Image, StyleSheet, View, Text } from 'react-native'

export default function Task({ task }) {
    return (
        <View style={styles.item}>
            <View style={styles.itemLeft}>
                <Image style={styles.image} source={{ uri: task.urls.raw }} />
                <Text style={styles.itemText}>{task.alt_description}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    item: { //la etiqueta o cada fila
        backgroundColor: "#FFF",
        //backgroundColor: "red",
        padding: 15,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20
    },
    itemLeft: { // cuadro mas interno de la etiqueta
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
        //backgroundColor: "red",
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginRight: 15,
    },
    itemText: { // texto descripcion de cada etiqueta
        maxWidth: "80%",
        //backgroundColor: "red",
    }
})