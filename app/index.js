import "react-native-gesture-handler";
import "react-native-get-random-values";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { ThemeProvider } from "../assets/colors/ThemeContext";
import { store } from "./store";
import { Provider } from "react-redux";

import MyApp from "./MyApp";

SplashScreen.preventAutoHideAsync();

export default function Index() {
  const [loaded, error] = useFonts({
    Black: require("../assets/fonts/Urbanist-Black.ttf"),
    Regular: require("../assets/fonts/Urbanist-Regular.ttf"),
    Thin: require("../assets/fonts/Urbanist-Thin.ttf"),
    ExtraBold: require("../assets/fonts/Urbanist-ExtraBold.ttf"),
    Bold: require("../assets/fonts/Urbanist-Bold.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Provider store={store}>
      <ThemeProvider>
        <MyApp />
      </ThemeProvider>
    </Provider>
  );
}
