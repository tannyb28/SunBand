import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Button, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BackButton from '../components/BackButton';
// import {BLEManager} from 'react-native-ble-plx';
// import base64 from 'react-native-base64';

const Device = ({navigation}) => {
  // const manager = new BLEManager();
  const [isScanning, setIsScanning] = useState(false);
  const [connectedDevice, setConnectedDevice] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
  
  const handleScan = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    setIsScanning(!isScanning);
    console.log(isScanning);
  };
  console.log(isLoading)
  const handleConnect = (device) => {
    console.log('connect');
    console.log(device.connected)
    if(device.name == connectedDevice) {
      setConnectedDevice(null);
    } else {
      setConnectedDevice(device.name);
    }

  }

  // create a json variable that stores list of devices and if they are connected or not
  // the connected property should be changeable
  const devices = [
    {
      name: 'Om Sunband',
    },
    {
      name: 'Tanish Sunband',
    },
  ]

  if(!isScanning) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <BackButton navigation={navigation}/>
          <Text style={styles.header}>Devices</Text>
        </View>
        {/* <Text style={styles.header}>Devices</Text> */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleScan}>
            <Text style={styles.buttonText}>Scan for Devices</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  } 
  else {
    if(isLoading) {
      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.headerContainer}>
            <BackButton navigation={navigation}/>
            <Text style={styles.header}>Devices</Text>
          </View>
          <View style={styles.deviceListContainer}>
            <Text style={styles.subheader}>Available Devices</Text>
            <View style={styles.loading}>
              <Text>Loading...</Text>
              <ActivityIndicator size="small" color="#000b96" />
            </View>
          </View>
        </SafeAreaView>
      )
    } else {
      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.headerContainer}>
            <BackButton navigation={navigation}/>
            <Text style={styles.header}>Devices</Text>
          </View>
          <View style={styles.deviceListContainer}>
            <Text style={styles.subheader}>Available Devices</Text>
            {devices.map((device, index) => {
              return (
                <View key={index} style={styles.deviceListItem}>
                  <Text>{device.name}</Text>
                  <TouchableOpacity style={styles.deviceListItemButton} onPress={(e)=>handleConnect(device)}>
                    {device.name == connectedDevice ? <Text style={styles.buttonText}>Disconnect</Text> : <Text style={styles.buttonText}>Connect</Text>}
                  </TouchableOpacity>
                </View>
              )
            })}

          </View>
          {/* <Text style={styles.header}>Devices</Text> */}
          {/* <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleScan}>
              <Text style={styles.buttonText}>wow</Text>
            </TouchableOpacity>
          </View> */}
        </SafeAreaView>
    )
    }
    
  }
  
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    margin: 20,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  subheader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  buttonContainer: {
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    display: 'flex',
    backgroundColor: '#000b96',
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 40,
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
  },
  deviceListContainer: {
    marginTop: 20,
  },
  loading: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deviceListItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  deviceListItemButton: {
    backgroundColor: '#000b96',
    height: 30,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white'
  }
})
export default Device