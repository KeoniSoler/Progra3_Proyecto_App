import React, {Component} from "react";
import {Text, View, Image, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity} from "react-native";


class Registro extends Component {
    constructor(props) {
        super(props)
    }
    redireccionar(){
        this.props.navigation.navigate('Login', {id: 999})
    }
    render(){
        <View>
             <TouchableOpacity onPress={() => this.props.redireccionar()}>
                <Text>Login</Text>
            </TouchableOpacity>
        </View>
    }
}
export default Registro;