import React, { useState } from 'react';
import { SafeAreaView, Text, StyleSheet, Switch, View} from 'react-native';
import BackButton from '../components/BackButton';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';



const Notifications = ({navigation}) => {
  const [notifications, setNotifications] = useState(false);
  const [interval, setInterval] = useState("1 hour");
  const toggleNotifications = () => setNotifications(previousState => !previousState);
  console.log(notifications)

  const intervals = ["1 hour", "1.5 hour", "2 hour", "3 hour"]
  return (
    <SafeAreaView style={styles.container}>
      <BackButton navigation={navigation}/>
      <View style={{display: 'flex', flexDirection: 'row', alignItems:'center', justifyContent:'space-between'}}>
        <Text>Notifications</Text>
        <Switch
          trackColor={{ false: "#767577", true: "teal" }}
          thumbColor={notifications ? "#fff" : "#fff"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleNotifications}
          value={notifications}
        />
      </View>
      <Text>Notification Intervals</Text>
      <SelectDropdown
        data={intervals}
        onSelect={(selectedItem, index) => {
          setInterval(selectedItem)
          console.log(selectedItem, index)
        }}
        defaultButtonText={"Select an interval"}
        buttonStyle={styles.dropdownButtonStyle}
        buttonTextStyle={styles.dropdownButtonTextStyle}
        renderDropdownIcon={() => {
          return (
            <FontAwesome name="chevron-down" color="#fff" size={16} />
          )
        }}
        dropdownStyle={styles.dropdownStyle}
        rowStyle={styles.dropdownRowStyle}
        rowTextStyle={styles.dropdownRowTextStyle}
        buttonTextAfterSelection={(selectedItem, index) => {
          // text represented after item is selected
          // if data array is an array of objects then return selectedItem.property to render after item is selected
          return selectedItem
        }}
        rowTextForSelection={(item, index) => {
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
          return item
        }}
      />
      
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 20
  },
  dropdownButtonStyle: {
    backgroundColor: 'teal',
    width: 200,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 10,
  },
  dropdownButtonTextStyle: {
    color: '#fff',
    fontSize: 16,
  },
  dropdownStyle: {
    backgroundColor: 'teal',
    width: 200,
    height: 200,
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 10,
  },
  dropdownRowStyle: {
    backgroundColor: 'teal',
    width: 200,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 10,
  },
  dropdownRowTextStyle: {
    color: '#fff',
    fontSize: 16,
  },
  
})

export default Notifications