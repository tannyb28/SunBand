// import necessary packages
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "../../firebase";

// login authentication service
const logIn = async (user) => {
  // gets email and password from user parameter
  const { email, password } = user;

  // firebase authentication with email and password and store user and uid in AsyncStorage
  const response = await auth
    .signInWithEmailAndPassword(email, password)
    .then(userCredentials => {
      const uid = userCredentials.user.uid;
      console.log(uid)
      AsyncStorage.setItem("user", JSON.stringify(user));
      AsyncStorage.setItem("uid", JSON.stringify(uid));
      return {
        userCredentials
      };
    })
    .catch(error => console.log(error.message));
  // if there is a response, that means the user is authenticated -> return success message
  if(response) {
    return {
      status: "success",
      message: "You are redirecting to home page",
      user: email,
      uid: response.userCredentials.user.uid
    }
  } 
};

// sign up authentication service follows same process as login service above but with different firebase auth function
const signUp = async (user) => {
  const { email, password } = user;
  const response = await auth
    .createUserWithEmailAndPassword(email, password)
    .then(userCredentials => {
      const uid = userCredentials.user.uid;
      console.log(uid)
      AsyncStorage.setItem("user", JSON.stringify(user));
      AsyncStorage.setItem("uid", JSON.stringify(uid));
      return {
        userCredentials
      };
    })
    .catch(error => console.log(error.message));
  if(response) {
    return {
      status: "success",
      message: "You are redirecting to home page",
      user: email,
      uid: response.userCredentials.user.uid
    }
  }
};

// if logout is called, clear AsyncStorage and return success message
const logOut = async () => {
  AsyncStorage.clear();
  return {
    status: "success",
    message: "You are logged out",
  };
};

// export all functions
export default {
  logIn,
  logOut,
  signUp
};
