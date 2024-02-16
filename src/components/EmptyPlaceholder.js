import React from "react";
import { Text, View } from "react-native";
import { FONT_REGULAR } from "../assets/fonts/Fonts";
import TextSize from "../styles/TextSize";
import colors from "../utils/Colors";

export const EmptyPlaceholder = ({ message }) => (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", alignContent: "center", backgroundColor : colors.COLOR_WHITE }}>
        <Text style={{ fontSize: TextSize.SUBTITLE, ...FONT_REGULAR }}>{message}</Text>
    </View>
);
