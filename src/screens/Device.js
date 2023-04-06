import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import BackButton from '../components/BackButton';

const Device = ({navigation}) => {
  return (
    <SafeAreaView>
      <BackButton navigation={navigation}/>
      <Text>Device</Text>
    </SafeAreaView>
  )
}

export default Device