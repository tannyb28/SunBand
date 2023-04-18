import React, {useEffect, useState} from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { logout } from '../actions/auth'
import { useDispatch, useSelector } from "react-redux";
import { db } from '../../firebase';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import Papa from 'papaparse';


const Settings = ({navigation}) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);

  const [csvData, setCsvData] = useState([]);
  const [csvLabels, setCsvLabels] = useState([]);
  // query the light data from the database
  const queryLightData = () => {
    const dataRef = db.ref("/users/" + state.uid + "/lightData")
    dataRef.orderByChild("time").on("value", (snapshot) => {
      setCsvData([]);
      setCsvLabels([]);
      const data = [];
      snapshot.forEach((childSnapshot) => {
        data.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });
      data.forEach((item, index) => {
        setCsvLabels((labels) => [...labels, item.time])
        setCsvData((data) => [...data, item.light])
      })
      // reverse the array to get the most recent entries first
      const mostRecentData = data.reverse();
      // iterate through data and push the time and light data to the labels and data arrays
      mostRecentData.forEach((item, index) => {
        setLabels((labels) => [...labels, item.time])
        setData((data) => [...data, item.light])
      })
    })
  }

  const handleLogout = () => {
    dispatch(logout()).then((response) => {
      if (response.status === "success") {
        navigation.navigate("LoginScreen");
      }
    });
  };
  const dataJson = {
    labels: csvLabels,
    data: csvData
  }
  const downloadCSV = async() => {
    const fileName = 'myLightData.csv';
    const csv = Papa.unparse(dataJson);
    const fileUri = `${FileSystem.documentDirectory}${fileName}`;
    await FileSystem.writeAsStringAsync(fileUri, csv, {
      encoding: FileSystem.EncodingType.UTF8,
    });
    console.log(fileUri)
    await Sharing.shareAsync(fileUri, {
      mimeType: 'text/csv',
      dialogTitle: 'Download CSV',
      UTI: 'public.comma-separated-values-text',
    });
    console.log("done here")
  } 
  
  
  console.log(dataJson)
  useEffect(() => {
    setData([])
    setLabels([])
    queryLightData();
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.header}>Settings</Text>
        <View style={styles.list}>
          <TouchableOpacity onPress={()=>navigation.navigate('Device')}>
            <View style={styles.listOption}>
              <View style={styles.listOptionTitle}>
                <Ionicons name="ios-phone-portrait-outline" size={20} color="black" />
                <Text style={styles.listOptionText}>Device</Text>
              </View>
              <Ionicons name="ios-arrow-forward" size={20} color="black" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>navigation.navigate('Notifications')}>
            <View style={styles.listOption}>
              <View style={styles.listOptionTitle}>
                <Ionicons name="ios-notifications-outline" size={20} color="black" />
                <Text style={styles.listOptionText}>Notifications</Text>
              </View>
              <Ionicons name="ios-arrow-forward" size={20} color="black" />
            </View>
          </TouchableOpacity>

          <View style={styles.listOption}>
            <View style={styles.listOptionTitle}>
              <Ionicons name="ios-bulb-outline" size={20} color="black" />
              <Text style={styles.listOptionText}>Dark Mode</Text>
            </View>
          </View>
          
        </View>
      </View>
      <View>
        <TouchableOpacity style={styles.download} onPress={()=>downloadCSV()}>
          <Ionicons name="ios-cloud-download-outline" size={20} color="white" />
          <Text style={styles.downloadText}>Download</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logout} onPress={()=>handleLogout()}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',
    justifyContent: 'space-between',
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 15,
  },
  list: {
    marginHorizontal: 45,
    marginTop: 20,
  },
  listOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  listOptionTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listOptionText: {
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  download: {
    backgroundColor: '#000b96',
    flexDirection: 'row',
    width: 160,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 10,
  },
  downloadText: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  logout: {
    backgroundColor: 'red',
    width: 160,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 60,
  },
  logoutText: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
  }
})

export default Settings