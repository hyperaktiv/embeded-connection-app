import { Dimensions, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import CustomBackground from '../../components/CustomBackground';
import CustomHeaderButton from '../../components/CustomHeaderButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DeviceItem from './DeviceItem';
import CustomText from '../../components/CustomText';
import { colors } from '../../constants/colors';
const windowWidth = Dimensions.get('window').width;

const listDevice1 = [
    { id: 1, deviceName: 'Internet Hub', iconType: 'material', iconName: 'router-wireless-settings' },
    { id: 2, deviceName: 'Wifi', iconType: 'material', iconName: 'wifi-sync' },
];

const DeviceTab = () => {
    const navigation = useNavigation();

    const [listDevices, setListDevices] = useState([]);

    useEffect(() => {
        navigation.setOptions({
            title: 'THIẾT BỊ VẬT LÝ',
            headerTitleAlign: 'center',
            headerRight: () => (
                <View
                    style={{
                        height: 80,
                        width: 60,
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                    }}
                >
                    <CustomHeaderButton
                        type={'rightButton'}
                        onPress={() => navigation.navigate('SelectDevicesTab')}
                        style={{ width: 40 }}
                    >
                        <AntDesign name='plus' size={30} color={colors.headerButtonColor} />
                    </CustomHeaderButton>
                </View>
            )
        });

        // setListDevices(listDevice1);

        return () => {
            setListDevices([]);
        }
    }, []);

    return (
        <CustomBackground
            style={{
                flex: 1,
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginVertical: 20
            }}
        >
            {
                listDevices.length != 0 ? listDevices.map((item, index) => (
                    <DeviceItem
                        onPress={() => {
                            console.log(item.deviceName)
                            // navigation.navigate('SelectDevicesTab')
                        }}
                        deviceName={item.deviceName}
                        iconType={item.iconType}
                        iconName={item.iconName}
                        style={{
                            width: parseInt((windowWidth - 75) / 3),
                            height: parseInt((windowWidth - 75) / 3) - 5,
                            marginHorizontal: index % 3 === 1 ? 15 : 0,
                            marginTop: index >= 3 ? 20 : 0
                        }}
                        key={index}
                    />
                )) : (
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <CustomText t2 text={'Chưa có thiết bị nào được thêm.'} />
                    </View>
                )
            }
        </CustomBackground>
    )
}

export default DeviceTab