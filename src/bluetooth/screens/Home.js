import React, { useEffect, useReducer, useState } from 'react';
import {
    ActivityIndicator,
    Button,
    FlatList,
    StyleSheet,
    Text,
    View,
    PermissionsAndroid,
} from 'react-native';
import DeviceCard from '../components/DeviceCard';
import { BleManager } from 'react-native-ble-plx';

const manager = new BleManager();

// Reducer to add only the devices which have not been added yet
// When the bleManager search for devices, each time it detect a ble device, it returns the ble device even if this one has already been returned
const reducer = (
    state = [],
    action = { type: 'ADD_DEVICE', payload: {} } | { type: 'CLEAR' }
) => {
    switch (action.type) {
        case 'ADD_DEVICE':
            const { payload: device } = action;

            // check if the detected device is not already added to the list
            if (device && !state.find((dev) => dev.id === device.id)) {
                return [...state, device];
            }
            return state;
        case 'CLEAR':
            return [];
        default:
            return state;
    }
};

const Home = () => {
    // reducer to store and display detected ble devices
    const [scannedDevices, dispatch] = useReducer(reducer, []);
    // state to give the user a feedback about the manager scanning devices
    const [isLoading, setIsLoading] = useState(false);

    const scanDevices = () => {
        console.log("scan device press");

        // display the Activityindicator
        setIsLoading(true);

        // scan devices
        manager.startDeviceScan(null, null, (error, scannedDevice) => {
            if (error) {
                console.warn(error);
            }

            // if a device is detected add the device to the list by dispatching the action into the reducer
            if (scannedDevice) {
                dispatch({ type: 'ADD_DEVICE', payload: scannedDevice });
            }
        });

        // stop scanning devices after 5 seconds
        setTimeout(() => {
            manager.stopDeviceScan();
            setIsLoading(false);
        }, 5000);
    }

    const ListHeaderComponent = () => (
        <View style={styles.body}>
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Step One</Text>
            </View>

            <View style={styles.sectionContainer}>
                <Button
                    title="Clear devices"
                    onPress={() => dispatch({ type: 'CLEAR' })}
                    style={{ marginBottom: 50 }}
                />

                {isLoading ? (
                    <View style={styles.activityIndicatorContainer}>
                        <ActivityIndicator color={'teal'} size={25} />
                    </View>
                ) : (
                    <Button title="Scan devices" onPress={scanDevices} style={{ marginTop: 20 }} />
                )}
            </View>
        </View>
    )

    useEffect(() => {

        return () => {
            manager.destroy();
        }
    }, [])

    return (
        <View style={styles.body}>
            <FlatList
                keyExtractor={(item) => item.id}
                data={scannedDevices}
                renderItem={({ item }) => <DeviceCard device={item} />}
                ListHeaderComponent={ListHeaderComponent}
                contentContainerStyle={styles.content}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        backgroundColor: 'red',
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: 'black',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
        color: 'grey',
    },
    content: {
        backgroundColor: 'rgb(242,242,242)',
        paddingHorizontal: 8 * 2,
    },
    activityIndicatorContainer: { marginVertical: 6 },
});

export default Home