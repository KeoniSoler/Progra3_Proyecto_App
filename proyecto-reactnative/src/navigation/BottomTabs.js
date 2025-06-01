import { View, Text } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feed from '../screens/Feed';
import Perfil from '../screens/Perfil';
import Posteo from '../screens/Posteo';
import { FontAwesome} from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons/FontAwesome';
const Tab = createBottomTabNavigator();

export default function BottomTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name='Feed' component={Feed} options={{tabBarIcon: () => <FontAwesome name="home" size={24} color={'black'}/>}}/>
            <Tab.Screen name='Perfil' component={Perfil } options={{tabBarIcon: () => <FontAwesome name="male" size={24} color="black" />}}/>
            <Tab.Screen name='Posteo' component={Posteo} options={{tabBarIcon: () => <FontAwesome name="plus-square-o" size={24} color="black" />}}/>
        </Tab.Navigator>
    );
}