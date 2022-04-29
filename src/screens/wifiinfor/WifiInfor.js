import { View, Text, Dimensions, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react';
import { useNavigation, CommonActions } from '@react-navigation/native';
import CustomHeaderButton from '../../components/CustomHeaderButton';
import CustomBackground from '../../components/CustomBackground';
import CustomText from '../../components/CustomText';
import CustomButton from '../../components/CustomButton';
import { colors } from '../../constants/colors';
import WifiInput from './WifiInput';
import LoadingOverlay from '../../components/LoadingOverlay';

const WifiInfor = () => {
    const navigation = useNavigation();
    const [inputs, setInputs] = useState({ wifiuid: '', wifipwdid: '' });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        navigation.setOptions({
            title: 'THÔNG TIN WIFI',
            headerTitleAlign: 'center',
            headerTransparent: false,
            headerLeft: () => <CustomHeaderButton type="goback" onPress={() => navigation.dispatch(CommonActions.goBack())} />,
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

    const handleConnectWifi = () => {
        Keyboard.dismiss();
        setLoading(true);

        let isValid = true;
        if (!inputs.wifiuid) {
            handleError('Hãy nhập Wifi ID', 'wifiuid');
            isValid = false;
        }
        if (!inputs.wifipwdid) {
            handleError('Hãy nhập Wifi password', 'wifipwdid');
            isValid = false;
        }
        if (isValid) {
            // login to wifi
            console.log(inputs.wifiuid, inputs.wifipwdid)
            navigation.navigate('AccessPointMode')
        }

        setLoading(false);
    }

    const handleOnChangeInput = (text, input) => {
        setInputs(prevState => ({ ...prevState, [input]: text }));
    };

    const handleError = (error, input) => {
        setErrors(prevState => ({ ...prevState, [input]: error }));
    }

    return (
        <CustomBackground>

            <CustomText t2
                text={'Đăng nhập điện thoại này vào wifi mà bạn muốn kết nối'}
                style={{ fontSize: 17, textAlign: 'center', marginVertical: 20 }} />


            <WifiInput
                headIcon={'wifi-arrow-up-down'}
                footIcon={'connection'}
                placeholder="Wifi ID"
                onChangeText={text => handleOnChangeInput(text, 'wifiuid')}
                error={errors.wifiuid}
            />

            <WifiInput
                headIcon={'lock-outline'}
                password={true}
                placeholder="Wifi password"
                onChangeText={text => handleOnChangeInput(text, 'wifipwdid')}
                error={errors.wifipwdid}
            />

            <CustomButton
                title="XÁC NHẬN"
                buttonType="primary"
                onPress={() => {
                    console.log('wifi continue');
                    handleConnectWifi()
                }}
            />

            <LoadingOverlay loading={loading} />

        </CustomBackground>
    )
}

export default WifiInfor