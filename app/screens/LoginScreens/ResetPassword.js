import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Linking,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Btn, ImageBtn, Input } from "../../components";

import {
  validateUsername,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from "../../utils/validations";

import Loading from "../../modal/loading";

import { useTheme } from "../../../assets/colors/ThemeContext";

export default function ResetPassword() {
  const navigation = useNavigation();
  const { theme } = useTheme();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

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

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {loading ? <Loading /> : null}

      <View style={{ height: "85%" }}>
        <ImageBtn
          marginLeft={25}
          marginTop={50}
          marginBottom={50}
          alignSelf="flex-start"
          source={require("../../../assets/images/back.png")}
          onPress={() => navigation.goBack()}
        />
        <Text style={[styles.title, { color: theme.textPrimary }]}>
          Create new password
        </Text>
        <Text style={[styles.label, { color: theme.textSecondary }]}>
          Your new password must be unique from those previously used.
        </Text>
        <Input
          placeholder="New Password"
          value={password}
          onChangeText={handlePasswordChange}
          error={passwordError}
          labelFontFamily="Bold"
          fontFamily="Regular"
          inputContainerStyle={{ paddingVertical: 5 }}
          containerStyle={{ marginHorizontal: 15 }}
          secureTextEntry // To hide the password input
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
          secureTextEntry // To hide the confirm password input
        />
        <Text> </Text>
        <Btn
          text="Reset Password"
          width="93%"
          onPress={() => {
            setLoading(true);
            let passwordFlag = validatePassword({
              e: password,
              error: setPasswordError,
            });
            let confirmPasswordFlag = validateConfirmPassword({
              password,
              confirmPassword,
              error: setConfirmPasswordError,
            });

            setTimeout(() => {
              if (passwordFlag && confirmPasswordFlag) {
                navigation.replace("PasswordChanged");
              }
              setLoading(false);
            }, 1000);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontFamily: "Black",
    color: "#1E232C",
    width: "78%",
    marginLeft: 15,
    marginBottom: 15,
  },
  label: {
    fontFamily: "Regular",
    fontSize: 15,
    color: "#6A707C",
    marginHorizontal: 15,
    marginBottom: 50,
  },
});
