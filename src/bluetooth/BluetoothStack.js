import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import Device from './screens/Device';

const Stack = createNativeStackNavigator();

const BluetoothStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator mode="card">
                <Stack.Screen name="HomeBlt" component={Home} />
                <Stack.Screen name="DeviceBlt" component={Device} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default BluetoothStack