import { View, TouchableOpacity, TextInput, StyleSheet, Text } from 'react-native';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../constants/colors';

const WifiInput = ({ headIcon, footIcon, style, password, error, ...props }) => {

    const [hidePassword, setHidePassword] = React.useState(password);

    return (
        <View style={{ marginBottom: 10 }}>
            <View style={styles.inputSection}>
                {headIcon && (
                    <MaterialCommunityIcons
                        name={headIcon}
                        size={26}
                        color={colors.grey}
                        style={{ marginLeft: 5 }}
                    />
                )}

                <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    clearButtonMode="always"
                    secureTextEntry={hidePassword}
                    style={styles.inputStyle}
                    {...props}
                />

                {password && (
                    <TouchableOpacity
                        onPress={() => setHidePassword(!hidePassword)}
                    >
                        <MaterialCommunityIcons
                            name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
                            size={28}
                            color={colors.grey}
                        />
                    </TouchableOpacity>

                )}

                {footIcon && (
                    <MaterialCommunityIcons
                        name={footIcon}
                        size={26}
                        color={colors.grey}
                    />
                )}
            </View>

            {error && (
                <Text style={{ color: 'red', fontSize: 14, marginBottom: 10 }}>
                    {error}
                </Text>
            )}
        </View>
    )
}
const styles = StyleSheet.create({
    inputSection: {
        flexDirection: 'row',
        paddingHorizontal: 5,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: colors.neutral2,
        height: 50,
        borderRadius: 5,
        alignItems: 'center'
    },
    inputStyle: {
        color: colors.neutral1,
        fontSize: 16,
        paddingHorizontal: 10,
        marginHorizontal: 5,
        width: '80%'
    }
});
WifiInput.propsType = {
    headIcon: PropTypes.string,
    footIcon: PropTypes.string,
    password: PropTypes.bool,
    error: PropTypes.string,
    style: PropTypes.object,
}
export default WifiInput