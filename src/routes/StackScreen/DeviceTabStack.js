import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DeviceTab from '../../screens/devicetab/DeviceTab';
import SelectDevicesTab from '../../screens/selectdevicestab/SelectDevicesTab';
import WifiInfor from '../../screens/wifiinfor/WifiInfor';
import AccessPointMode from '../../screens/accesspointmode/AccessPointMode';
import { colors } from '../../constants/colors';

const Stack = createNativeStackNavigator();

const DeviceTabStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="DeviceTab"
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
                name='DeviceTab'
                component={DeviceTab} />

            <Stack.Screen
                name='SelectDevicesTab'
                component={SelectDevicesTab} />

            <Stack.Screen
                name='WifiInfor'
                component={WifiInfor} />
            <Stack.Screen
                name='AccessPointMode'
                component={AccessPointMode} />
        </Stack.Navigator>
    )
}

export default DeviceTabStack