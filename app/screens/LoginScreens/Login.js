import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Btn, Input } from "../../components";
import Loading from "../../modal/loading";
import { useTheme } from "../../../assets/colors/ThemeContext";
import { useDispatch } from "react-redux";
import { login } from "../../reducers/UserSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {BASE_URL} from "@env"
// import CookieManager from "@react-native-cookies/cookies";

export default function Login() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle username change
  const handleUsernameChange = (e) => {
    setUsername(e);
  };

  // Handle password change
  const handlePasswordChange = (e) => {
    setPassword(e);
  };

  const getCSRFToken = async () => {
    const response = await axios.get(`${BASE_URL}/login/`);
    const csrfToken = response; // or `csrftoken` from cookies
    return csrfToken;
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://6520-116-71-184-99.ngrok-free.app/api/login/",
        { username, password },
      );
  
      if (response.data.status === "success") {
        const { user_email, type } = response.data;
        console.log(type)
        const userData = { username: "user", user_email, type };
        console.log(userData)
        
        // Navigate based on user type
        if (type === "rider") {
          navigation.replace("Welcome");
        } else if (type === "customer") {
          dispatch(login(userData));
        // Save to AsyncStorage
        await AsyncStorage.setItem("user", JSON.stringify(userData));
        // Navigate to the Welcome screen
        navigation.replace("Welcome");
        }
      } else {
        Alert.alert("Login failed", response.data.message);
      }
    } catch (error) {
      console.log("Login error:", error);
      Alert.alert("Login error", "An error occurred while trying to log in.");
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {loading && <Loading />}

      <Text style={[styles.title, { color: theme.textPrimary }]}>
        Welcome back! Glad to see you, Again!
      </Text>

      <Input
        placeholder="Username"
        value={username}
        onChangeText={handleUsernameChange}
        labelFontFamily="Bold"
        fontFamily="Regular"
        inputContainerStyle={{ paddingVertical: 5 }}
        containerStyle={{ marginHorizontal: 15 }}
      />
      <Input
        placeholder="Password"
        value={password}
        onChangeText={handlePasswordChange}
        labelFontFamily="Bold"
        fontFamily="Regular"
        inputContainerStyle={{ paddingVertical: 5 }}
        containerStyle={{ marginHorizontal: 15 }}
        secureTextEntry
      />

      <TouchableOpacity
        onPress={() => navigation.navigate("ForgotPassword")}
        style={{ alignSelf: "flex-end", marginRight: 20, marginBottom: 50 }}
      >
        <Text style={[styles.label, { color: theme.primary }]}>
          Forgot Password?
        </Text>
      </TouchableOpacity>

      <Btn text="Login" width="93%" onPress={handleLogin} />

      <TouchableOpacity
        onPress={() => navigation.navigate("SignUp")}
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 50,
          alignSelf: "center",
        }}
      >
        <Text
          style={[
            styles.label,
            { color: theme.textSecondary, fontFamily: "Regular" },
          ]}
        >
          Don’t have an account?
        </Text>
        <Text style={[styles.label, { color: theme.primary }]}>
          {" "}
          Register Now
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontFamily: "Black",
    width: "78%",
    marginLeft: 15,
    marginBottom: 50,
  },
  label: {
    fontFamily: "Bold",
    fontSize: 14,
  },
});
