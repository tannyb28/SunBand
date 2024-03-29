import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Button, KeyboardAvoidingView } from "react-native";
import { signup } from "./../actions/auth";
import BackButton from "../components/BackButton";
const Signup = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch();
  const handleSignup = () => {
    let user = {
      email: email,
      password: password
    };
    dispatch(signup(user))
      .then((response) => {
        console.log(response)
        if (response.status == "success") {
          navigation.navigate('Root', { screen: 'Home' });
        }
      })
      .catch((error) => {
        alert(error);
      });
  }
  
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <BackButton navigation={navigation} />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>
      <View style={styles.buttonContainer}>
        

        <TouchableOpacity
          style={[styles.button]}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};
export default Signup;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer:{
    width: "80%",
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40

  },
  button: {
    backgroundColor: '#000b96',
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText:{
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17,
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#000b96',
    borderWidth: 2,
  },
  buttonOutlineText: {
    color: '#bcd3ff',
    fontWeight: 'bold',
    fontSize: 17,
  },
});
