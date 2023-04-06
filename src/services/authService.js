import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "../../firebase";

// const logIn = async (user) => {
//   console.log("user info", user);
//   const { username, password } = user;
//   if (username === "Admin" && password === "Admin123") {
//     AsyncStorage.setItem("user", JSON.stringify(user));
//     return {
//       status: "success",
//       message: "You are redirecting to home page",
//       user: username,
//     };
//   }
// };

const logIn = async (user) => {
  console.log("got called")
  const { email, password } = user;
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
  if(response) {
    return {
      status: "success",
      message: "You are redirecting to home page",
      user: email,
      uid: response.userCredentials.user.uid
    }
  } 

  // if (response.user) {
  //   AsyncStorage.setItem("user", JSON.stringify(user));
  //   return {
  //     status: "success",
  //     message: "You are redirecting to home page",
  //     user: username,
  //   };
  // }
};

const logOut = async () => {
  AsyncStorage.clear();
  return {
    status: "success",
    message: "You are logged out",
  };
};
export default {
  logIn,
  logOut,
};
