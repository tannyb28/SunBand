import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./../actions/auth";
import Slider from "@react-native-community/slider";
import { db } from "../../firebase";

const Home = ({ navigation }) => {
  const state = useSelector((state) => state);
  // console.log(state)
  const dispatch = useDispatch();
  const [sliderValue, setValue] = useState(5)
  const writeToDatabase = () => {
    var nowDate = new Date(); 
    var date = (nowDate.getMonth()+1)+'/'+nowDate.getDate()+'/'+nowDate.getFullYear(); 
    console.log('write to database called')
    const dataRef = db.ref("/users/" + state.uid)
    // .set({
    //   // pass in slide value for mood and today's date(just the day) as date
    //   mood: sliderValue,
    //   date: date
    // });
    console.log('reference to database finished')
    dataRef.push({mood: sliderValue, date: date});
    console.log('pushed to database')
  };
  
return (
    <View style={Styles.container}>
      <Text style={{ fontSize: 16 }}>Welcome {state.user}</Text>
      {/* <Button onPress={() => onLogout()} title="Logout" /> */}
      <Text>How was your day on a scale from 1-5?</Text>
      <Slider
        style={{width: 200, height: 40}}
        minimumValue={1}
        maximumValue={5}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
        value={3}
        onValueChange={(value)=> setValue(Math.round(value))}
      />
      <Text>{sliderValue}</Text>
      <Button onPress={() => writeToDatabase()} title="Submit" />
    </View>
  );
};
export default Home;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});