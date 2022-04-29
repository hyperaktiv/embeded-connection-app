import { View, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation, CommonActions } from '@react-navigation/native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomBackground from '../../components/CustomBackground';
import CustomText from '../../components/CustomText';
import CustomButton from '../../components/CustomButton';

import { colors } from '../../constants/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { } from '../../APIs';

export default function UserInfor() {
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            title: 'Thông tin tài khoản',
            headerTitleAlign: 'center',
            headerTransparent: false,
            headerRight: () => (
                <View
                    style={{
                        height: 80,
                        width: 60,
                    }}
                >
                </View>
            )
        })
    }, [])

    const onLogout = async () => {
        await AsyncStorage.multiRemove(['accessToken', 'userData'], function () {
            navigation.dispatch(CommonActions.reset({
                index: 0,
                routes: [{ name: 'Open' }]
            }));
        });
    }


    return (
        <CustomBackground>
            <View style={{
                marginVertical: 20,
                alignItems: 'center'
            }}>
                <FontAwesome name='user-circle-o' color={'gray'} size={100} />

                <CustomText t1
                    text='abcd@gmail.com'
                    style={{ color: colors.black, marginTop: 30 }} />
            </View>

            <View>
                <CustomButton
                    title="Đổi mật khẩu"
                    buttonType="light"
                    onPress={() => navigation.navigate("EditPassword")}
                    textStyle={{ color: colors.blue }}
                />

                <CustomButton
                    title="ĐĂNG XUẤT"
                    buttonType="light"
                    buttonStyle={{ borderWidth: 0.3 }}
                    textStyle={{ color: 'red', fontSize: 18 }}
                    onPress={onLogout}
                />
            </View>


        </CustomBackground>
    )
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