import React, {Component} from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput} from "react-native";
import { auth, db } from '../firebase/config';


export default class Posteo extends Component {
  
  constructor(props) {
    super(props);
    this.state={
      comments: '',
      error: false,
      mensajeError: '',
    }
  }

  nuevoPost(){
    if (this.state.comments !== '') {
      db.collection('posts').add({
        owner: auth.currentUser.email,
        comments: this.state.comments,
        createdAt: Date.now(),
        likes: [],
      })
      .then(() => {
        this.setState({comments:''})
        this.props.navigation.navigate('Feed');
      })
      .catch(error => {
                console.log('error: ', error);
                this.setState({ error: true, mensajeError: error.message });
                });

      
    }
  }
  
  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Crear un nuevo posteo</Text>
          <View>
            <TextInput
              style={styles.input}
              keyboardType='default'
              value={this.state.comments}
              onChangeText={(texto) => this.setState({ comments: texto, error: false})}
              placeholder='Subite algo!'
            />
            <TouchableOpacity style={styles.button} onPress={() => this.nuevoPost()}>
              <Text style={styles.buttonText}>Publicar</Text>
            </TouchableOpacity>
          </View>
      </View>
    );

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    marginBottom: 15,
    height: 120,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: 'purple',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
  
});