import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { db } from '../../firebase';
import { LineChart } from "react-native-chart-kit";

const Tracking = () => {
  // define the state variable
  const state = useSelector((state) => state);
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);
  // query the light data from the database
  const queryLightData = () => {
    const dataRef = db.ref("/users/" + state.uid + "/lightData")
    dataRef.orderByChild("time").on("value", (snapshot) => {
      const data = [];
      snapshot.forEach((childSnapshot) => {
        data.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });
      // reverse the array to get the most recent entries first
      const mostRecentData = data.reverse();
      // iterate through data and push the time and light data to the labels and data arrays
      mostRecentData.forEach((item, index) => {
        setLabels((labels) => [...labels, item.time])
        setData((data) => [...data, item.light])
      })
    })
  }

  // define the line chart data in the format that the line chart expects
  const lineData = {
    labels: labels,
    datasets: [
      {
        data: data
      }
    ]
  }

  // useEffect calls functions only when the tracking component is first rendered to prevent functions being called repeatedly
  useEffect(() => {
    setData([])
    setLabels([])
    queryLightData();
  }, [])
  return (
    <SafeAreaView>
      <Text>Tracking</Text>
      {/* <LineChart
        data={lineData}
        width={400}
        height={220}
        yAxisLabel="$"
        yAxisSuffix="k"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726"
          }
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      /> */}
    </SafeAreaView>
  )
}

export default Tracking