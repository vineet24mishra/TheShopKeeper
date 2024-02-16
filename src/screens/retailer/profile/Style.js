import colors from "../../../utils/Colors";
const { StyleSheet } = require("react-native");
import * as Fonts from "../../../assets/fonts/Fonts";
import  TextSize from "../../../styles/TextSize";

const ProfileStyles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.GRAY_COLOR
    },
    container: {
        flex: 1, backgroundColor: colors.COLOR_WHITE, justifyContent: "center"
    },
    listStyle: {
        width: "90%", backgroundColor: colors.COLOR_WHITE, alignSelf: "center", borderRadius: 10, margin: 20, padding: 14,
        alignItems: "center",
        shadowColor: colors.GRAY_COLOR,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.9,
        shadowRadius: 3,
        elevation: 3,
        minHeight: 400, 
        flexDirection: "column" 
    },
    buttonParentView : { 
        flexDirection: "row",
        justifyContent: "space-evenly", 
        width: "100%" 
    },
    userText: { ...Fonts.FONT_REGULAR, fontSize: TextSize.SUBTITLE },
    profileIcon : { height: 150, width: 150 }
});

export default ProfileStyles;
