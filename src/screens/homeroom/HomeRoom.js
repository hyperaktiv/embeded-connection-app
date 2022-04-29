import { View } from 'react-native'
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomBackground from '../../components/CustomBackground';
import CustomText from '../../components/CustomText';
import CustomHeaderButton from '../../components/CustomHeaderButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '../../constants/colors';
import RoomItem from './RoomItem';
import LoadingOverlay from '../../components/LoadingOverlay';
import { getAllRoom } from '../../APIs';

const roomListData1 = [
    { id: 1, roomName: 'Nhà tắm' },
    { id: 2, roomName: 'Phòng ngủ' },
    { id: 3, roomName: 'Phòng khách' },
];

const HomeRoom = () => {
    const navigation = useNavigation();

    const [roomListData, setRoomListData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // set header of screen
        navigation.setOptions({
            title: 'PHÒNG',
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
                        onPress={() => navigation.navigate('ListRoomButton')}
                        style={{ width: 40 }}
                    >
                        <AntDesign name='plus' size={30} color={colors.headerButtonColor} />
                    </CustomHeaderButton>
                </View>
            )
        })

        getRoomListData();

        return () => {
            setRoomListData([]);
            setLoading(false);
        }
    }, [])

    const getRoomListData = async () => {
        try {
            setLoading(true);

            const response = await getAllRoom();
            if (response.__typename !== 'ErrorResponse') {
                // console.log("getRoomListData: ", response.result);
                setRoomListData(response.result);
            }

            setLoading(false);

        } catch (error) {
            setLoading(false);
            console.log("Error on getRoomListData(): " + error);
        }
    }

    return (
        <CustomBackground>
            {roomListData.length !== 0 ? roomListData.map((item, index) => (
                <View key={index}>
                    <RoomItem
                        roomName={item.roomName}
                        onPress={() => {
                            console.log("room list item");
                            navigation.navigate('RoomDetail');
                        }}
                    />
                </View>
            )) : (
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <MaterialIcons name='sync-disabled' size={150} color={colors.grey} style={{ marginBottom: 50 }} />
                    <CustomText t2 text={'Chưa có room nào được thêm!'} />
                </View>
            )}

            <LoadingOverlay loading={loading} />
        </CustomBackground>
    )
}

export default HomeRoom