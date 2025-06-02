import React, { Component } from "react";
import { Text, View, Image, StyleSheet, TextInput, FlatList, ActivityIndicator, TouchableOpacity, ImageBackground } from "react-native";
import { auth, db } from '../firebase/config';

class Registro extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            contraseña: '',
            username: '',
            error: false,
            mensajeError: '',
        }
    }

    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.props.navigation.navigate('BottomTabs')
            }
        })
    }
    registrarUsuario(email, contraseña, username) {
        if (email === '' || contraseña === '' || username === '') {
            this.setState({
                error: true,
                mensajeError: 'Todos los campos son obligatorios.'
            });
        } else if (!email.includes('@')) {
            this.setState({
                error: true,
                mensajeError: 'El email no es válido.'
            });
        } else if (contraseña.length < 6) {
            this.setState({
                error: true,
                mensajeError: 'La contraseña debe tener al menos 6 caracteres.'
            });
        } else if (username.length < 5) {
            this.setState({
                error: true,
                mensajeError: 'El nombre de usuario debe tener al menos 5 caracteres.'
            });
        } else {
            auth.createUserWithEmailAndPassword(email, contraseña)
                .then(() => {
                    db.collection('users').add({
                        owner: email,
                        createdAt: Date.now(),
                        updateAt: Date.now(),
                        username: username
                    })
                        .then(() => this.props.navigation.navigate('Login'))
                })
                .catch(error => {
                    console.log('error: ', error);
                    this.setState({
                        error: true,
                        mensajeError: error.message
                    });
                });
        }
    }


    redireccionar(pantallaScreen) {
        this.props.navigation.navigate(pantallaScreen)
    }
    render() {
        return (
            <ImageBackground
                source={{ uri: 'https://wallpapers-clan.com/wp-content/uploads/2023/09/glowing-up-not-giving-up-purple-black-background-scaled.jpg' }}
                style={styles.fondo}
                resizeMode="cover"
            >
                <View style={styles.cajaPrincipal}>
                    <Text style={styles.titulo} >Registro</Text>

                    <TextInput
                        style={styles.input}
                        keyboardType='default'
                        value={this.state.email}
                        onChangeText={(texto) => this.setState({ email: texto, error: false })}
                        placeholder='Ingrese su email'

                    />

                    <TextInput
                        style={styles.input}
                        keyboardType='default'
                        value={this.state.contraseña}
                        onChangeText={(texto) => this.setState({ contraseña: texto, error: false })}
                        placeholder='Ingrese su contraseña'
                        secureTextEntry={true}
                    />

                    <TextInput
                        style={styles.input}
                        keyboardType='default'
                        value={this.state.username}
                        onChangeText={(texto) => this.setState({ username: texto, error: false })}
                        placeholder='Ingrese su nombre de usuario'


                    />

                    <TouchableOpacity
                        style={styles.botton}
                        onPress={() => this.registrarUsuario(this.state.email, this.state.contraseña, this.state.username)}>

                        <Text style={styles.textoBotton} >Registrarse</Text>
                    </TouchableOpacity>

                    {this.state.error && (
                        <Text style={styles.errorText}>{this.state.mensajeError}</Text>
                    )}


                    <View style={styles.cajaLogin}>
                        <Text style={styles.textoLogin}>¿Ya tenés cuenta?</Text>
                        <TouchableOpacity onPress={() => this.redireccionar('Login')}>
                            <Text style={styles.linkLogin}>Iniciar seción</Text>
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
    cajaPrincipal: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    titulo: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
        color: 'white',
    },
    input: {
        backgroundColor: 'transparent',
        color: 'white',
        padding: 12,
        marginBottom: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'grey',
        fontSize: 16,
    },
    botton: {
        backgroundColor: 'purple',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    textoBotton: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        marginBottom: 15,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    cajaLogin: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    textoLogin: {
        color: '#555',
        marginRight: 5,
    },
    linkLogin: {
        color: '#007BFF',
        fontWeight: 'bold',
    },

});
export default Registro;