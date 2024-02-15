import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileCard from "./componentes/home/ProfileCard";
import { MaterialCommunityIcons } from "react-native-vector-icons"
import List from "./componentes/list/List";
import Form from "./componentes/Form";
import Chat from "./componentes/chat/Chat";
import PdfGPT from "./componentes/pdf/PdfGPT";

const Tab = createBottomTabNavigator();

export default function Navigation() {
    return (
        <Tab.Navigator
            initialRouteName="List" // el nombre de la primera ruta que se presenta en la pantalla
            screenOptions={{ // Opciones predefinidas
                headerShown: false, // para mostrar el encabezado
                /*
                TODO: Se pone estas lineas dentro del Tab.Screen para modificar los colores 
                TODO: de todaslas opciones
                tabBarInactiveTintColor: 'gray',
                tabBarActiveTintColor: 'tomato',
                */
            }}
        >
            <Tab.Screen name="List" component={List} options={{
                tabBarLabel: "Listado",
                tabBarIcon: ({ color, size }) => {
                    return <MaterialCommunityIcons name="clipboard-list" color={color} size={size} />
                }
            }} />
            <Tab.Screen name="Nombre" component={Form} options={{
                tabBarLabel: "Nombre",
                tabBarIcon: ({ color, size }) => {
                    return <MaterialCommunityIcons name="pencil-circle-outline" color={color} size={size} />
                }
            }} />
            <Tab.Screen name="PDF" component={PdfGPT} options={{
                tabBarLabel: "PDF",
                tabBarIcon: ({ color, size }) => {
                    return <MaterialCommunityIcons name="file-document-outline" color={color} size={size} />
                }
            }} />
            <Tab.Screen name="ChatGPT" component={Chat} options={{
                tabBarLabel: "ChatGPT",
                tabBarIcon: ({ color, size }) => {
                    return <MaterialCommunityIcons name="chat-outline" color={color} size={size} />
                }
            }} />
            <Tab.Screen name="Profile" component={ProfileCard} options={{
                tabBarLabel: "Perfil",
                tabBarIcon: ({ color, size }) => {
                    return <MaterialCommunityIcons name="account-circle-outline" color={color} size={size} />
                },
                /* 
                TODO: Se pone estas lineas dentro del Tab.Screen para modificar los colores 
                TODO: solo de una opcion
                tabBarInactiveTintColor: 'gray',
                tabBarActiveTintColor: 'tomato',
                
                */
            }} />

        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
    },
});