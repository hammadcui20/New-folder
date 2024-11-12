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

import { validateOTP } from "../../utils/validations";
import Loading from "../../modal/loading";
import { useTheme } from "../../../assets/colors/ThemeContext";

export default function OtpScreen() {
  const navigation = useNavigation();
  const { theme } = useTheme();

  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");

  const [loading, setLoading] = useState(false);

  const handleOtpChange = (e) => {
    setOtp(e);
    validateOTP({ e, error: setOtpError });
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
          OTP Verification
        </Text>
        <Text style={[styles.label, { color: theme.textSecondary }]}>
          Enter the verification code we just sent on your otp address.
        </Text>
        <Input
          placeholder="Enter Otp"
          value={otp}
          onChangeText={handleOtpChange}
          error={otpError}
          labelFontFamily="Bold"
          fontFamily="Regular"
          inputContainerStyle={{ paddingVertical: 5 }}
          containerStyle={{ marginHorizontal: 15 }}
        />
        <Text> </Text>
        <Btn
          text="Verify"
          width="93%"
          onPress={() => {
            setLoading(true);
            let otpFlag = validateOTP({ e: otp, error: setOtpError });
            setTimeout(() => {
              if (otpFlag) {
                navigation.replace("ResetPassword");
              }
              setLoading(false);
            }, 1000);
          }}
        />
      </View>
      <View contentContainerStyle={styles.container}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Login");
          }}
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 50,
            alignSelf: "center",
          }}
        >
          <Text style={[styles.label, { color: theme.textSecondary }]}>
            Didn’t received code?
          </Text>
          <Text
            style={[
              styles.label,
              { fontFamily: "Bold", marginLeft: -15, color: theme.primary },
            ]}
          >
            {" "}
            Resend
          </Text>
        </TouchableOpacity>
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
    width: "78%",
    marginLeft: 15,
    marginBottom: 15,
  },
  label: {
    fontFamily: "Regular",
    fontSize: 15,
    marginHorizontal: 15,
    marginBottom: 50,
  },
});
