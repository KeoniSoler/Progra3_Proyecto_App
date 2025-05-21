import { Text, View, StyleSheet } from 'react-native';
import PrimerComponente from './src/components/PrimerComponente';
import Home from './src/screens/Home';

export default function App() {
  return (
    <View style={styles.main}>
      <Text>Arrancamos con React Native</Text>
      {/* <PrimerComponente /> */}
      <Home />
    </View>
  );
}

const styles = StyleSheet.create({
  main:{
    flex: 1
  }
});

