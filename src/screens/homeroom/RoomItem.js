import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react';
import PropTypes from 'prop-types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import CustomText from '../../components/CustomText';
import { colors } from '../../constants/colors';


const RoomItem = ({ style, roomName, onPress }) => {
    return (
        <TouchableOpacity
            style={[{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 20,
                marginTop: 20,
                borderWidth: 1,
                borderColor: colors.grey,
                borderRadius: 10,
                width: '100%',
                height: 80
            }, style]}
            onPress={onPress}
        >
            <View>
                <CustomText t2
                    text={roomName}
                    style={{
                        fontWeight: 'bold',
                        fontSize: 18,
                        color: 'blue'
                    }} />
                <CustomText s text={'1 thiết bị'} style={{ marginTop: 5 }} />
            </View>

            <MaterialCommunityIcons name='connection' size={30} color={colors.grey} />
        </TouchableOpacity>
    )
}

RoomItem.propsType = {
    style: PropTypes.object,
    roomName: PropTypes.string,
    onPress: PropTypes.func,
}

export default RoomItem