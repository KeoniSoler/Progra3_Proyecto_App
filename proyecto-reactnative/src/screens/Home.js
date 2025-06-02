import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet, ImageBackground } from 'react-native';
import { auth, db } from '../firebase/config';
import Publicacion from '../components/Publicacion';


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loader: true,
    };
  }
  componentDidMount() {
    db.collection('posts')
      .orderBy('createdAt', 'desc')
      .onSnapshot((docs) => {
        let posts = [];
        docs.forEach((doc) => {
          posts.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        this.setState({
          posts: posts,
          loader: false
        });
      });
  }
  render() {
    return (
      <ImageBackground
        source={{ uri: 'https://wallpapers-clan.com/wp-content/uploads/2023/09/glowing-up-not-giving-up-purple-black-background-scaled.jpg' }}
        style={styles.fondo}
        resizeMode="cover"
      >
        <View style={styles.cajaPrincipal}>
          <Text style={styles.home}>Home</Text>
          {
            this.state.loader ? <ActivityIndicator size='large' color="purple" />
              :
              <FlatList
                data={this.state.posts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <Publicacion data={item.data} id={item.id} />}
              />
          }
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
  home: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: 'white'
  },

});