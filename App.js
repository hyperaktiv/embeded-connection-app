/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StatusBar, View, LogBox } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RootStack from './src/routes/RootStack';

import { AuthStore } from './src/store/authStore';
import { StoreProvider } from './src/store/storeContext';

// LogBox.ignoreLogs(['MapView'])
// LogBox.ignoreLogs(['If'])
LogBox.ignoreLogs(["EventEmitter.removeListener"]);

const authStore = new AuthStore();

const App = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loading) {
      loadStore();
    }
  }, [])

  const loadStore = async () => {
    setLoading(true);

    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const userData = await AsyncStorage.getItem('userData');

      console.log("loadStore: ", accessToken);

      if (accessToken !== null || userData !== null) {
        // We have data!!
        console.log("aasdw123", JSON.stringify(userData), accessToken);

        authStore.saveUser(userData);
        authStore.saveAuth({
          accessToken,
          __typename: 'Auth',
          expires_in: 360000,
        });

      }

      // if (token) {
      //   const response = await getMe();
      //   if (response.__typename !== 'ErrorResponse') {
      //   }
      // }

    } catch (error) {
      console.log("Error to get data from AsyncStorage: ", error);
      setLoading(false);
    }


  }

  if (loading) return <ActivityIndicator size="large" animating />;
  return (
    <StoreProvider store={authStore}>
      <View style={{ flex: 1 }}>
        <RootStack />
        <StatusBar barStyle={'light-content'} />
      </View>
    </StoreProvider>
  )

};

export default App;