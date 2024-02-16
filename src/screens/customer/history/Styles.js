import { StyleSheet } from "react-native";
import TextSize from "../../../styles/TextSize";
import colors from "../../../utils/Colors";
import * as Font from "../../../assets/fonts/Fonts";

const HistoryStyle = StyleSheet.create(
    {
        safeArea: {
            flex: 1,
            backgroundColor: colors.GRAY_COLOR
        },
        container: {
            flex: 1, backgroundColor: colors.COLOR_WHITE, justifyContent: "center"
        },
        listStyle: {
            width: "90%", minHeight: 100, backgroundColor: colors.COLOR_WHITE, alignSelf: "center", borderRadius: 10, margin: 20, flexDirection: "row", padding: 14,
            alignItems: "center",
            shadowColor: colors.GRAY_COLOR,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.9,
            shadowRadius: 3,
            elevation: 3
        },
        itemImageStyle: {
            height: 100, width: 100
        },
        itemTextStyle: {
            fontSize: TextSize.NORMAL_TEXT, ...Font.FONT_REGULAR, color: colors.GRAY_COLOR, marginEnd: 10
        },
        itemTextView: {
            minHeight: 100, width: 2, backgroundColor: colors.COLOR_WHITE, marginLeft: 20
        }
    }
);

export default HistoryStyle;
