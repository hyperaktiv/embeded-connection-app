import { TouchableOpacity } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import { colors } from '../../constants/colors';
import CustomText from '../../components/CustomText';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const RoomButton = ({ style, roomName, onPress, iconType, iconName }) => {


    const iconElm = (type) => {
        if (type == "antdesign") {
            return <AntDesign name={iconName} size={40} color={colors.grey} />;
        } else if (type == "ionicons") {
            return <Ionicons name={iconName} size={40} color={colors.grey} />;
        } else if (type == "material") {
            return <MaterialCommunityIcons name={iconName} size={40} color={colors.grey} />;
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
            <CustomText t3 text={roomName} style={{ fontWeight: 'bold' }} />
        </TouchableOpacity>
    )
}

RoomButton.propsType = {
    style: PropTypes.object,
    roomName: PropTypes.string,
    iconType: PropTypes.string,
    iconName: PropTypes.string,
    onPress: PropTypes.func,
}

export default RoomButton