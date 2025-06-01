import React, {Component} from "react";
import {Text, View, Image, StyleSheet, TextInput, FlatList, ActivityIndicator, TouchableOpacity} from "react-native";
import {auth, db} from '../firebase/config'; 

class Registro extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email:'',
            contraseña:'',
            username:'',
            error: false,
            mensajeError: '',
        }
    }

    componentDidMount(){
        auth.onAuthStateChanged((user) => {
            if(user){
                this.props.navigation.navigate('BottomTabs')
            }
        })
    }
    registrarUsuario(email, contraseña, username){
        if((
            email !=='' && contraseña !== '' && username !== ''
           )
           &&
            contraseña.length >= 6
            &&
            email.includes('@')
            &&
            username.length >= 5
        ){
            auth.createUserWithEmailAndPassword(email, contraseña)
                .then(() => {

                    db.collection('users').add({
                        owner: email,
                        createdAt: Date.now(), 
                        updateAt: Date.now(), 
                        username: username

                    })
                    .then(()=> {this.props.navigation.navigate('BottomTabs')} )  
                })
                .catch(
                  error => {console.log('error: ', error);
                  this.setState({ error: true, mensajeError: error.message });
                });
        }}
    render(){
        return (
        
        <View style={styles.container}>
             <Text style={styles.title} >Registro</Text>
             
             <TextInput
                style={styles.input}
                keyboardType='default'
                value={this.state.email}
                onChangeText={(texto) => this.setState({email: texto, error: false})}
                placeholder='Ingrese su email'
             
             />

             <TextInput
                style={styles.input}
                keyboardType='default'
                value={this.state.contraseña}
                onChangeText={(texto) => this.setState({contraseña: texto, error: false})}
                placeholder='Ingrese su contraseña'
                secureTextEntry={true}
             />

             <TextInput
                style={styles.input}
                keyboardType='default'
                value={this.state.username}
                onChangeText={(texto) => this.setState({username: texto, error: false})}
                placeholder='Ingrese su nombre de usuario'
                
             
             />

             <TouchableOpacity
                style={styles.button}
                onPress={()=> this.registrarUsuario(this.state.email, this.state.contraseña, this.state.username)}>
             
                <Text style={styles.buttonText} >Registrarse</Text>
             </TouchableOpacity>

             {this.state.error && (
              <Text style={styles.errorText}>{this.state.mensajeError}</Text>
             )}


             <View style={styles.loginLinkContainer}>
                       <Text style={styles.loginText}>¿No tenés cuenta?</Text>
                       <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                         <Text style={styles.loginLink}>Iniciar seción</Text>
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
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    fontSize: 16,
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
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 15,
    textAlign: 'center',
  },
  loginLinkContainer: {
  flexDirection: 'row',
  justifyContent: 'center',
  marginTop: 20,
},
loginText: {
  color: '#555',
  marginRight: 5,
},
loginLink: {
    color: '#007BFF',
    fontWeight: 'bold',
  },

});
export default Registro;