import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { Btn, Input } from "../../components";
import {
  validateUsername,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from "../../utils/validations";
import Loading from "../../modal/loading";
import { useTheme } from "../../../assets/colors/ThemeContext";
import { useSelector, useDispatch } from "react-redux";
import { pickImage } from "../../utils/ImagePicker"; // Adjust the path as needed

export default function Profile() {
  const user = useSelector((state) => state.userSlice.user);

  const navigation = useNavigation();
  const { theme } = useTheme();

  const [username, setUsername] = useState(user.username);
  const [usernameError, setUsernameError] = useState("");
  const [email, setEmail] = useState(user.email);
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [profileImage, setProfileImage] = useState(null); // New state for profile image
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

  // Function to pick an image from the gallery
  const handlePickImage = async () => {
    const result = await pickImage();
    if (result) {
      setProfileImage(result.uri);
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <Text style={[styles.title, { color: theme.textPrimary }]}></Text>

      <TouchableOpacity onPress={handlePickImage} style={styles.imageContainer}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.image} />
        ) : (
          <Text style={[styles.imagePlaceholder, { color: theme.textPrimary }]}>
            Tap to select profile image
          </Text>
        )}
      </TouchableOpacity>

      <Input
        placeholder="Username"
        value={username}
        onChangeText={handleUsernameChange}
        error={usernameError}
        labelFontFamily="Bold"
        fontFamily="Regular"
        inputContainerStyle={{ paddingVertical: 5 }}
        containerStyle={{ marginHorizontal: 15 }}
        readOnly
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
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 75,
    width: 150,
    height: 150,
    overflow: "hidden",
    alignSelf: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imagePlaceholder: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
  },
});
