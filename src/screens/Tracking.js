import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Switch, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { db } from '../../firebase';
import { LineChart } from "react-native-chart-kit";
import MultiSwitch from 'react-native-multi-switch';
import _ from 'lodash';

const Tracking = () => {
  // define the state variable
  const state = useSelector((state) => state);
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);
  const [csvData, setCsvData] = useState([]);
  const [csvLabels, setCsvLabels] = useState([]);
  const [activeGraph, setActiveGraph] = useState(0);
  const [daily, setDaily] = useState(false);
  const toggleDaily = () => setDaily(previousState => !previousState);


  // query the light data from the database
  const queryLightData = () => {
    var nowDate = new Date();
    const dataRef = db.ref("/users/" + state.uid + "/lightData")
    dataRef.orderByChild("time").on("value", (snapshot) => {
      const data = [];
      setCsvData([]);
      setCsvLabels([]);
      snapshot.forEach((childSnapshot) => {
        data.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });
      data.forEach((item, index) => {
        setCsvLabels((labels) => [...labels, item.time])
        setCsvData((data) => [...data, item.light])
      })
      // reverse the array to get the most recent entries first
      const mostRecentData = data.reverse();
      // iterate through data and push the time and light data to the labels and data arrays
      mostRecentData.forEach((item, index) => {
        setLabels((labels) => [...labels, item.time])
        setData((data) => [...data, item.light])
      })
    })
  }
  console.log(daily)
  // define the line chart data in the format that the line chart expects
  const dayData = {
    labels: csvLabels,
    datasets: [
      {
        data: csvData,
        yAxisId: 'left',
      },
      {
        data: [10000],
        withDots: false
      }
    ]
  }
  const weekData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        // give me 7 random integer data points between 0 and 10000
        data: [3796, 8740, 5589, 6782, 9778, 3578, 1120]
      },
      {
        // give me 7 random data points divisible by 2000 between 2000 and 10000
        data: daily?[2000, 8000, 6000, 4000, 10000, 2000, 4000]:[3796],
        color: daily?(opacity = 1) => `rgba(255, 125, 255, ${opacity})`:null,
      },
      {
        data: [10000],
        withDots: false
      }
    ]
  }
  const monthData = {
    labels: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
    datasets: [
      {
        data: [3796, 8740, 5589, 6782, 9778, 3578, 1120, 3796, 8740, 5589, 6782, 9778, 3578, 7120, 4824,2520, 2024, 4576, 4898, 3000, 4250, 8000, 6000, 4000, 2000, 7000, 2938, 2573, 8283, 2938, 2938],
        yAxisId: 'left',
      },
      {
        data: daily?[2000,4000,8000,6000,4000,6000,2000,6000,2000,4000,6000,10000,6000,8000,3000,1000,2000,4000,2000,4000,6000,8000,4000,4000,2000,6000,6000,4000,10000,8000,6000]:[3796],
        yAxisId: 'right',
        color: daily?(opacity = 1) => `rgba(255, 125, 255, ${opacity})`:null,
      },
      {
        data: [10000],
        withDots: false
      }
    ]
  }
  const yearData = {
    labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    datasets: [
      {
        data: [3053, 1982, 2208, 7050, 5635, 8965, 7429, 9315, 7662,  8250, 4949, 3159],
        yAxisId: 'left',
      },
      {
        data: daily?[6000, 4000, 4000, 10000, 8000, 6000, 10000, 6000, 8000, 6000, 4000, 2000]:[3053],
        yAxisId: 'right',
        color: daily?(opacity = 1) => `rgba(255, 125, 255, ${opacity})`:null,
      },
      {
        data: [10000],
        withDots: false
      }
    ]
  }

  // useEffect calls functions only when the tracking component is first rendered to prevent functions being called repeatedly
  useEffect(() => {
    setData([])
    setLabels([])
    queryLightData();
  }, [])

  // function to change the active graph
  const ChangeGraph = () => {
    if(activeGraph == 0) {
      return (
        <View>
          <Text style={styles.header}>Tracking</Text>
          <View style={{display:'flex', flexDirection: 'row'}}>
            <LineChart
              data={dayData}
              width={350}
              height={250}
              yAxisLabel=""
              yAxisSuffix=""
              yAxisInterval={100} // optional, defaults to 1
              xAxisInterval={2}
              formatXLabel={(value) => value % 4 == 0 ? value : ''}
              // add parameter to select what data to display (select x labels and y data)


              chartConfig={{
                // backgroundColor: "#fff",
                // backgroundGradientFrom: "#f2f2f2",
                // backgroundGradientTo: "#f2f2f2",
                // decimalPlaces: 0, // optional, defaults to 2dp
                // color: (opacity = 1) => `rgba(0, 125, 255, ${opacity})`,
                // labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                // propsForDots: {
                //   r: "6",
                //   strokeWidth: "2",
                //   stroke: "#0000ff",
                // }
                backgroundColor: "#fff",
                backgroundGradientFrom: "#f2f2f2",
                backgroundGradientTo: "#f2f2f2",
                decimalPlaces: 0, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(0, 125, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,

              }}
              bezier
              style={{
                marginTop: 20,
                alignSelf: "center",
                borderRadius: 16
              }}
              fromZero={true}
            />
          </View>
          
          <View style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
            <MultiSwitch 
              choiceSize={40}
              activeItemStyle={[{color: 'white'}, {color: 'white'}, {color: 'white'}, {color: 'white'},]}
              inactiveItemStyle={[{color: 'black'}, {color: 'black'}, {color: 'black'}, {color: 'black'},]}
              layout={{vertical: 0, horizontal: -1}}
              containerStyles={[{
                backgroundColor: 'white',
                borderRadius: 20,
                borderWidth: 1,
                borderColor: "lightgrey",
                justifyContent: 'space-between',
              },
              {
                backgroundColor: 'white',
                borderRadius: 20,
                borderWidth: 1,
                borderColor: "lightgrey",
                justifyContent: 'space-between',
              },
              {
                backgroundColor: 'white',
                borderRadius: 20,
                borderWidth: 1,
                borderColor: "lightgrey",
                justifyContent: 'space-between',
              },
              {
                backgroundColor: 'white',
                borderRadius: 20,
                borderWidth: 1,
                borderColor: "lightgrey",
                justifyContent: 'space-between',
              }]}
              activeContainerStyle={[
                { backgroundColor: '#000dd6', borderRadius: 100, borderWidth: 1, borderColor: 'rgb(180, 180, 180)'},
                { backgroundColor: '#000dd6', borderRadius: 100, borderWidth: 1, borderColor: 'rgb(180, 180, 180)'},
                { backgroundColor: '#000dd6', borderRadius: 100, borderWidth: 1, borderColor: 'rgb(180, 180, 180)'},
                { backgroundColor: '#000dd6', borderRadius: 100, borderWidth: 1, borderColor: 'rgb(180, 180, 180)'}
              ]}
                            
              active={activeGraph}
              onActivate={(index) => {
                console.log(index)
                setActiveGraph(index)
              }}
            >
              <Text style={{fontSize: 15,}}>D</Text>
              <Text style={{fontSize: 15,}}>W</Text>
              <Text style={{fontSize: 15,}}>M</Text>
              <Text style={{fontSize: 15,}}>Y</Text>
        
            </MultiSwitch>
          </View>
        </View>
      )
    } else if (activeGraph == 1) {
      return (
        <View>
          <Text style={styles.header}>Tracking</Text>
          <View style={{display:'flex', flexDirection: 'row'}}>
            <LineChart
              data={weekData}
              width={350}
              height={250}
              yAxisLabel=""
              yAxisSuffix=""
              yAxisInterval={100} // optional, defaults to 1
              xAxisInterval={2}
              // formatXLabel={(value) => value % 4 == 0 ? value : ''}
              fromZero={true}
              chartConfig={{
                backgroundColor: "#fff",
                backgroundGradientFrom: "#f2f2f2",
                backgroundGradientTo: "#f2f2f2",
                decimalPlaces: 0, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(0, 55, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,

              }}
              
              bezier
              style={{
                marginTop: 20,
                alignSelf: "center",
                borderRadius: 16
              }}

            />

            {daily?<View>
              <Text style={styles.firstDaily}>5</Text>
              <Text style={styles.otherDailies}>4</Text>
              <Text style={styles.otherDailies}>3</Text>
              <Text style={styles.otherDailies}>2</Text>
              <Text style={styles.otherDailies}>1</Text>

            </View>:null}
          </View>
          <View style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
            <MultiSwitch 
              choiceSize={40}
              activeItemStyle={[{color: 'white'}, {color: 'white'}, {color: 'white'}, {color: 'white'},]}
              inactiveItemStyle={[{color: 'black'}, {color: 'black'}, {color: 'black'}, {color: 'black'},]}
              layout={{vertical: 0, horizontal: -1}}
              containerStyles={[{
                backgroundColor: 'white',
                borderRadius: 20,
                borderWidth: 1,
                borderColor: "lightgrey",
                justifyContent: 'space-between',
              },
              {
                backgroundColor: 'white',
                borderRadius: 20,
                borderWidth: 1,
                borderColor: "lightgrey",
                justifyContent: 'space-between',
              },
              {
                backgroundColor: 'white',
                borderRadius: 20,
                borderWidth: 1,
                borderColor: "lightgrey",
                justifyContent: 'space-between',
              },
              {
                backgroundColor: 'white',
                borderRadius: 20,
                borderWidth: 1,
                borderColor: "lightgrey",
                justifyContent: 'space-between',
              }]}
              activeContainerStyle={[
                { backgroundColor: '#000dd6', borderRadius: 100, borderWidth: 1, borderColor: 'rgb(180, 180, 180)'},
                { backgroundColor: '#000dd6', borderRadius: 100, borderWidth: 1, borderColor: 'rgb(180, 180, 180)'},
                { backgroundColor: '#000dd6', borderRadius: 100, borderWidth: 1, borderColor: 'rgb(180, 180, 180)'},
                { backgroundColor: '#000dd6', borderRadius: 100, borderWidth: 1, borderColor: 'rgb(180, 180, 180)'}
              ]}
                            
              active={activeGraph}
              onActivate={(index) => {
                console.log(index)
                setActiveGraph(index)
              }}
            >
              <Text style={{fontSize: 15,}}>D</Text>
              <Text style={{fontSize: 15,}}>W</Text>
              <Text style={{fontSize: 15,}}>M</Text>
              <Text style={{fontSize: 15,}}>Y</Text>
        
            </MultiSwitch>
          </View>
        </View>
      )
    } else if (activeGraph == 2) {
      return (
        <View>
          <Text style={styles.header}>Tracking</Text>
          
          <View style={{display:'flex', flexDirection: 'row'}}>
            <LineChart
              data={monthData}
              width={350}
              height={250}
              yAxisLabel=""
              yAxisSuffix=""
              yAxisInterval={100} // optional, defaults to 1
              xAxisInterval={2}
              formatXLabel={(value) => value % 4 == 0 ? value : ''}
              
              chartConfig={{
                backgroundColor: "#fff",
                backgroundGradientFrom: "#f2f2f2",
                backgroundGradientTo: "#f2f2f2",
                decimalPlaces: 0, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(0, 85, 205, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,

              }}
              bezier
              style={{
                marginTop: 20,
                alignSelf: "center",
                borderRadius: 16
              }}
              fromZero={true}
              
            />
            {daily?<View>
              <Text style={styles.firstDaily}>5</Text>
              <Text style={styles.otherDailies}>4</Text>
              <Text style={styles.otherDailies}>3</Text>
              <Text style={styles.otherDailies}>2</Text>
              <Text style={styles.otherDailies}>1</Text>

            </View>:null}
          </View>
          <View style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
            <MultiSwitch 
              choiceSize={40}
              activeItemStyle={[{color: 'white'}, {color: 'white'}, {color: 'white'}, {color: 'white'},]}
              inactiveItemStyle={[{color: 'black'}, {color: 'black'}, {color: 'black'}, {color: 'black'},]}
              layout={{vertical: 0, horizontal: -1}}
              containerStyles={[{
                backgroundColor: 'white',
                borderRadius: 20,
                borderWidth: 1,
                borderColor: "lightgrey",
                justifyContent: 'space-between',
              },
              {
                backgroundColor: 'white',
                borderRadius: 20,
                borderWidth: 1,
                borderColor: "lightgrey",
                justifyContent: 'space-between',
              },
              {
                backgroundColor: 'white',
                borderRadius: 20,
                borderWidth: 1,
                borderColor: "lightgrey",
                justifyContent: 'space-between',
              }]}
              activeContainerStyle={[
                { backgroundColor: '#000dd6', borderRadius: 100, borderWidth: 1, borderColor: 'rgb(180, 180, 180)'},
                { backgroundColor: '#000dd6', borderRadius: 100, borderWidth: 1, borderColor: 'rgb(180, 180, 180)'},
                { backgroundColor: '#000dd6', borderRadius: 100, borderWidth: 1, borderColor: 'rgb(180, 180, 180)'}
              ]}
                            
              active={activeGraph}
              onActivate={(index) => {
                console.log(index)
                setActiveGraph(index)
              }}
            >
              <Text style={{fontSize: 15,}}>D</Text>
              <Text style={{fontSize: 15,}}>W</Text>
              <Text style={{fontSize: 15,}}>M</Text>
              <Text style={{fontSize: 15,}}>Y</Text>
        
            </MultiSwitch>
          </View>
        </View>
      )
    } else if (activeGraph == 3) {
      return (
        <View>
          <Text style={styles.header}>Tracking</Text>
          
          <View style={{display:'flex', flexDirection: 'row'}}>
            <LineChart
              data={yearData}
              width={350}
              height={250}
              yAxisLabel=""
              yAxisSuffix=""
              yAxisInterval={100} // optional, defaults to 1
              xAxisInterval={2}
              // formatXLabel={(value) => value % 4 == 0 ? value : ''}
              fromZero={true}
              chartConfig={{
                backgroundColor: "#fff",
                backgroundGradientFrom: "#f2f2f2",
                backgroundGradientTo: "#f2f2f2",
                decimalPlaces: 0, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(0, 45, 195, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                
              }}
              bezier
              style={{
                marginTop: 20,
                alignSelf: "center",
                borderRadius: 16,
              }}
              
            />
            {daily?<View>
              <Text style={styles.firstDaily}>5</Text>
              <Text style={styles.otherDailies}>4</Text>
              <Text style={styles.otherDailies}>3</Text>
              <Text style={styles.otherDailies}>2</Text>
              <Text style={styles.otherDailies}>1</Text>

            </View>:null}
          </View>
          <View style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
            <MultiSwitch 
              choiceSize={40}
              activeItemStyle={[{color: 'white'}, {color: 'white'}, {color: 'white'}, {color: 'white'}, ]}
              inactiveItemStyle={[{color: 'black'}, {color: 'black'}, {color: 'black'}, {color: 'black'},]}
              layout={{vertical: 0, horizontal: -1}}
              containerStyles={[{
                backgroundColor: 'white',
                borderRadius: 20,
                borderWidth: 1,
                borderColor: "lightgrey",
                justifyContent: 'space-between',
              },
              {
                backgroundColor: 'white',
                borderRadius: 20,
                borderWidth: 1,
                borderColor: "lightgrey",
                justifyContent: 'space-between',
              },
              {
                backgroundColor: 'white',
                borderRadius: 20,
                borderWidth: 1,
                borderColor: "lightgrey",
                justifyContent: 'space-between',
              },
              {
                backgroundColor: 'white',
                borderRadius: 20,
                borderWidth: 1,
                borderColor: "lightgrey",
                justifyContent: 'space-between',
              }]}
              activeContainerStyle={[
                { backgroundColor: '#000dd6', borderRadius: 100, borderWidth: 1, borderColor: 'rgb(180, 180, 180)'},
                { backgroundColor: '#000dd6', borderRadius: 100, borderWidth: 1, borderColor: 'rgb(180, 180, 180)'},
                { backgroundColor: '#000dd6', borderRadius: 100, borderWidth: 1, borderColor: 'rgb(180, 180, 180)'},
                { backgroundColor: '#000dd6', borderRadius: 100, borderWidth: 1, borderColor: 'rgb(180, 180, 180)'}
              ]}
                            
              active={activeGraph}
              onActivate={(index) => {
                console.log(index)
                setActiveGraph(index)
              }}
            >
              <Text style={{fontSize: 15,}}>D</Text>
              <Text style={{fontSize: 15,}}>W</Text>
              <Text style={{fontSize: 15,}}>M</Text>
              <Text style={{fontSize: 15,}}>Y</Text>
        
            </MultiSwitch>
          </View>
        </View>
      )
    }
  }
  
  return (
    <SafeAreaView>
      <ChangeGraph />
      <View style={styles.toggleDailyContainer}>
        <Text style={styles.toggleHeader}>Show moods</Text>
        <Switch
          trackColor={{ false: "#000", true: "#000dd6" }}
          thumbColor={daily ? "#fff" : "#fff"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleDaily}
          value={daily}
        />
      </View>
      
    </SafeAreaView>
    
  )
  
}

const styles = StyleSheet.create({
  container: {
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    marginLeft: 20,
  },
  toggleHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 10,
  },
  toggleDailyContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  firstDaily: {
    marginTop: 27,
  },
  otherDailies: {
    marginTop: 28,
  }
})

export default Tracking