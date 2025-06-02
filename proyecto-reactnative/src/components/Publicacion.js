import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import firebase from 'firebase';
import { auth, db } from '../firebase/config';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


export default class Publicacion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            like: false,
            cantidadLikes: this.props.data.likes ? this.props.data.likes.length : 0
        };
    }
    componentDidMount() {
        if (this.props.data.likes) {

            const cantidadLikes = this.props.data.likes.length;
            const like = this.props.data.likes.includes(auth.currentUser.email);
            this.setState({
                cantidadLikes: cantidadLikes,
                like: like
            })
        }
    }

    Likear() {
        db.collection('posts')
            .doc(this.props.id)
            .update({
                likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
            })
            .then(() => {
                this.setState({
                    cantidadLikes: this.state.cantidadLikes + 1,
                    like: true,
                })
            })
    }

    Deslikear() {
        db.collection('posts')
            .doc(this.props.id)
            .update({
                likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
            })
            .then(() => {
                this.setState({
                    cantidadLikes: this.state.cantidadLikes - 1,
                    like: false,
                })
            })
    }
    borrarPosteo() {
        db.collection('posts')
            .doc(this.props.id)
            .delete()
            .then(() => {
                console.log('El posteo fue eliminado');
            })
            .catch(error => console.log('Error eliminando posteo: ', error));
    }

    render() {
        return (
            <View style={styles.cajaPrincipal}>
                <Text style={styles.titulo}>Publicacion de:{this.props.data.owner}</Text>
                <Text style={styles.texto}>{this.props.data.texto}</Text>
                <Text style={styles.likes}>Likes: {this.props.data.cantidadLikes}</Text>
                {
                    this.state.like ?
                        <TouchableOpacity onPress={() => this.Deslikear()}>
                            <FontAwesome name='heart' size={25} color='red' />
                        </TouchableOpacity> :
                        <TouchableOpacity onPress={() => this.Likear()}>
                            <FontAwesome name='heart-o' size={25} color='black' />
                        </TouchableOpacity>
                }
                <TouchableOpacity onPress={() => this.borrarPosteo()} style={styles.borrar}>
                    <Text style={styles.borrarTexto}>Borrar</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    cajaPrincipal: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: 'black',
    },
    titulo: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
        color: 'white',
    },
    texto: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 20,
        color: 'white',
    },
    likes: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
        color: 'white',
    },
    borrar: {
        backgroundColor: 'purple',
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    borrarTexto: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

