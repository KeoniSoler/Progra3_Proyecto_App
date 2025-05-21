import React, {Component} from "react";
import {Text, View, Image, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity} from "react-native";

class Home extends Component {
    constructor(props) {
        super(props)
    }
    redireccionar(){
        this.props.navigation.navigate('Login')
    }
    render(){
        return(
            <View>
                <TouchableOpacity onPress={() => this.props.redireccionar()}>
                    <Text>Login</Text>
                </TouchableOpacity>
                <ActivityIndicator
                    color={'red'}
                    size={30}
                />
                <Text>Home</Text>
                <Image
                style={styles.imagen1}
                source={require('../../assets/imagen.png')}
                resizeMode="contain"
                />
                 <Image
                style={styles.imagen1}
                source={{uri: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fes.wikipedia.org%2Fwiki%2FCubo_de_Rubik&psig=AOvVaw3rDAeRmF8EB1FaP28TrWUO&ust=1747845578245000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCNDjqKe-so0DFQAAAAAdAAAAABAE"}}
                resizeMode="cover"
                />
            </View>
        )
    }

}
const styles = StyleSheet.create({
    imagen1:{
        height: 200,
        width: 200,
    }
});
export default Home;
