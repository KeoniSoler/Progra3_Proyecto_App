import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ImageBackground } from "react-native";
import { auth, db } from '../firebase/config';


export default class Posteo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            texto: '',
            error: false,
            mensajeError: '',
        }
    }

    nuevoPost() {
        if (this.state.texto !== '') {
            db.collection('posts').add({
                owner: auth.currentUser.email,
                texto: this.state.texto,
                createdAt: Date.now(),
                Likes: [],
            })
                .then(() => {
                    this.setState({ texto: '' })
                    this.props.navigation.navigate('Feed');
                })
                .catch(error => {
                    console.log('error: ', error);
                    this.setState({ error: true, mensajeError: error.message });
                });


        }
    }

    render() {
        return (
            <ImageBackground
                source={{ uri: 'https://wallpapers-clan.com/wp-content/uploads/2023/09/glowing-up-not-giving-up-purple-black-background-scaled.jpg' }}
                style={styles.fondo}
                resizeMode="cover"
            >
                <View style={styles.container}>
                    <Text style={styles.title}>Crear un nuevo posteo</Text>
                    <View>
                        <TextInput
                            style={styles.input}
                            keyboardType='default'
                            value={this.state.texto}
                            onChangeText={(texto) => this.setState({ texto: texto, error: false })}
                            placeholder='Subite algo!'
                        />
                        <TouchableOpacity style={styles.button} onPress={() => this.nuevoPost()}>
                            <Text style={styles.buttonText}>Publicar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        );

    }
}

const styles = StyleSheet.create({
    fondo: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: 'white',
    },
    input: {
        backgroundColor: 'white',
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 10,
        padding: 15,
        fontSize: 16,
        marginBottom: 15,
        height: 120,
        textAlignVertical: 'top',
    },
    button: {
        backgroundColor: 'purple',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 17,
        fontWeight: 'bold',
    },

});