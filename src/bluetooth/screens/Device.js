import React, { useCallback, useEffect, useState } from 'react';
import { Text, ScrollView, Button, View, StyleSheet } from 'react-native';
import { Service } from 'react-native-ble-plx';


const Device = ({ route, navigation }) => {

    const { device } = route.params;

    const [isConnected, setIsConnected] = useState(false);

    // handle the device disconnection
    const disconnectDevice = useCallback(async () => {
        navigation.goBack();
        const isDeviceConnected = await device.isConnected();
        if (isDeviceConnected) {
            await device.cancelConnection();
        }
    }, [device, navigation]);

    useEffect(() => {

        const getDeviceInformations = async () => {
            // connect to the device
            const connectedDevice = await device.connect();
            setIsConnected(true);

        }

        getDeviceInformations();

        device.onDisconnected(() => {
            navigation.navigate('Home');
        });

        return () => {
            disconnectDevice();
        };
    }, [device, disconnectDevice, navigation])

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Button title="disconnect" onPress={disconnectDevice} style={{ marginVertical: 30 }} />
            <View>
                <View style={styles.header}>
                    <Text>{`Id : ${device.id}`}</Text>
                    <Text>{`Name : ${device.name}`}</Text>
                    <Text>{`Is connected : ${isConnected}`}</Text>
                    <Text>{`RSSI : ${device.rssi}`}</Text>
                    <Text>{`Manufacturer : ${device.manufacturerData}`}</Text>
                    <Text>{`ServiceData : ${device.serviceData}`}</Text>
                    <Text>{`UUIDS : ${device.serviceUUIDs}`}</Text>
                </View>

            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        padding: 12,
    },

    header: {
        backgroundColor: 'teal',
        marginBottom: 12,
        borderRadius: 16,
        shadowColor: 'rgba(60,64,67,0.3)',
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 4,
        padding: 12,
    },
});

export default Device