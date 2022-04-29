import { View, TextInput, StyleSheet, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, CommonActions } from '@react-navigation/native';
import CustomBackground from '../../components/CustomBackground';
import CustomHeaderButton from '../../components/CustomHeaderButton';
import CustomText from '../../components/CustomText';
import CustomButton from '../../components/CustomButton';
import LoadingOverlay from '../../components/LoadingOverlay';

import { colors } from '../../constants/colors';
import { updatePassword } from '../../APIs';

const EditPassword = () => {
    const navigation = useNavigation();

    const [oldPassword, setOldPassword] = useState('0123456');
    const [newPassword, setNewPassword] = useState('12345678');
    const [confirmNewPassword, setConfirmNewPassword] = useState('12345678');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        navigation.setOptions({
            title: 'ĐỔI MẬT KHẨU',
            headerTitleAlign: 'center',
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

    const onSubmit = () => {
        setLoading(true);
        Keyboard.dismiss();

        if (password < 6) {
            setError('Password must be more than 6 characters.');
            setLoading(false);
        } else if (password !== confirmPassword) {
            setError('Password must be confirmation.');
            setLoading(false);
        } else {
            // const response = await updatePassword(password, password);
            // if (response.__typename !== 'ErrorResponse') {
            //   Alert.alert(
            //     "",
            //     "Đã đổi mật khẩu thành công. Hãy đăng nhập để tiếp tục",
            //     [{ text: "OK", onPress: () => navigation.navigate("SignIn") }]
            //   );
            // navigation.navigate('UserInfor')
            //   }
            // }
        }

        setLoading(false);
    }

    return (
        <CustomBackground>

            <CustomText t2
                text="Địa chỉ Email:"
                style={{ color: colors.neutral2, marginVertical: 20 }} />
            <View style={styles.inputSection}>
                <TextInput
                    editable={false}
                    selectTextOnFocus={false}
                    value={'abcd@gmail.com'}
                    style={styles.inputStyle}
                />
            </View>

            <CustomText t2
                text="Mật khẩu cũ:"
                style={{ color: colors.neutral2, marginVertical: 20 }} />
            <View style={styles.inputSection}>
                <TextInput
                    value={oldPassword}
                    onChangeText={(text) => setOldPassword(text)}
                    secureTextEntry
                    maxLength={10}
                    style={styles.inputStyle}
                />
            </View>

            <CustomText t2
                text="Mật khẩu mới:"
                style={{ color: colors.neutral2, marginVertical: 20 }} />
            <View style={styles.inputSection}>
                <TextInput
                    value={newPassword}
                    onChangeText={(text) => setNewPassword(text)}
                    secureTextEntry
                    maxLength={10}
                    style={styles.inputStyle}
                />
            </View>

            <CustomText t2
                text="Xác nhận mật khẩu mới:"
                style={{ color: colors.neutral2, marginVertical: 20 }} />
            <View style={styles.inputSection}>
                <TextInput
                    value={confirmNewPassword}
                    onChangeText={(text) => setConfirmNewPassword(text)}
                    secureTextEntry
                    maxLength={10}
                    style={styles.inputStyle}
                />
            </View>

            <CustomText text={error.toString()} t2 style={{ color: 'red', }} />

            <CustomButton
                title="Submit"
                buttonType="primary"
                onPress={onSubmit}
            />

            <LoadingOverlay loading={loading} />

        </CustomBackground >
    )
}

const styles = StyleSheet.create({
    inputSection: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginBottom: 15,
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

export default EditPassword