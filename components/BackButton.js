import React from 'react';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'

const BackButton = ({navigation}) => {
  return (
    <TouchableOpacity onPress={()=>navigation.goBack()}>
      <Ionicons name="ios-arrow-back" size={20} color="black" />
    </TouchableOpacity>
  )
}

export default BackButton