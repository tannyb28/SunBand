import React, { useState } from 'react';
import { SafeAreaView, Text, StyleSheet, Switch, View} from 'react-native';
import BackButton from '../components/BackButton';
import SelectDropdown from 'react-native-select-dropdown'


const Notifications = ({navigation}) => {
  const [notifications, setNotifications] = useState(false);
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
          console.log(selectedItem, index)
        }}
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
  }
})

export default Notifications