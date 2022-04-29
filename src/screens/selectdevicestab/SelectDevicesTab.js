import { View, SectionList, Dimensions, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react';
import { useNavigation, CommonActions } from '@react-navigation/native';
import CustomHeaderButton from '../../components/CustomHeaderButton';
import CustomBackground from '../../components/CustomBackground';
import CustomText from '../../components/CustomText';
import DeviceItem from '../devicetab/DeviceItem';
import { colors } from '../../constants/colors';

const dataDevices = [
    {
        title: '___Công tắc___',
        data: [
            {
                list: [
                    { name: 'Wifi', iconName: 'dots-three-horizontal', iconType: 'entypo' },
                    { name: 'Internet Hub', iconType: 'material', iconName: 'router-wireless-settings' },
                ]
            }
        ]
    },
    {
        title: '___Cảm biến___',
        data: [
            {
                list: [
                    { name: 'Wifi', iconName: 'wifi-sync', iconType: 'material' },
                ]
            }
        ]
    },
];

const windowWidth = Dimensions.get('window').width;

const SelectDevicesTab = () => {
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            title: 'THÊM THIẾT BỊ',
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
    }, [])

    return (
        <>
            {
                dataDevices.length !== 0 ? (
                    <View style={{
                        flex: 1,
                        marginVertical: 20,
                        paddingHorizontal: 20,
                        backgroundColor: colors.background,
                    }}>
                        <SectionList
                            sections={dataDevices}
                            renderItem={({ item }) => (
                                <FlatList
                                    data={item.list}
                                    numColumns={3}
                                    renderItem={({ item, index }) => (
                                        <DeviceItem
                                            deviceName={item.name}
                                            onPress={() => {
                                                console.log(item.iconName);
                                                navigation.navigate('WifiInfor');
                                            }}
                                            iconType={item.iconType}
                                            iconName={item.iconName}
                                            key={index}
                                            style={{
                                                width: parseInt((windowWidth - 80) / 3),
                                                height: parseInt((windowWidth - 75) / 3) - 15,
                                                marginHorizontal: index % 3 === 1 ? 20 : 0,
                                                marginTop: index >= 3 ? 20 : 0
                                            }}
                                        />
                                    )}
                                    keyExtractor={(item, index) => index}
                                />
                            )}
                            renderSectionHeader={({ section }) =>
                                <CustomText p1 text={section.title}
                                    style={{
                                        fontWeight: '800',
                                        color: 'blue',
                                        fontSize: 18
                                    }} />}
                            SectionSeparatorComponent={() => <View style={{ height: 1, marginVertical: 5, }} />}
                            keyExtractor={(item, index) => index}
                        />
                    </View>
                ) : (
                    <CustomBackground style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <CustomText t3
                            text={'Không có thiết bị nào'}
                            style={{ alignSelf: 'center' }} />
                    </CustomBackground >
                )
            }

        </>
    )
}

export default SelectDevicesTab