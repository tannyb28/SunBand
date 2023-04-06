import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, Image, SafeAreaView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./../actions/auth";
import Slider from "@react-native-community/slider";
import { db } from "../../firebase";
import sunYellow from "../../assets/sun-yellow.png";
import sunBlack from "../../assets/sun-black.png";


const Home = ({ navigation }) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [sliderValue, setValue] = useState(5)
  const [submittedRating, setSubmittedRating] = useState(false)
  const [lightLevel, setLightLevel] = useState(100)

  // THIS IS THE MAGIC BUTTON TO TEMPORARILY CHANGE THE LIGHT LEVEL
  const light=80;


  const writeToDatabase = () => {
    var nowDate = new Date(); 
    var date = (nowDate.getMonth()+1)+'/'+nowDate.getDate()+'/'+nowDate.getFullYear(); 
    const dataRef = db.ref("/users/" + state.uid)
    dataRef.push({mood: sliderValue, date: date});
  };

  const queryDailyDatabase = () => {
    const dataRef = db.ref("/users/" + state.uid)
    dataRef.orderByChild("date").on("value", (snapshot) => {
      const data = [];
      snapshot.forEach((childSnapshot) => {
        data.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });
      // reverse the array to get the most recent entries first
      const mostRecentData = data.reverse();
      var nowDate = new Date()
      var date = (nowDate.getMonth()+1)+'/'+nowDate.getDate()+'/'+nowDate.getFullYear(); 
      if (mostRecentData[0].date == date) {
        setSubmittedRating(true)
      }
    })
  }
  useEffect(() => {
    queryDailyDatabase();
    setLightLevel(100-light)
  }, [])

  
return (
    <SafeAreaView style={Styles.container}>
      {/* <Text style={{ fontSize: 16 }}>Welcome {state.user}</Text> */}
      {/* <Button onPress={() => onLogout()} title="Logout" /> */}
      <View>
        <View style={{justifyContent:'flex-start',alignItems:'center', height:250, marginTop:125}}>
          <Image source={sunYellow} style={{width: 250, height: 250}}/>
          <View style={{width: 250, height: `${lightLevel}%`, position:'absolute', overflow:"hidden", display:'flex', justifyContent:'flex-start'}}>
            <Image source={sunBlack} style={{width: 250, height: 250}}/>        
          </View>
        </View>
        <Text>You have hit {light}% of your daily light intake today</Text>
      </View>
      <View style={Styles.slider}>

        {!submittedRating?
        (
          <>
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
          </>
        ):
          <Text>You already submitted your rating for today :)</Text>
        }
      </View>
    </SafeAreaView>
  );
};
export default Home;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  slider: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});