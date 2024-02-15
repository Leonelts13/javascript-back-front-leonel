import React, { useEffect, useState } from 'react'
import { Alert, FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Task from './Task'
import { Modal } from 'react-native'
import Profile from './Profile'

export default function List() {

    const [taskItems, setTaskItems] = useState([])
    const [showProfile, setShowProfile] = useState(false)
    const [task, setTask] = useState({})

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const response = await fetch('https://api.unsplash.com/photos/?client_id=ZXjOAAdwefwfYGtyhjJmAerkWnGDxNNnEwTlnHkSqk4')
            const jsonData = await response.json()
            setTaskItems(jsonData)
            // console.log(jsonData)
        } catch (error) {
            console.error(error)
        }
    }

    const getProfile = (task) => {
        setShowProfile(true)
        setTask(task)
    }

    const closeProfile = () => {
        setShowProfile(!showProfile)
    }

    const Item = ({ task, i }) => { // mandamos como parametro el task y el id
        return (
            <TouchableOpacity style={styles.peritem} key={i} onPress={() => getProfile(task)}>
                <Task task={task} />
            </TouchableOpacity>
        )
    }

    return (taskItems &&
        <View style={styles.container}>
            <View style={styles.taskWrapper}>
                <Text style={styles.sectionTitle}>
                    Se listan los perfiles
                </Text>
                <View style={styles.items}>
                    <FlatList
                        data={taskItems}
                        renderItem={({ item, i }) => <Item task={item} i={i} />}
                    >
                    </FlatList>
                </View>
            </View>
            <Modal
                animationType='slide'
                transparent={true}
                visible={showProfile}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed")
                    setShowProfile(!showProfile)
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText} />
                        <Profile task={task} closeProfile={closeProfile} />
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { // es el contenedor principal
        backgroundColor: "#E8EAED",
        //backgroundColor: "red",
        marginTop: StatusBar.currentHeight || 0,
        display: 'flex'
    },
    taskWrapper: { // es la pantalla invisible, toda la pantalla
        paddingTop: 20,
        paddingHorizontal: 20,
        height: 900,
        //backgroundColor: "red",
    },
    sectionTitle: { // titulo de la pantalla, esta centrada
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        //backgroundColor: "red",
    },
    items: {
        // es la separacion de cada tarjeta
        //backgroundColor: "red",
    },
    peritem: {
        // es la separacion de cada tarjeta invisible??
        //backgroundColor: "red",

    },
    centeredView: { // es toda la ventana flotante invisible
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        //backgroundColor: "red",
    },
    modalView: { //es la ventana fotante
        margin: 0,
        backgroundColor: "white",
        //backgroundColor: "red",
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: "#000",
        width: "100%",
        height: 300,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalText: { // es el titulo (texto) de la ventana flotante
        marginBottom: 15,
        textAlign: 'center',
        width: "100%",
        //backgroundColor: "red",
    }
})