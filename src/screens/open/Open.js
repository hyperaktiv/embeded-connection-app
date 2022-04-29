import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import CustomBackground from '../../components/CustomBackground';
import CustomButton from '../../components/CustomButton';

const Open = () => {
    const navigation = useNavigation();

    return (
        <CustomBackground>
            <View style={{ marginVertical: 80 }}>
                <View style={{ alignItems: 'center' }}>
                    <FastImage
                        source={require('../../resources/images/logo.png')}
                        style={{ width: 200, height: 200 }}
                        resizeMode="contain"
                    />
                </View>

                <View style={{ marginVertical: 80 }}>
                    <CustomButton
                        onPress={() => navigation.navigate("SignIn")}
                        buttonType="primary"
                        title="Đăng Nhập"
                    />
                    <CustomButton
                        onPress={() => navigation.navigate("SignUp")}
                        buttonType="light"
                        title="Chưa có tài khoản? Đăng ký"
                    />
                </View>

            </View>
        </CustomBackground>
    )
}
export default Open;