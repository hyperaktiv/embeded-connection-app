import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    Button,
    StyleSheet,
    PermissionsAndroid,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import DeviceCard from './components/DeviceCard';
import { BleManager } from 'react-native-ble-plx';

export const manager = new BleManager();

const requestPermission = async () => {
    const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
        title: "Request for Location Permission",
        message: "Bluetooth Scanner requires access to Fine Location Permission",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
    }
    );
    return (granted === PermissionsAndroid.RESULTS.GRANTED);
}

// BlueetoothScanner does:
// - access/enable bluetooth module
// - scan bluetooth devices in the area
// - list the scanned devices
const BluetoothScanner = () => {

    const [isBleOn, setIsBleOn] = useState(false);
    const [scannedDevices, setScannedDevices] = useState({});
    const [deviceCount, setDeviceCount] = useState(0);


    useEffect(() => {
        manager.onStateChange((state) => {
            const subscription = manager.onStateChange(async (state) => {
                console.log(state);
                if (state === "PoweredOn")
                    setIsBleOn(true)
                else
                    setIsBleOn(false)
            }, true);
            return () => subscription.remove();
        });

        // return () => {
        //     manager.destroy();
        // }
    }, [manager]);

    const toggleBluetooth = async () => {
        const btState = await manager.state()
        // test is bluetooth is supported
        if (btState === "Unsupported") {
            alert("Bluetooth is not supported");
            return (false);
        }
        // enable if it is not powered on
        if (btState !== "PoweredOn") {
            await manager.enable();
        } else {
            await manager.disable();
        }
        return (true);
    }

    const scanBleDevice = async () => {
        console.log("scann press");

        const btState = await manager.state()
        // test if bluetooth is powered on
        if (btState !== "PoweredOn") {
            alert("Bluetooth is not powered on");
            return (false);
        }
        // explicitly ask for user's permission
        const permission = await requestPermission();
        if (permission) {
            manager.startDeviceScan(null, null, async (error, device) => {
                // error handling
                if (error) {
                    console.log(error);
                    return
                }
                // found a bluetooth device
                if (device) {
                    console.log(`${device.name} (${device.id})}`);
                    const newScannedDevices = scannedDevices;
                    newScannedDevices[device.id] = device;
                    await setDeviceCount(Object.keys(newScannedDevices).length);
                    await setScannedDevices(scannedDevices);
                }
            });

            // setTimeout(() => {
            //     manager.stopDeviceScan();
            //     console.log("stop scan")
            // }, 10000);
        }
        return (true);
    }

    return (
        <View style={{ flex: 1, padding: 10 }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity
                    onPress={async () => {
                        const btState = await manager.state()
                        // test is bluetooth is supported
                        if (btState === "Unsupported") {
                            alert("Bluetooth is not supported");
                            return (false);
                        }
                        // enable if it is not powered on
                        if (btState !== "PoweredOn") {
                            await manager.enable();
                        } else {
                            await manager.disable();
                        }
                        return (true);
                    }}
                    style={{
                        marginVertical: 10,
                        width: 150,
                        height: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: "oldlace"
                    }}
                >
                    <Text style={{ fontWeight: "bold" }}>{isBleOn ? "Turn Off Bluetooth" : "Turn On Bluetooth"}</Text>

                </TouchableOpacity>

                <TouchableOpacity
                    onPress={scanBleDevice}
                    style={{
                        marginVertical: 10,
                        width: 150,
                        height: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: "oldlace"
                    }}
                >
                    <Text style={{ fontWeight: "bold" }}>Scan Devices</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={async () => {
                        await setScannedDevices({});
                        await setDeviceCount(0);
                        console.log("clear list and reset to scann");

                        scanBleDevice();
                    }}
                    style={{
                        marginVertical: 10,
                        width: 150,
                        height: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: "red"
                    }}
                >
                    <Text style={{ fontWeight: "bold", color: 'white' }}>CLEAR LIST</Text>
                </TouchableOpacity>

            </View>

            <View style={{ flex: 2, padding: 10 }}>
                <Text style={{ fontWeight: "bold" }}>Scanned Devices ({deviceCount})</Text>

                <FlatList
                    data={Object.values(scannedDevices)}
                    renderItem={({ item }) => {
                        // return (<Text>{`- ${item.name} (${item.id})`}</Text>)
                        return <DeviceCard device={item} />
                    }}
                />

            </View>
        </View>
    );
};
export default BluetoothScanner;