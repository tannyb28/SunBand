import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import BackButton from '../components/BackButton';

const Notifications = ({navigation}) => {
  return (
    <SafeAreaView>
      <BackButton navigation={navigation}/>
      <Text>Notifications</Text>
    </SafeAreaView>
  )
}

export default Notifications