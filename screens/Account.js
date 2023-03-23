import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import BackButton from '../components/BackButton';

const Account = ({navigation}) => {
  return (
    <SafeAreaView>
      <BackButton navigation={navigation}/>
      <Text>Account</Text>
    </SafeAreaView>
  )
}

export default Account