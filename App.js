import "react-native-gesture-handler";
import * as React from "react";
import {LogBox} from "react-native";
import Root from "./src/navigation/RootNavigation";

LogBox.ignoreAllLogs();

export default function App() {
  return <Root />;
}
