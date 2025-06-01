import React, {Component} from "react";
import {Text, View, Image, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity} from "react-native";

class Login extends Component {
    constructor(props) {
        super(props)
    }
    redireccionar(){
        this.props.navigation.navigate('Registro')
    }
    render(){
        <View>
             <TouchableOpacity onPress={() => this.props.redireccionar()}>
                <Text>Registro</Text>
            </TouchableOpacity>
        </View>
    }
}
export default Login;