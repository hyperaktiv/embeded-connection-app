import { TouchableOpacity } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import { colors } from '../../constants/colors';
import CustomText from '../../components/CustomText';

import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const DeviceItem = ({ style, deviceName, onPress, iconType, iconName }) => {

    const iconElm = (type) => {
        if (type == "entypo") {
            return <Entypo name={iconName} size={45} color={colors.grey} />;
        } else if (type == "ionicons") {
            return <Ionicons name={iconName} size={45} color={colors.grey} />;
        } else if (type == "material") {
            return <MaterialCommunityIcons name={iconName} size={45} color={colors.grey} />;
        }
    }

    return (
        <TouchableOpacity
            style={[{
                borderWidth: 1,
                borderColor: colors.grey,
                padding: 5,
                alignItems: 'center',
                justifyContent: 'space-around',
                borderRadius: 10
            }, style]}
            onPress={onPress}
        >
            {iconElm(iconType)}
            <CustomText t3 text={deviceName} style={{ fontWeight: 'bold' }} />
        </TouchableOpacity>
    )
}

DeviceItem.propsType = {
    style: PropTypes.object,
    deviceName: PropTypes.string,
    iconType: PropTypes.string,
    iconName: PropTypes.string,
    onPress: PropTypes.func,
}

export default DeviceItem