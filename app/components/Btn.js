import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "../../assets/colors/ThemeContext"; // Adjust the import path as necessary

export default function Btn({
  backgroundColor,
  borderColor,
  width = "90%",
  borderRadius = 6,
  color,
  fontFamily = "Regular",
  fontSize = 18,
  text = "Click Me!",
  paddingVertical = 15,
  onPress = () => {
    // console.log("Clicked...");
  },
  containerStyle = {}, // Additional styles for TouchableOpacity container
  textStyle = {}, // Additional styles for Text
  ...props // Accept any other additional props
}) {
  const { theme } = useTheme();

  const btnBackgroundColor = backgroundColor || theme.primary;
  const btnBorderColor = borderColor || theme.border;
  const textColor = color || theme.neutral1;

  return (
    <TouchableOpacity
      style={[
        styles.btnContainer,
        {
          backgroundColor: btnBackgroundColor,
          width,
          borderColor: btnBorderColor,
          borderRadius,
          paddingVertical,
        },
        containerStyle, // Apply additional container styles
      ]}
      onPress={onPress}
      {...props}
    >
      <Text
        style={[
          { color: textColor, fontFamily, fontSize },
          textStyle, // Apply additional text styles
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    alignItems: "center",
    borderWidth: 2,
    margin: 2,
  },
});
