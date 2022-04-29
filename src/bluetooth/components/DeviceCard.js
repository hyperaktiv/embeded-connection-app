import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { manager } from '../BluetoothScanner';

const DeviceCard = ({ device }) => {

    // const navigation = useNavigation();

    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        // is the device connected?
        // device.isConnected().then(() => {
        //     setIsConnected(true);
        //     console.log("OK ===>", device.name)
        // });
    }, [device]);

    return (
        <View style={styles.container}>
            <Text>{`Id : ${device.id}`}</Text>
            <Text>{`Name : ${device.name}`}</Text>
            <Text>{`Is connected : ${isConnected}`}</Text>
            <Text>{`RSSI : ${device.rssi}`}</Text>
            {/* Decode the ble device manufacturer which is encoded with the base64 algorythme */}
            {/* <Text>{`Manufacturer : ${Base64.decode(
                device.manufacturerData?.replace(/[=]/g, ''),
            )}`}</Text> */}
            <Text>{`ServiceData : ${device.serviceData}`}</Text>
            <Text>{`UUIDS : ${device.serviceUUIDs}`}</Text>


            <TouchableOpacity
                style={{
                    borderWidth: 1,
                    width: 80, height: 30,
                    marginTop: 30,
                    backgroundColor: 'blue'
                }}
                // navigate to the Device Screen
                onPress={async () => {
                    // navigation.navigate('Device', { device });
                    console.log("press on device", device.name);

                    // let connectedDevice = await device.connect();
                    // if (connectedDevice) {
                    //     console.log(device.name, "== Device ISCONNECTED ===", device.isConnected());
                    // }

                    let mngConnect = manager.connectToDevice(device.id)
                    if (mngConnect) {
                        console.log("mngConnet success: => ", mngConnect);
                        setIsConnected(true);
                    }

                }}>
                <Text>Connect</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{
                    borderWidth: 1,
                    width: 80, height: 30,
                    marginTop: 30,
                    backgroundColor: 'green'
                }}
                onPress={async () => {
                    // navigation.navigate('Device', { device });
                    console.log("press on device", device.name);
                    let cancelDevice = await device.cancelConnection();
                    if (cancelDevice) {
                        console.log(device.name, "cancel ===", cancelDevice);
                    }
                    console.log("-- Device ISCONNECTED ===", device.isConnected());
                    setIsConnected(false);
                }}>
                <Text>Disonnect</Text>
            </TouchableOpacity>
        </View>

    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'oldlace',
        borderWidth: 1,
        marginBottom: 12,
        borderRadius: 16,
        shadowColor: 'rgba(60,64,67,0.3)',
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 4,
        padding: 12,
    },
});

export default DeviceCard