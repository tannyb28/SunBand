import React, { useCallback, useState } from 'react';
import { SafeAreaView, Text } from 'react-native';
import BackButton from '../components/BackButton';
import {BLEManager} from 'react-native-ble-plx';
import base64 from 'react-native-base64';

const Device = ({navigation}) => {
  // const manager = new BLEManager();
  const [connectedDevice, setConnectedDevice] = useState(null);

  // const startDeviceScanning = useCallback(() => {
  //   manager.startDeviceScan(null, null, (error, device) => {
  //     if (error) {
  //       console.log(error);
  //     }
  //     if(!device || !device.name) return;

  //     console.log(device);
  //   });
  // }, [manager]);

  // const stopDeviceScanning = useCallback(() => {
  //   manager.stopDeviceScan();
  // }, [manager]);

  // const connectToDevice = useCallback(async (deviceId) => {
  //   try {
  //     const newlyConnectedDevice = await manager.connectToDevice(deviceId);
  //     console.log(newlyConnectedDevice);
  //     setConnectedDevice(newlyConnectedDevice);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, []);

  // const disconnectFromDevice = useCallback(async () => {
  //   try {
  //     await connectedDevice.cancelConnection();
  //     setConnectedDevice(null);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [connectedDevice]);

  // const discoverServices = useCallback(async () => {
  //   if(!connectedDevice) {
  //     console.log('No connected device');
  //     return;
  //   };
  //   await connectedDevice.discoverAllServicesAndCharacteristics();
  //   console.log(connectedDevice);
  // }, [connectedDevice]);

  // const getDeviceServices = useCallback(async () => {
  //   if(!connectedDevice) {
  //     console.log('No connected device');
  //     return;
  //   };
  //   const services = await connectedDevice.services();
  //   console.log(services);
  // }, [connectedDevice, discoverServices]);

  // const getDeviceCharacteristics = useCallback(async () => {
  //   if(!connectedDevice) {
  //     console.log('No connected device');
  //     return;
  //   };
  //   const services = await connectedDevice.services();
  //   const characteristics = await services[0].characteristics();
  //   console.log(characteristics);
  // }, [connectedDevice, discoverServices]);

  
  


  return (
    <SafeAreaView>
      <BackButton navigation={navigation}/>
      <Text>Device</Text>
    </SafeAreaView>
  )
}

export default Device