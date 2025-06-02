import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ImageBackground } from 'react-native';
import { auth, db } from '../firebase/config';
import Publicacion from '../components/Publicacion';


export default class Perfil extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usuPosts: [],
            username: '',
        };

    }

    componentDidMount() {
        db.collection('users')
            .where('owner', '==', auth.currentUser.email)
            .onSnapshot(docs => {
                docs.forEach(doc => {
                    this.setState({
                        username: doc.data().username
                    });
                });
            });

        db.collection('posts')
            .where('owner', '==', auth.currentUser.email)
            .onSnapshot(docs => {
                let postsUsuario = [];
                docs.forEach(doc => {
                    postsUsuario.push({
                        id: doc.id,
                        data: doc.data()
                    });
                });
                postsUsuario.sort((a, b) => b.data.createdAt - a.data.createdAt);
                this.setState({ usuPosts: postsUsuario });
            });

    }

    logout() {
        auth.signOut()
            .then(() => {
                this.props.navigation.navigate('Registro');
            })
            .catch(error => console.log('Error: ', error));
    }

    render() {

        return (
            <ImageBackground
                source={{ uri: 'https://wallpapers-clan.com/wp-content/uploads/2023/09/glowing-up-not-giving-up-purple-black-background-scaled.jpg' }}
                style={styles.fondo}
                resizeMode="cover"
            >
                <View style={styles.cajaPrincipal}>
                    <Text style={styles.titulo}>Mi Perfil</Text>
                    <Text style={styles.nombre}>Nombre de usuario: {this.state.username}</Text>
                    <Text style={styles.email}>Email: {auth.currentUser.email}</Text>
                    {
                        this.state.usuPosts.length > 0 ?
                            <FlatList
                                data={this.state.usuPosts}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) =>
                                    <Publicacion data={item.data} id={item.id} />
                                }

                            />
                            :
                            <Text style={styles.noPosteos}>Aun no has Publicado nada.</Text>
                    }
                    <TouchableOpacity style={styles.botonLogout} onPress={() => this.logout()}>
                        <Text style={styles.textoLogout}>Cerrar Sesión</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        )
    }

}
const styles = StyleSheet.create({
    fondo: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titulo: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: 'white'
    },
    nombre: {
        fontSize: 18,
        color: 'white',
        marginBottom: 10,
    },
    email: {
        fontSize: 18,
        color: 'white',
        marginBottom: 10,
    },
    noPosteos: {
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
        marginTop: 20,
    },
    botonLogout: {
        backgroundColor: 'purple',
        paddingVertical: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    textoLogout: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
});