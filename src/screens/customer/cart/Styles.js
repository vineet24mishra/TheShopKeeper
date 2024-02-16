import { StyleSheet } from "react-native";
import TextSize from "../../../styles/TextSize";
import colors from "../../../utils/Colors";
import * as Font from "../../../assets/fonts/Fonts";

const CartStyles = StyleSheet.create(
    {
        cartCellStyle : {
            flexDirection: "row", width: "90%", padding: 10
        },
        deleteButtonStyle : {
            position: "absolute", right: 0, top: 20
        },
        deleteButtonImageStyle : {
            height: 24, width: 24
        },
        detailViewStyle : {
            backgroundColor: colors.LIGHT_GRAY, padding: 20, borderRadius: 10
        },
        cartImageStyel : {
            height: 50, width: 50
        },
        horizontalDetailViewStyle : {
            flexDirection: "row", justifyContent: "space-between", margin: 3 
        },
        infoLabelStyle : {
            color: colors.GRAY_COLOR, ...Font.FONT_REGULAR, fontSize: TextSize.NORMAL_TEXT, marginStart: 10 
        },
        infoValueStyle : {
            color: colors.BLACK_COLOR, ...Font.FONT_REGULAR, fontSize: TextSize.NORMAL_TEXT, marginEnd: 10, marginStart: 5
        },
        mainDetailViewStyle : {
            position: "absolute", bottom: 0, left: 0, right: 0, height: 200, borderTopColor: colors.GRAY_COLOR, borderTopWidth: 1, backgroundColor: colors.COLOR_WHITE
        },
        titleTextStyle : {
            padding: 10, fontSize: TextSize.SUBTITLE, ...Font.FONT_BOLD
        }
    }
);

export default CartStyles;
