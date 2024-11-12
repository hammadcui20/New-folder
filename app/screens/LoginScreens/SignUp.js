import React, { useState } from "react";
import { StyleSheet, View, Text, ScrollView, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Btn, ImageBtn, Input } from "../../components";
import {
  validateUsername,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from "../../utils/validations";
import Loading from "../../modal/loading";
import { useTheme } from "../../../assets/colors/ThemeContext";
import { login } from "../../reducers/UserSlice"; // Import login action
import { BASE_URL } from "@env"; // Import BASE_URL from environment

export default function SignUp() {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUsernameChange = (e) => {
    setUsername(e);
    validateUsername({ e, error: setUsernameError });
  };

  const handleEmailChange = (e) => {
    setEmail(e);
    validateEmail({ e, error: setEmailError });
  };

  const handlePasswordChange = (e) => {
    setPassword(e);
    validatePassword({ e, error: setPasswordError });
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e);
    validateConfirmPassword({
      password,
      confirmPassword: e,
      error: setConfirmPasswordError,
    });
  };

  const handleSignUp = async () => {
    setLoading(true);
    let usernameFlag = validateUsername({
      e: username,
      error: setUsernameError,
    });
    let emailFlag = validateEmail({ e: email, error: setEmailError });
    let passwordFlag = validatePassword({
      e: password,
      error: setPasswordError,
    });
    let confirmPasswordFlag = validateConfirmPassword({
      password,
      confirmPassword,
      error: setConfirmPasswordError,
    });

    if (usernameFlag && emailFlag && passwordFlag && confirmPasswordFlag) {
      const userData = { username, email, password1: password, password2: confirmPassword }; // Update user data to match API format
      
      try {
        // Send registration request to API
        const response = await axios.post("https://6520-116-71-184-99.ngrok-free.app/api/register/", userData);

        if (response.data.status === "success") {
          // Dispatch login action to Redux
          dispatch(login({ username, email }));

          // Save to AsyncStorage
          await AsyncStorage.setItem("user", JSON.stringify({ username: "user", email }));

          // Navigate to Welcome screen
          navigation.replace("Welcome");
        } else {
          // Show error message from API response
          Alert.alert("Registration Failed", response.data.message);
        }
      } catch (error) {
        console.error("Error during registration: ", error);
        Alert.alert("Error", "Something went wrong during registration.");
      }
    }
    setLoading(false);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      {loading && <Loading />}
      <ImageBtn
        marginLeft={25}
        marginTop={50}
        marginBottom={50}
        alignSelf="flex-start"
        source={require("../../../assets/images/back.png")}
        onPress={() => navigation.goBack()}
      />
      <Text style={[styles.title, { color: theme.textPrimary }]}>
        Welcome back! Glad to see you, Again!
      </Text>
      <Input
        placeholder="Username"
        value={username}
        onChangeText={handleUsernameChange}
        error={usernameError}
        labelFontFamily="Bold"
        fontFamily="Regular"
        inputContainerStyle={{ paddingVertical: 5 }}
        containerStyle={{ marginHorizontal: 15 }}
      />
      <Input
        placeholder="Email"
        value={email}
        onChangeText={handleEmailChange}
        error={emailError}
        labelFontFamily="Bold"
        fontFamily="Regular"
        inputContainerStyle={{ paddingVertical: 5 }}
        containerStyle={{ marginHorizontal: 15 }}
      />
      <Input
        placeholder="Password"
        value={password}
        onChangeText={handlePasswordChange}
        error={passwordError}
        labelFontFamily="Bold"
        fontFamily="Regular"
        inputContainerStyle={{ paddingVertical: 5 }}
        containerStyle={{ marginHorizontal: 15 }}
        secureTextEntry
      />
      <Input
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={handleConfirmPasswordChange}
        error={confirmPasswordError}
        labelFontFamily="Bold"
        fontFamily="Regular"
        inputContainerStyle={{ paddingVertical: 5 }}
        containerStyle={{ marginHorizontal: 15 }}
        secureTextEntry
      />
      <Btn text="Agree and Register" width="93%" onPress={handleSignUp} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: "Black",
    color: "#1E232C",
    width: "78%",
    marginLeft: 15,
    marginBottom: 50,
  },
});
