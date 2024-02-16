import * as Font from "../../../assets/fonts/Fonts";
import TextSize from "../../../styles/TextSize";
import colors from "../../../utils/Colors";


const { StyleSheet } = require("react-native");

const HomeStyles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.GRAY_COLOR
    },
    container: {
        flex: 1, backgroundColor: colors.COLOR_WHITE, justifyContent: "center"
    },
    listStyle: {
        width: "90%", minHeight: 100, backgroundColor: colors.COLOR_WHITE, alignSelf: "center", borderRadius: 10, margin: 20, flexDirection: "row", padding: 14,
        alignItems:"center",
        shadowColor: colors.GRAY_COLOR,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.9,
        shadowRadius: 3,
        elevation: 3
    },
    itemListStyle: {
        width: "45%", minHeight: 100, backgroundColor: colors.COLOR_WHITE, alignSelf: "center", borderRadius: 10, margin: 10, padding: 2
    },
    itemImageStyle: {
        height: 100, width: 100
    },
    itemTextStyle: {
        fontSize: TextSize.SMALLTEXT, ...Font.FONT_REGULAR, color: colors.BLACK_COLOR
    },
    itemImageParent : { backgroundColor: colors.LIGHT_GRAY, padding: 14, borderRadius: 10, alignItems: "center" }
});

export default HomeStyles;
