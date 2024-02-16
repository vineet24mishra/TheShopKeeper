import { useNavigation } from "@react-navigation/core";
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView } from "react-native";
import * as Font from "../assets/fonts/Fonts";
import TextSize from "../styles/TextSize";
import colors from "../utils/Colors";


function RetailerHeader({ isHomeScreen, customLabel }) {
    const navigation = useNavigation();

    return (
        <SafeAreaView>
            {!isHomeScreen
                ? <View style={localStyles.headerContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image
                            source={require("../assets/icons/backArrow.png")}
                            style={localStyles.headerImage} />
                    </TouchableOpacity>
                    <Text style = {localStyles.headerText}>{customLabel}</Text>
                </View>
                : <View style={localStyles.headerContainer}>
                    <Text numberOfLines={1} style={localStyles.headerText}>
                        {customLabel}
                    </Text>
                </View>
            }

        </SafeAreaView>
    );
}

const localStyles = StyleSheet.create({
    headerContainer: {
        height: 50,
        backgroundColor: colors.GRAY_COLOR,
        flexDirection: "row",
        // justifyContent: "space-between",
        alignContent: "center"
    },
    headerImage: {
        height: 24,
        width: 24,
        tintColor: colors.COLOR_WHITE,
        marginStart: 10, marginTop: 12
    },
    headerText: {
        height: 30,
        fontSize: TextSize.SUBTITLE,
        ...Font.FONT_BOLD,
        color: colors.COLOR_WHITE,
        marginStart: 10, alignSelf: "center"
    },
    headerCartImage: {
        height: 24,
        width: 24,
        marginEnd: 10,
        marginTop: 12,
        marginBottom: 10,
        alignSelf: "flex-end",
        tintColor: colors.COLOR_WHITE

    }
});
export default RetailerHeader;
