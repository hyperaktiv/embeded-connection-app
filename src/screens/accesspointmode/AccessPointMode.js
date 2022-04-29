import React, { useEffect, useState } from 'react';
import CustomText from '../../components/CustomText';
import { View } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import CustomHeaderButton from '../../components/CustomHeaderButton';
import CustomBackground from '../../components/CustomBackground';
import FastImage from 'react-native-fast-image';

const AccessPointMode = () => {
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            title: 'CHẾ ĐỘ ACCESS POINT',
            headerTitleAlign: 'center',
            headerTransparent: false,
            headerLeft: () => <CustomHeaderButton type="goback" onPress={() => navigation.dispatch(CommonActions.goBack())} />,
        })
    }, [])

    return (
        <CustomBackground>
            <CustomText t2
                text={'Kết nối điện thoại với wifi của thiết bị phát ra'}
                style={{
                    marginTop: 20,
                    fontWeight: 'bold',
                    textAlign: 'center'
                }} />
            <CustomText t2
                text={'Mở cài đặt wifi, chọn wifi có dạng SMARTv-xxxx và mật khẩu 11223344 để kết nối với thiết bị'}
                style={{
                    fontWeight: 'bold',
                    textAlign: 'center'
                }} />

            <View style={{
                alignItems: 'center',
                marginVertical: 30
            }}>
                <FastImage
                    source={require('../../resources/images/wifi-config.jpg')}
                    style={{ width: 300, height: 370 }}
                    resizeMode="contain"
                />
            </View>

            <CustomText t3
                text={'Sau khi kết nối wifi xong thì quay lại ứng dụng và tiếp tục'}
                style={{
                    marginTop: 20,
                    textAlign: 'center'
                }} />

        </CustomBackground>
    )
}

export default AccessPointMode