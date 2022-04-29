import { View, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, CommonActions } from '@react-navigation/native';

import CustomBackground from '../../components/CustomBackground';
import CustomHeaderButton from '../../components/CustomHeaderButton';
import CustomText from '../../components/CustomText';
import CustomButton from '../../components/CustomButton';
import RoomDeviceBtn from './RoomDeviceBtn';
import { colors } from '../../constants/colors';

const roomDetailData = [
    { id: 1, roomDeviceName: 'Công tắc' },
    { id: 2, roomDeviceName: 'Quạt điện' },
];

const windowWidth = Dimensions.get('window').width;

const RoomDetail = () => {
    const navigation = useNavigation();
    const [deviceList, setDeviceList] = useState(roomDetailData)
    const [selectedDeviceList, setSelectedDeviceList] = useState([])
    useEffect(() => {
        navigation.setOptions({
            title: 'PHÒNG NGỦ',
            headerTitleAlign: 'center',
            headerTransparent: false,
            headerLeft: () => <CustomHeaderButton type="goback" onPress={() => navigation.dispatch(CommonActions.goBack())} />,
            headerRight: () =>
                <View
                    style={{
                        height: 80,
                    }}
                >
                    <CustomButton
                        title={'Thêm'}
                        buttonType={'primary'}
                        onPress={() => navigation.navigate('SelectRoomDevices')}
                        buttonStyle={{
                            width: 80,
                            height: 50,
                            backgroundColor: colors.headerColor,
                            marginTop: 15
                        }}
                        textStyle={{ color: colors.white }} />
                </View >
        })
    }, [])


    return (
        <CustomBackground>
            {deviceList?.length !== 0 ? (
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        marginVertical: 20
                    }}
                >
                    {deviceList.map((item, index) => (
                        <RoomDeviceBtn
                            device={item}
                            selectedDeviceList={selectedDeviceList}
                            onChangeCheckBox={(selectedValues) => {
                                console.log({ selectedValues });
                                setSelectedDeviceList(selectedValues)
                            }}
                            key={index}
                            imageSrc={require('../../resources/images/switch.jpg')}
                            isCheckBoxBtn
                            style={{
                                width: parseInt((windowWidth - 60) / 2),
                                height: 100,
                                marginLeft: index % 2 == 1 ? 20 : 0,
                                marginTop: index >= 2 ? 20 : 0
                            }}
                        />
                    ))}

                </View>
            )
                : (
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <CustomText t3
                            text={'Không có thiết bị nào'}
                            style={{
                                fontWeight: 'bold',
                                marginTop: 150
                            }} />

                        <CustomButton
                            title={'Thêm thiết bị'}
                            buttonType={'primary'}
                            onPress={() => navigation.navigate('SelectRoomDevices')}
                            buttonStyle={{}}
                            textStyle={{ color: colors.white }}
                        />
                    </View>
                )
            }
        </CustomBackground >
    )
}

export default RoomDetail