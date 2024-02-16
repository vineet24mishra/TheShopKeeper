import * as React from "react";
import {Image, StyleSheet} from "react-native";
import colors from "../../utils/Colors";

export function TabIcon({image, focused}) {
  return (
    <Image
      style={[styles.active_tab_icon, { tintColor: focused.focused ? colors.THEMECOLOR : colors.GRAY_COLOR }]}
      source={image}
    />
  );
}

const styles = StyleSheet.create({
  active_tab_icon: {
    alignSelf: "center",
    height: 22,
    marginTop:5,
    width: 22
  }
});
