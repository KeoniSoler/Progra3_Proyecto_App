import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Registro from "../screens/Registro";
import Login from "../screens/Login";

const Stack =   createNativeStackNavigator();

function StackNavigation() {
    return(
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
            <Stack.Screen name="Registro" component={Registro} options={{headerShown: false}}/>
            <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
        </Stack.Navigator>
    )
}
export default StackNavigation;