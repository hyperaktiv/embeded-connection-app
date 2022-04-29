import { View, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import PropTypes from 'prop-types';
import CustomText from './CustomText';
import { colors } from '../constants/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const CustomButton = ({
    title, onPress, buttonStyle, textStyle = {}, buttonType
}) => {

    var buttonColor = '';
    if (buttonType === 'primary') {
        buttonColor = colors.primary1
        Object.assign(textStyle, { color: colors.white })
    } else if ('light') {
        buttonColor = colors.white;
    }

    return (
        <TouchableOpacity
            style={[
                styles.button,
                {
                    marginTop: 20,
                    backgroundColor: buttonColor,
                },
                buttonStyle]}
            onPress={onPress}
        >
            <CustomText text={title} t2 style={textStyle} />
        </TouchableOpacity>
    )
}

CustomButton.propsType = {
    onPress: PropTypes.func,
    title: PropTypes.string,
    buttonStyle: PropTypes.object,
    textStyle: PropTypes.object,
    buttonType: PropTypes.oneOf(['primary', 'light', 'rightIcon']),
}

const styles = StyleSheet.create({
    button: {
        marginVertical: 10,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        width: '100%',
        flexDirection: 'row',
        borderRadius: 8,
    },
    title: {
        textAlign: 'center',
        alignSelf: 'center',
        fontWeight: 'bold',
    }
});


export default CustomButton;