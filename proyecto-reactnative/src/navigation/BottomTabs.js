import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Perfil from '../screens/Perfil';
import Posteo from '../screens/Posteo';
import { FontAwesome} from '@expo/vector-icons'
const Tab = createBottomTabNavigator();

export default function BottomTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name='Home' component={Home} options={{headerShown: false, tabBarIcon: () => <FontAwesome name="home" size={24} color={'black'}/>}}/>
            <Tab.Screen name='Posteo' component={Posteo} options={{headerShown: false, tabBarIcon: () => <FontAwesome name="plus-square-o" size={24} color="black" />}}/>
            <Tab.Screen name='Perfil' component={Perfil} options={{headerShown: false, tabBarIcon: () => <FontAwesome name="male" size={24} color="black" />}}/>
        </Tab.Navigator>
    );
}