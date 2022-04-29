import { CommonActions, useNavigation } from '@react-navigation/native';
import { View, TextInput, StyleSheet, Keyboard } from 'react-native';
import React, { useState, useEffect } from 'react';
import CustomBackground from '../../components/CustomBackground';
import LoadingOverlay from '../../components/LoadingOverlay';
import CustomHeaderButton from '../../components/CustomHeaderButton';
import CustomText from '../../components/CustomText';
import CustomButton from '../../components/CustomButton';
import { colors } from '../../constants/colors';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginApp } from '../../APIs';
import { useStore } from '../../store/useStore';

const SignIn = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const store = useStore();

  useEffect(() => {
    navigation.setOptions({
      headerTransparent: false,
      headerLeft: () => <CustomHeaderButton type="goback" onPress={() => navigation.dispatch(CommonActions.goBack())} />
    })

    return () => {
      setUsername('');
      setPassword('');
      setLoading(false);
    }
  }, [])

  const onLogin = async () => {

    try {

      setLoading(true);
      Keyboard.dismiss();

      const response = await loginApp(username, password);

      if (response.__typename !== 'ErrorResponse') {

        await AsyncStorage.setItem('accessToken', response.accessToken);
        await AsyncStorage.setItem('userData', JSON.stringify(response));

        console.log("onLogin: ", JSON.stringify(response));

        store.saveUser(JSON.stringify(response));
        store.saveAuth({
          accessToken: response.accessToken,
          __typename: 'Auth',
          expires_in: 360000,
        });

        setLoading(false);

        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'BottomTabContainer' }]
          })
        );
      }

      setLoading(false);

    } catch (error) {
      console.log("Error when onLogin: " + error);
      setLoading(false);
    }

  }

  return (
    <CustomBackground>

      <CustomText t2
        text="Nhập username:"
        style={{ color: colors.neutral2, marginVertical: 20 }} />
      <View style={styles.inputSection}>
        <TextInput
          value={username}
          onChangeText={(text) => setUsername(text)}
          placeholder="username"
          style={styles.inputStyle}
        />
      </View>

      <CustomText t2
        text="Nhập mật khẩu:"
        style={{ color: colors.neutral2, marginVertical: 20 }} />
      <View style={styles.inputSection}>
        <TextInput
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
          maxLength={10}
          placeholder="Nhập mật khẩu"
          style={styles.inputStyle}
        />
      </View>

      <CustomButton
        title="Đăng nhập"
        buttonType="primary"
        onPress={onLogin}
      />

      <LoadingOverlay loading={loading} />
    </CustomBackground>
  );
}

const styles = StyleSheet.create({
  inputSection: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.neutral2,
    height: 50,
    borderRadius: 12,
    alignItems: 'center'
  },
  inputStyle: {
    color: colors.neutral1,
    fontSize: 18,
    paddingHorizontal: 10,
    width: '100%'
  }
});

export default SignIn;