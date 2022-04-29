import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from '../../constants/colors';
import UserInfor from '../../screens/userinfo/UserInfor';
import EditPassword from '../../screens/editpassword/EditPassword';

const Stack = createNativeStackNavigator();

const UserStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="UserInfor"
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
            <Stack.Screen name="UserInfor" component={UserInfor} />
            <Stack.Screen
                name="EditPassword"
                component={EditPassword}
                options={{
                    title: 'Đổi mật khẩu',
                    headerTitleAlign: 'center',
                    headerTransparent: false,
                }}
            />
        </Stack.Navigator>
    )
}

export default UserStack