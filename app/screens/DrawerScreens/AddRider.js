import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Linking,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Btn, ImageBtn, Input } from "../../components";

import {
  validateUsername,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateAddress,
  validateFullName,
  validatePhoneNumber,
} from "../../utils/validations";
import Loading from "../../modal/loading";

import { useTheme } from "../../../assets/colors/ThemeContext";

export default function AddRider() {
  const navigation = useNavigation();
  const { theme } = useTheme();

  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [fullName, setFullName] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [loading, setLoading] = useState(false);

  const handleUsernameChange = (e) => {
    setUsername(e);
    validateUsername({ e, error: setUsernameError });
  };

  const handleFullNameChange = (e) => {
    setFullName(e);
    validateFullName({ e, error: setFullNameError });
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e);
    validatePhoneNumber({ e, error: setPhoneNumberError });
  };

  const handleEmailChange = (e) => {
    setEmail(e);
    validateEmail({ e, error: setEmailError });
  };

  const handleAddressChange = (e) => {
    setAddress(e);
    validateAddress({ e, error: setAddressError });
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

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <Text style={[styles.title, { color: theme.textPrimary }]}></Text>

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
        placeholder="Full Name"
        value={fullName}
        onChangeText={handleFullNameChange}
        error={fullNameError}
        labelFontFamily="Bold"
        fontFamily="Regular"
        inputContainerStyle={{ paddingVertical: 5 }}
        containerStyle={{ marginHorizontal: 15 }}
      />
      <Input
        placeholder="Address"
        value={address}
        onChangeText={handleAddressChange}
        error={addressError}
        labelFontFamily="Bold"
        fontFamily="Regular"
        inputContainerStyle={{ paddingVertical: 5 }}
        containerStyle={{ marginHorizontal: 15 }}
      />
      <Input
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={handlePhoneNumberChange}
        error={phoneNumberError}
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
      <Btn
        text="Agree and Register"
        width="93%"
        onPress={() => {
          setLoading(true);
          let usernameFlag = validateUsername({
            e: username,
            error: setUsernameError,
          });
          let emailFlag = validateEmail({ e: email, error: setEmailError });
          let fullNameFlag = validateFullName({
            e: fullName,
            error: setFullNameError,
          });
          let addressFlag = validateAddress({
            e: address,
            error: setAddressError,
          });
          let phoneNumberFlag = validatePhoneNumber({
            e: phoneNumber,
            error: setPhoneNumberError,
          });
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
            if (
              usernameFlag &&
              emailFlag &&
              fullNameFlag &&
              addressFlag &&
              phoneNumberFlag &&
              passwordFlag &&
              confirmPasswordFlag
            ) {
              navigation.replace("Welcome");
            }
            setLoading(false);
          }, 1000);
        }}
      />

      <View style={{ marginBottom: 20 }}></View>
      {loading ? <Loading /> : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: "Black",
    color: "#1E232C",
    width: "78%",
    marginLeft: 15,
    marginVertical: 20,
  },
  label: {
    fontFamily: "Bold",
    fontSize: 14,
    color: "#6A707C",
  },
});
