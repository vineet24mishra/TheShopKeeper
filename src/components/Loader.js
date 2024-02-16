import React from "react";
import { View, ActivityIndicator, StyleSheet, Dimensions } from "react-native";
import colors from "../utils/Colors";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export const Loader = () => (
        <View style={styles.mainView}>
            <View style={styles.activityIndicatorViewStyle}>
               <ActivityIndicator size="large" color={colors.THEMECOLOR} />
            </View>
        </View>
);

const styles = StyleSheet.create({
    mainView: {
        width: width,
        height:height,
        justifyContent: "center",
        alignItems: "center",
        position:"absolute"
    },
    activityIndicatorViewStyle : {
        height: 80, 
        width: 80, 
        backgroundColor:colors.GRAY_COLOR, 
        borderRadius: 10, justifyContent:"center"
    }
});
