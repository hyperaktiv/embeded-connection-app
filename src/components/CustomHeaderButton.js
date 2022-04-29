import React from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { colors } from '../constants/colors';

const CustomHeaderButton = ({ style, onPress, children, type }) => {

    if (type === 'goback')
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                style={[{ width: 30, height: 30 }, style]}
                onPress={onPress}
            >
                <AntDesign name='arrowleft' size={30} color={colors.headerBackButton} />
            </TouchableOpacity>
        )

    if (type === 'rightButton')
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                style={[{ width: 30, height: 30 }, style]}
                onPress={onPress}
            >
                {children}
            </TouchableOpacity>
        )
}
CustomHeaderButton.propsType = {
    style: PropTypes.object,
    onPress: PropTypes.func,
    type: PropTypes.oneOf(['goback', 'button']),
    children: PropTypes.node
}
export default CustomHeaderButton;