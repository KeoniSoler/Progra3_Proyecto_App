import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';

class PrimerComponente extends Component {
    constructor(props) {
        super(props);
    }
    touchUsuario(){
        console.log('Usuario toco');
    }
    longTouchUsuario(){
        console.log('Usuario toco largo');
    }

    render(){
        return(
            <View style={styles.contenedor}>
                <View style={styles.subcontenedor1}>
                    <TouchableOpacity onPress={() => this.touchUsuario()} onLongPress={() => this.longTouchUsuario()}>
                        <Text style={styles.texto}>Hola, soy un componente de clase</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.subcontenedor2}>
                    <Text> Otro texto </Text>
                </View>
                
            </View>
        )
    }
}
const styles = StyleSheet.create(
    { //Recibe objeto literal
        contenedor: {
            backgroundColor: 'blue',
            flex: 1,
        },
        subcontenedor1: {
            backgroundColor: 'pink',
            flex: 2,
        },
        subcontenedor2: {
            backgroundColor: 'blue',
            flex: 1,
        },
        texto: {
            fontSize: 20,
            color: 'white',
        },
});
export default PrimerComponente;