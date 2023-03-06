import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
const Settings = () => {
  return (
    <SafeAreaView>
      <Text style={styles.header}>Settings</Text>
      <View style={styles.list}>
        <View style={styles.listOption}>
          <View style={styles.listOptionTitle}>
            <Ionicons name="ios-notifications" size={20} color="black" />
            <Text>Notifications</Text>
          </View>
          <Ionicons name="ios-arrow-forward" size={20} color="black" />
        </View>
        <View style={styles.listOption}>
          <Text>Dark Mode</Text>
        </View>
        
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  list: {
    marginHorizontal: 60,
    marginTop: 20,
  },
  listOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listOptionTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  }
})

export default Settings