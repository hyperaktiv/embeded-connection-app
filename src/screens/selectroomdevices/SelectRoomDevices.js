import { View, Text, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react';
import { useNavigation, CommonActions } from '@react-navigation/native';

import CustomHeaderButton from '../../components/CustomHeaderButton';
import CustomBackground from '../../components/CustomBackground';
import CustomText from '../../components/CustomText';
import RoomDeviceBtn from '../roomdetail/RoomDeviceBtn';
import { colors } from '../../constants/colors';

const roomDevicesData = [
    { id: 1, roomDeviceName: 'Công tắc', status: true }, // 1: on , 2: off
    { id: 2, roomDeviceName: 'Quạt điện', status: false },
];

const windowWidth = Dimensions.get('window').width;

const SelectRoomDevices = () => {
    const navigation = useNavigation();

    const [roomDeviceData, setRoomDeviceData] = useState(roomDevicesData);

    useEffect(() => {
        navigation.setOptions({
            title: 'CHỌN THIẾT BỊ',
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
    }, [roomDeviceData])

    const onUpdateData = (id) => {
        roomDeviceData.map((item, index) => {
            if (item.id === id) {
                roomDeviceData[index].status = !roomDeviceData[index].status;
                console.log('status: ', roomDeviceData[index].status)
            }
        })
        setRoomDeviceData(roomDeviceData);
    }

    return (
        <CustomBackground>
            <CustomText t2
                text={'THIẾT BỊ CÓ SẴN'}
                style={{
                    fontWeight: 'bold',
                    marginTop: 30,
                    fontSize: 18,
                    color: colors.primary1
                }} />

            {roomDeviceData.length !== 0 ? (
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        marginVertical: 20
                    }}
                >
                    {roomDeviceData.map((item, index) => (
                        <RoomDeviceBtn
                            text={item.roomDeviceName}
                            onPress={() => {
                                // console.log(item.roomDeviceName, index % 2);
                                onUpdateData(item.id)
                            }}
                            isSelected={item.status}
                            key={index}
                            imageSrc={require('../../resources/images/switch.jpg')}
                            isCheckBoxBtn
                            style={{
                                width: parseInt((windowWidth - 60) / 2),
                                height: 100,
                                marginLeft: index % 2 == 1 ? 20 : 0,
                                marginTop: index >= 2 ? 20 : 0,
                            }}
                        />
                    ))}

                </View>
            ) : (
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <CustomText t3
                        text={'Không có thiết bị nào'}
                        style={{ alignSelf: 'center' }} />
                </View>
            )}

        </CustomBackground >
    )
}

export default SelectRoomDevices