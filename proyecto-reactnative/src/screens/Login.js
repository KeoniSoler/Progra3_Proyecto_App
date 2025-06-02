import React, { Component } from "react";
import { Text, View, StyleSheet, TextInput, TouchableOpacity, ImageBackground } from "react-native";
import { auth } from "../firebase/config";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            contraseña: '',
            error: '',
        };
    }

    loginUsuario(email, contraseña) {
        if (email !== '' && contraseña !== '') {
            auth.signInWithEmailAndPassword(email, contraseña)
                .then(() => {
                    this.props.navigation.navigate('BottomTabs');
                })
                .catch(err => {
                    this.setState({ error: 'Email o contraseña incorrectos' });
                });
        } else {
            this.setState({ error: 'Completá todos los campos' });
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
                    <Text style={styles.titulo}>Iniciar Sesión</Text>

                    {this.state.error !== '' && (
                        <Text style={styles.errorText}>{this.state.error}</Text>
                    )}

                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        keyboardType="email-address"
                        value={this.state.email}
                        onChangeText={(texto) => this.setState({ email: texto, error: '' })}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Contraseña"
                        secureTextEntry={true}
                        value={this.state.contraseña}
                        onChangeText={(texto) => this.setState({ contraseña: texto, error: '' })}
                    />

                    <TouchableOpacity
                        style={styles.botton}
                        onPress={() => this.loginUsuario(this.state.email, this.state.contraseña)}
                    >
                        <Text style={styles.textoBotton}>Ingresar</Text>
                    </TouchableOpacity>

                    <View style={styles.cajaRegistro}>
                        <Text style={styles.textoRegistro}>¿No tenés cuenta?</Text>
                        <TouchableOpacity onPress={() => this.redireccionar('Registro')}>
                            <Text style={styles.linkRegistro}>Registrate</Text>
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
    cajaRegistro: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    textoRegistro: {
        color: '#555',
        marginRight: 5,
    },
    linkRegistro: {
        color: '#007BFF',
        fontWeight: 'bold',
    },
});

export default Login;