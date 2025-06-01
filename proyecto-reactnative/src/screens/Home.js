import React, { Component } from "react";
import { View, Text, Image, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from "react-native";

class Home extends Component {
    constructor(props) {
        super(props)
    }
    redireccionar(pantalla) {
        this.props.navigation.navigate(pantalla)
    }
    render() {
        return (
            <View style={styles.contenedor}>
                <TouchableOpacity onPress={() => this.redireccionar('Login')}>
                    <Text>Login</Text>
                </TouchableOpacity>
                <ActivityIndicator
                    color={'red'}
                    size={40}
                />
                <Text>Home</Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    contenedor:{
        flex: 1
    },
    imagen1: {
        height: 200,
        width: 200,
    }
});
export default Home;
