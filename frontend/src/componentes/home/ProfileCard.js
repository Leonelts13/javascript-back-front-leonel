import React from "react";
import { View, Text, Image, StyleSheet, Linking, TouchableWithoutFeedback } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/FontAwesome6";

const telegramIcon = <Icon name={'telegram'} size={35} color={'white'} />;    //#0088cc
const twitchIcon = <Icon name={'twitch'} size={35} color={'white'} />;        //#6441a5
const pinterestIcon = <Icon name={'pinterest'} size={35} color={'white'} />;  //#c8232c
const redditIcon = <Icon name={'reddit'} size={35} color={'white'} />;        //#FF5700
const discordIcon = <Icon2 name={'discord'} size={35} color={'white'} />;     //#7289da

const kwaiIcon = <Image source={require('../../../assets/kwai.png')} style={{ width: 35, height: 35 }} />;

const ProfileCard = () => {
    const user = {
        coverPhoto: "../../../assets/fondo.jpg", //se usa con require
        //coverPhoto: "https://pbs.twimg.com/media/EX5vc-lWsAcYzll.jpg", //se usa con uri
        //coverPhoto: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        //avatar: "https://wallpapers.com/images/high/anime-wolf-neon-blue-eyes-and-bones-dri1b04gf8g6g0tu.webp",
        avatar: "../../../assets/fondo.jpg",
        //avatar: "https://get.wallhere.com/photo/Assassin's-Creed-Assassin's-Creed-Valhalla-viking-warrior-1914269.jpg",
        name: "Leonel Tualombo"
    };

    const handleLinkPress = (url) => {
        Linking.openURL(url);
    };

    return (
        <View style={styles.container}>
            <Image style={styles.backgroundImage} source={require('../../../assets/fondo.jpg')} resizeMode="cover" />
            {/*}
            <Image style={styles.backgroundImage} source={{ uri: user.coverPhoto }} resizeMode="cover" />
            */}
            <View style={styles.overlay}>
                <View style={styles.tarjeta}>
                    <View style={styles.AvatarContenedor}>
                        <Image source={require('../../../assets/foto1.png')} style={styles.avatar} />
                        <Text style={styles.name}>{user.name}</Text>
                        <Text style={styles.nameText}>Desarrollador</Text>
                    </View>
                    <View style={styles.buttonContenedor}>
                        <TouchableWithoutFeedback onPress={() => handleLinkPress('https://www.kwai.com/es')}>
                            {kwaiIcon}
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => handleLinkPress('https://www.twitch.tv/')}>
                            {twitchIcon}
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => handleLinkPress('https://www.pinterest.es/')}>
                            {pinterestIcon}
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={[styles.buttonContenedor, {width: '50%', marginTop: 20,}]}>
                        <TouchableWithoutFeedback onPress={() => handleLinkPress('https://www.reddit.com/')}>
                            {redditIcon}
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => handleLinkPress('https://discord.com/')}>
                            {discordIcon}
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tarjeta: {
        width: '75%',
        height: '75%',
        backgroundColor: 'black',
        borderRadius: 50,
        overflow: 'hidden', // Oculta cualquier contenido que se desborde del elemento
        borderColor: 'rgba(192, 192, 192, 0.8)',
        borderWidth: 10,
        alignItems: 'center',
    },
    AvatarContenedor: {
        width: '100%',
        height: '75%',
        alignItems: 'center',
        alignSelf: 'flex-start',
        overflow: 'hidden',
    },
    avatar: {
        width: '100%',
        height: '75%',
        borderRadius: 50,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
    },
    name: {
        fontSize: 25,
        marginTop: 10,
        color: 'white',
        fontWeight: 'bold',
        fontStyle: 'italic',
    },
    nameText: {
        fontSize: 20,
        marginTop: 10,
        color: '#17f1cd',
        marginTop: 3,
    },
    buttonContenedor: {
        flexDirection: 'row', // Establece el diseño de los elementos hijos en una fila
        marginTop: 5,
        width: '80%',
        justifyContent: 'space-between', // Distribuye uniformemente el espacio horizontalmente
    },
});

export default ProfileCard;
