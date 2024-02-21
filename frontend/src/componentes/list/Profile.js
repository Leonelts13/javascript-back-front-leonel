import React from "react";
import { View, StyleSheet, Image, Text, Linking, Button } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const instagram = <Icon name={'instagram'} size={35} color={'white'} />;
const portafolio_url = <Icon name={'globe'} size={35} color={'white'} />;
const like = <Icon name={'thumbs-up'} size={35} color={'white'} />;

const Profile = ({ task, closeProfile }) => {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: task.urls.raw }} style={styles.image} />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.userName} onPress={() => Linking.openURL(task.user.portfolio_url)}>
                    {task.user.name}
                </Text>
                <View style={styles.socialIcons}>
                    <Text style={styles.icon} onPress={() => Linking.openURL(task.user.social.instagram_url)}>
                        {instagram}
                    </Text>
                    <Text style={styles.icon} onPress={() => Linking.openURL(task.user.social.portfolio_url)}>
                        {portafolio_url}
                    </Text>
                    <Text style={styles.icon} onPress={() => Linking.openURL(task.user.social.portfolio_url)}>
                        {like}
                    </Text>
                </View>
            </View>
            
            <Button title={'Cerrar'} color={'#17c1ad'}  onPress={closeProfile} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        padding: 20,
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
        borderRadius: 100,
        marginBottom: 20,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 100,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 30,
    },
    userName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#3498db',
        marginTop: 10,
    },
    socialIcons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        marginTop: 20,
        //padding: 5,
    },
    icon: {
        color: '#3498db',
        
    },
});

export default Profile;
