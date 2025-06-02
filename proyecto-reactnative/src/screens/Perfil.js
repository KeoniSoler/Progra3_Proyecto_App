import React, {Component} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {auth, db} from '../firebase/config'; 


export default class Perfil extends Component {
    
   
    constructor(props) {
        super(props);
        this.state = {
            usuarios: [],
        };
        
    }  

    componentDidMount() {
        db.collection('users').onSnapshot((docs) => {
            let arrayDocs=[];
            docs.forEach((doc) =>  arrayDocs.push({
                id: doc.id,
                data: doc.data()
            }))
            this.setState({
                usuarios: arrayDocs
            }, ()=> console.log('Este es el state', this.state));
        });
    
    }

    logout(){
        auth.signOut()
            .then(() => {
                this.props.navigation.navigate('Registro');
            })
            .catch(error => console.log('Error al cerrar sesión: ', error));
    }

    render(){

        return(
           <View>
                <Text> Perfil </Text>
                <Text> Nombre usuario </Text>
                <Text> Email </Text>

                <TouchableOpacity
                    onPress={() => this.logout()}
                    >
                    <Text>Cerrar Sesion</Text>
                </TouchableOpacity>
           </View>
        )
    }
        
}