import React, { Component } from "react";
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { auth } from "../firebase/config";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      contraseña: '',
      error: '',
    };
  }

  loginUsuario(email, contraseña) {
    if (email !== '' && contraseña !== '') {
      auth.signInWithEmailAndPassword(email, contraseña)
        .then(() => {
          this.props.navigation.navigate('BottomTabs');
        })
        .catch(err => {
          this.setState({ error: 'Email o contraseña incorrectos' });
        });
    } else {
      this.setState({ error: 'Completá todos los campos' });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Iniciar Sesión</Text>

        {this.state.error !== '' && (
          <Text style={styles.errorText}>{this.state.error}</Text>
        )}

        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={this.state.email}
          onChangeText={(texto) => this.setState({ email: texto, error: '' })}
        />

        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry={true}
          value={this.state.contraseña}
          onChangeText={(texto) => this.setState({ contraseña: texto, error: '' })}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => this.loginUsuario(this.state.email, this.state.contraseña)}
        >
          <Text style={styles.buttonText}>Ingresar</Text>
        </TouchableOpacity>

        <View style={styles.registerLinkContainer}>
          <Text style={styles.registerText}>¿No tenés cuenta?</Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Registro')}>
            <Text style={styles.registerLink}>Registrate</Text>
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
    backgroundColor: '#28a745',
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
  registerLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  registerText: {
    color: '#555',
    marginRight: 5,
  },
  registerLink: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
});

export default Login;