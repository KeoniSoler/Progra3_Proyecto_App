import { Text, View, StyleSheet } from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import PrimerComponente from './src/components/PrimerComponente';
import StackNavigation from './src/navigation/StackNavigation';

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
  );
};

