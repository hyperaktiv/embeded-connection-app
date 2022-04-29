import { useNavigation, CommonActions } from '@react-navigation/native';
import { View, StyleSheet, TextInput, Keyboard, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomBackground from '../../components/CustomBackground';
import CustomText from '../../components/CustomText';
import CustomHeaderButton from '../../components/CustomHeaderButton';
import CustomButton from '../../components/CustomButton';
import LoadingOverlay from '../../components/LoadingOverlay';
import { colors } from '../../constants/colors';

import { register } from '../../APIs';

const SignUp = () => {

  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerTransparent: false,
      headerLeft: () => <CustomHeaderButton type="goback" onPress={() => navigation.dispatch(CommonActions.goBack())} />
    })

    return () => {
      setUsername('');
      setPassword('');
      setConfirmPassword('');
      setError('');
      setLoading(false);
    }
  }, [])

  const onSignUp = async () => {
    setLoading(true);
    Keyboard.dismiss();

    if (password.length < 6) {
      setError('Mật khẩu phải nhiều hơn 6 ký tự.');
      setPassword('');
      setLoading(false);
    } else if (password !== confirmPassword) {
      setError('Mật khẩu phải được xác nhận trùng khớp.');
      setLoading(false);
    } else {

      const response = await register(username, password);
      console.log(response);
      if (response.__typename !== 'ErrorResponse') {
        Alert.alert(
          "",
          "Đã đăng ký thành công tài khoản. Hãy đăng nhập để tiếp tục",
          [{ text: "OK", onPress: () => navigation.navigate("SignIn") }]
        );
      }

    }


    setLoading(false);
  }

  return (
    <CustomBackground>

      <CustomText t2
        text="Nhập username:"
        style={{ color: colors.neutral2, marginVertical: 20 }} />
      <View style={styles.inputSection}>
        <TextInput
          value={username}
          placeholder={'username'}
          onChangeText={(text) => setUsername(text)}
          style={styles.inputStyle}
        />
      </View>

      <CustomText t2
        text="Nhập mật khẩu:"
        style={{ color: colors.neutral2, marginVertical: 20 }} />
      <View style={styles.inputSection}>
        <TextInput
          value={password}
          placeholder={'nhập mật khẩu'}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
          maxLength={10}
          style={styles.inputStyle}
        />
      </View>

      <CustomText t2
        text="Nhập lại mật khẩu:"
        style={{ color: colors.neutral2, marginVertical: 20 }} />
      <View style={styles.inputSection}>
        <TextInput
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          secureTextEntry
          maxLength={10}
          placeholder="xác nhận mật khẩu"
          style={styles.inputStyle}
        />
      </View>

      <CustomText text={error.toString()} t2 style={{ color: 'red', }} />

      <CustomButton
        title="Đăng ký"
        buttonType="primary"
        onPress={onSignUp}
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

export default SignUp;