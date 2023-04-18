import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Button, KeyboardAvoidingView } from "react-native";
import { login } from "./../actions/auth";
const Login = ({ navigation }) => {
  // initializes the state variables
  const [email, setEmail] = useState('tanishbhowmick@gmail.com');
  const [password, setPassword] = useState('Eragon28$');
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  // handles the login
  const handleLogin = () => {
    let user = {
      email: email,
      password: password
    };
    // dispatches the login action defined in src/actions/auth.js
    dispatch(login(user))
      // if the login is successful, the user is redirected to the Home screen
      .then((response) => {
        console.log(response)
        if (response.status == "success") {
          navigation.navigate('Root', { screen: 'Home' });
        }
      })
      // if the login fails, an alert is displayed
      .catch((error) => {
        alert("The password is invalid or the user does not have a password.");
      });
  }
  
  // renders the login screen
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
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
          onPress={()=> handleLogin()}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText} onPress={()=>navigation.navigate("SignupScreen")}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};
export default Login;


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
    color: '#000b96',
    fontWeight: 'bold',
    fontSize: 17,
  },
});
