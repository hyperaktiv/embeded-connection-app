import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import UserStack from './StackScreen/UserStack';
import RoomStack from './StackScreen/RoomStack';
import DeviceTabStack from './StackScreen/DeviceTabStack';

const Tab = createBottomTabNavigator();

export default function BottomTab() {

    return (
        <Tab.Navigator
            initialRouteName="BottomTabContainer"
            screenOptions={{
                activeTintColor: '#e91e63',
                keyboardHidesTabBar: true,
                headerShown: false,
            }}
        >
            <Tab.Screen
                name="RoomTab"
                component={RoomStack}
                options={{
                    tabBarLabel: 'Phòng',
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="home" color={color} size={size} />
                    )
                }} />
            <Tab.Screen
                name="DevicesTab"
                component={DeviceTabStack}
                options={{
                    tabBarLabel: 'Thiết bị',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="device-hub" color={color} size={size} />
                    )
                }} />
            <Tab.Screen
                name="AccountTab"
                component={UserStack}
                options={{
                    tabBarLabel: 'Tài khoản',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="user-o" color={color} size={size} />
                    )
                }} />

        </Tab.Navigator>
    )
}