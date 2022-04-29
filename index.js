/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

// import App from './src/bluetooth/BluetoothScanner';
// import App from './src/bluetooth/BleManager';

AppRegistry.registerComponent(appName, () => App);
