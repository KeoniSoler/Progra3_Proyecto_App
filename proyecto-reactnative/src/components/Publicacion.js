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
                <Text style={styles.titulo}> {this.props.data.owner}</Text>
                <Text style={styles.texto}>{this.props.data.texto}</Text>
                {
                    this.state.like ?
                        <TouchableOpacity onPress={() => this.Deslikear()} style={styles.likeContainer}>
                            <FontAwesome name='heart' size={25} color='red' />
                            <Text style={styles.likes}>Likes: {this.state.cantidadLikes}</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={() => this.Likear()} style={styles.likeContainer}>
                            <FontAwesome name='heart-o' size={25} color='white' />
                            <Text style={styles.likes}>Likes: {this.state.cantidadLikes}</Text>
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
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 12,
        margin: 10,
        padding: 15,
        width: 300,
    },
    titulo: {
        fontSize: 20,
        fontWeight: 'normal',
        textAlign: 'center',
        marginBottom: 10,
        color: 'white',
    },
    texto: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color: 'purple',
    },
    likes: {
        fontSize: 16,
        fontWeight: 'normal',
        textAlign: 'center',
        marginBottom: 10,
        color: 'white',
    },
    likeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        justifyContent: 'center',
        gap: 10,
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
        fontSize: 16,
        fontWeight: 'bold',
    },
});