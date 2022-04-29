import React from 'react';
import { View, TouchableOpacity } from 'react-native'
import { colors } from '../../constants/colors';
import PropTypes from 'prop-types';
import CustomText from '../../components/CustomText';
import FastImage from 'react-native-fast-image';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';


const RoomDeviceBtn = ({
    device,
    style,
    imageSrc,
    onPress,
    isCheckBoxBtn = false,
    selectedDeviceList,
    onChangeCheckBox
}) => {

    if (isCheckBoxBtn) {
        let isSelected = selectedDeviceList && (selectedDeviceList?.indexOf(device.id.toString()) > -1 || selectedDeviceList?.indexOf(device.id) > -1);

        return (
            <TouchableOpacity
                style={[{
                    backgroundColor: isSelected ? 'oldlace' : 'white',
                    paddingVertical: 10,
                    paddingHorizontal: 15,
                    borderWidth: 1,
                    borderColor: colors.grey,
                    borderRadius: 7
                }, style]}
                onPress={() => {
                    let index = selectedDeviceList ? selectedDeviceList?.findIndex((i) => i == device.id) : -1;
                    if (index === -1) {
                        onChangeCheckBox([...selectedDeviceList, device.id]);
                    } else {
                        onChangeCheckBox(selectedDeviceList?.filter((i) => i != device.id));
                    }
                }}
            >
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <FastImage
                        source={imageSrc}
                        style={{ width: 50, height: 50 }}
                        resizeMode="contain"
                    />

                    {isCheckBoxBtn && (
                        <View>
                            {isSelected ? (
                                <Ionicons name='checkmark-done' size={30} color={colors.black} />
                            ) : (
                                <Entypo name='plus' size={30} color={colors.black} />
                            )}
                        </View>
                    )}
                </View>

                <CustomText t3
                    text={device?.roomDeviceName}
                    style={{
                        fontWeight: 'bold',
                        fontSize: 16,
                        marginTop: 5
                    }} />
            </TouchableOpacity>
        )
    }

    return (
        <TouchableOpacity
            style={[{
                backgroundColor: colors.white,
                paddingVertical: 10,
                paddingHorizontal: 15,
                borderWidth: 1,
                borderColor: colors.grey,
                borderRadius: 7
            }, style]}
            onPress={onPress}
        >
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <FastImage
                    source={imageSrc}
                    style={{ width: 50, height: 50 }}
                    resizeMode="contain"
                />

                <View></View>
            </View>

            <CustomText t3
                text={device?.roomDeviceName}
                style={{
                    fontWeight: 'bold',
                    fontSize: 16,
                    marginTop: 5
                }} />
        </TouchableOpacity>
    )


}
RoomDeviceBtn.propTypes = {
    device: PropTypes.object,
    style: PropTypes.object,
    imageSrc: PropTypes.any,
    isCheckBoxBtn: PropTypes.bool,
    selectedDeviceList: PropTypes.array,
    onPress: PropTypes.func,
    onChangeCheckBox: PropTypes.func,
}

export default RoomDeviceBtn