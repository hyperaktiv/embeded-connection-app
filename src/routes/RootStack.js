import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoadingStack from './LoadingStack';
import Open from '../screens/open/Open';
import SignUp from '../screens/signup/SignUp';
import SignIn from '../screens/signin/SignIn';
import BottomTab from './BottomTab';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { observer } from 'mobx-react';
import { useStore } from '../store/useStore';

const Stack = createNativeStackNavigator();

const RootStack = () => {
   const store = useStore();
   const { user } = store;

   const [isExistToken, setIsExistToken] = useState(false);

   useEffect(() => {
      // console.log("store.auth?.accessToken: ", store.auth?.accessToken);

      fetchToken()

      return () => { }
   }, [])

   async function fetchToken() {
      const accessToken = await AsyncStorage.getItem('accessToken');

      console.log("RootStack: ", accessToken);
      if (accessToken) {
         setIsExistToken(true);
      }

   }

   return (
      <LoadingStack>
         <NavigationContainer>
            <Stack.Navigator
               initialRouteName={isExistToken ? "BottomTabContainer" : "Open"}
            >
               <Stack.Screen
                  name="Open"
                  component={Open}
                  options={{
                     title: "",
                     headerTransparent: true,
                     headerShown: false
                  }} />
               <Stack.Screen
                  name="SignUp"
                  component={SignUp}
                  options={{
                     title: 'Đăng ký',
                     headerTitleAlign: 'center'
                  }} />
               <Stack.Screen
                  name="SignIn"
                  component={SignIn}
                  options={{
                     title: 'Đăng nhập',
                     headerTitleAlign: 'center'
                  }} />

               <Stack.Screen
                  name="BottomTabContainer"
                  component={BottomTab}
                  options={{
                     title: '',
                     headerShown: false
                  }}
               />
            </Stack.Navigator>
         </NavigationContainer>
      </LoadingStack>

   )
}
export default RootStack;