import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from '../../constants/colors';
import HomeRoom from '../../screens/homeroom/HomeRoom';
import ListRoomButton from '../../screens/listroombutton/ListRoomButton';
import RoomDetail from '../../screens/roomdetail/RoomDetail';
import SelectRoomDevices from '../../screens/selectroomdevices/SelectRoomDevices';

const Stack = createNativeStackNavigator();

const RoomStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="HomeRoom"
            screenOptions={{
                headerStyle: {
                    backgroundColor: colors.headerColor,
                },
                headerTintColor: colors.headerButtonColor,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
        >
            <Stack.Screen
                name="HomeRoom"
                component={HomeRoom}
            />

            <Stack.Screen
                name='ListRoomButton'
                component={ListRoomButton} />

            <Stack.Screen
                name='RoomDetail'
                component={RoomDetail} />

            <Stack.Screen
                name='SelectRoomDevices'
                component={SelectRoomDevices} />



        </Stack.Navigator>
    )
}

export default RoomStack