import { Dimensions, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, CommonActions } from '@react-navigation/native';
import RoomButton from './RoomButton';
import CustomBackground from '../../components/CustomBackground';
import CustomHeaderButton from '../../components/CustomHeaderButton';

import { getRoomType, createNewRoom } from '../../APIs';

const windowWidth = Dimensions.get('window').width;

const roomData = [
    { id: 1, roomName: 'Nhà tắm', iconType: 'material', iconName: 'bathtub-outline' },
    { id: 2, roomName: 'Phòng ngủ', iconType: 'ionicons', iconName: 'bed-outline' },
    { id: 3, roomName: 'Phòng khách', iconType: 'material', iconName: 'sofa-outline' },
    { id: 4, roomName: 'Gara', iconType: 'material', iconName: 'warehouse' },
    { id: 5, roomName: 'Nhà bếp', iconType: 'material', iconName: 'silverware-fork-knife' },
    { id: 6, roomName: 'Cầu thang', iconType: 'material', iconName: 'stairs' },
    { id: 7, roomName: 'Loại khác', iconType: 'antdesign', iconName: 'menuunfold' },
];

const ListRoomButton = () => {
    const navigation = useNavigation();

    const [typeRoomData, setTypeRoomData] = useState([]);

    useEffect(() => {
        navigation.setOptions({
            title: "Chọn loại phòng",
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
        });

        getTypeOfRoom();

        return () => {
            setTypeRoomData([])
        }
    }, [])

    const getTypeOfRoom = async () => {
        try {
            const response = await getRoomType();
            if (response.__typename !== 'ErrorResponse') {
                console.log(response.roomTypes);
                setTypeRoomData(response.roomTypes);
            }
        } catch (error) {
            console.log("Error on getTypeOfRoom(): " + error);
        }
    }

    const createRoom = async (roomName, roomType) => {
        try {
            const response = await createNewRoom(roomName, roomType);
            if (response.__typename !== 'ErrorResponse') {
                console.log(response);
            }
        } catch (error) {
            console.log("Error on createRoom(): " + error);
        }
    }

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
                typeRoomData.length !== 0 && typeRoomData.map((item, index) => (
                    <RoomButton
                        onPress={() => {
                            console.log(item.name);
                            createRoom(item.name, item.id);
                            navigation.navigate('HomeRoom');
                        }}
                        roomName={item.name}
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
                ))

            }

        </CustomBackground>
    )
}

export default ListRoomButton