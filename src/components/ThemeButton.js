import React from "react";
import { StyleSheet, Text } from "react-native";
import Colors from "../utils/Colors";
import {TouchableOpacityDoubleClick} from "../utils/PreventDoubleClick";
import TextSize from "../styles/TextSize";
import * as Fonts from "../assets/fonts/Fonts";


const ThemeButton = ({
    onClick, buttonText, extraStyle
}) => (
    <TouchableOpacityDoubleClick style={[styles.buttonContainer, extraStyle]}
        onPress={() => onClick()}>
        <Text style = {styles.buttonTextStyle}>{buttonText}</Text>
    </TouchableOpacityDoubleClick>
);

export default ThemeButton;

const styles = StyleSheet.create({
    buttonContainer : {
        width : "80%",
        height : 50,
        justifyContent:"center",
        borderRadius:10,
        backgroundColor : Colors.THEMECOLOR,
        margin:10
    },
    buttonTextStyle :{
        ...Fonts.FONT_BOLD,
        textAlign : "center",      
        color : Colors.COLOR_WHITE,
        fontSize: TextSize.BUTTON
    }
});
