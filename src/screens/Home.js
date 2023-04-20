import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, Image, SafeAreaView } from "react-native";
import { useSelector } from "react-redux";
import Slider from "@react-native-community/slider";
import { db } from "../../firebase";
import sunYellow from "../../assets/sun-yellow.png";
import sunBlack from "../../assets/sun-black.png";

const Home = ({ navigation }) => {
  // initialize state in this Home component
  const state = useSelector((state) => state);

  // initializes variables for slider, lightlevel, and boolean for if user has submitted daily rating
  const [sliderValue, setValue] = useState(3)
  const [submittedRating, setSubmittedRating] = useState(false)
  const [lightLevel, setLightLevel] = useState(100)

  // THIS IS THE MAGIC BUTTON TO TEMPORARILY CHANGE THE LIGHT LEVEL
  const light=66;

  // this is sample data that we use to push to the user database
  const data ={
    time: [7,8,9],
    light: [5500, 7250, 4895]
  }
  // this iterates through the sample data to call function that pushes to the database
  const doIt = () => {
    data.time.forEach((time, index) => {
      console.log(data.light[index])
      tempWriteToDatabase(time, data.light[index])

    })
  }

  // this function pushes to the database using parameters time and lightData
  async function tempWriteToDatabase(time, lightData) {
    // intializes the dataRef variable to the desired path in the database
    const dataRef = db.ref("/users/" + state.uid+"/lightData")

    // pushes the data to the database
    await dataRef.push({time: time, light: lightData});
    console.log("finished push")
  }

  // this function is called when user submits their daily rating
  const writeToDatabase = () => {
    // this gets the current date and formats it
    var nowDate = new Date(); 
    var date = (nowDate.getMonth()+1)+'/'+nowDate.getDate()+'/'+nowDate.getFullYear(); 
    
    // specifies desired path in database and pushes mood and date to the database
    const dataRef = db.ref("/users/" + state.uid)
    dataRef.push({mood: sliderValue, date: date});
  };

  // this function queries the database to see if the user has already submitted a rating for the day
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
      console.log(submittedRating)
    })
  }

  // useEffect calls functions only when the home component is first rendered to prevent functions being called repeatedly
  useEffect(() => {
    // we only query the database one time to see if the user has already submitted a rating for the day
    queryDailyDatabase();

    // this sets the light level to the light variable
    setLightLevel(100-light)
    // doIt();
  }, [])

  
return (
    // safe area view allows for the app to be used on all devices without being cut off by the notch
    <SafeAreaView style={Styles.container}>

      {/* This view contains all the components related to displaying today's light intake and the sun */}
      <View>
        <View style={Styles.sunContainer}>
          <Image source={sunYellow} style={Styles.imageStyle}/>
          <View style={[Styles.imageMaskContainer, {height: `${lightLevel}%`}]}>
            {/* this image is the black sun that is masked by the yellow sun to display the light level */}
            <Image source={sunBlack} style={Styles.imageStyle}/>        
          </View>
        </View>
        <Text>You have hit {light}% of your daily light intake today</Text>
      </View>
      <View style={Styles.slider}>
        {/* this ternary operator checks if the user has already submitted a rating for the day */}
        {submittedRating?
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

// this component stores all the styles that are being used in the Home component
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
  },
  sunContainer: {
    justifyContent:'flex-start',
    alignItems:'center', 
    height:250, 
    marginTop:125
  },
  imageStyle: {
    width: 250,
    height: 250,
  },
  imageMaskContainer: {
    width: 250,
    position:'absolute', 
    overflow:"hidden", 
    display:'flex', 
    justifyContent:'flex-start'
  }
});