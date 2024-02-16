import * as Font from "../../../assets/fonts/Fonts";
import TextSize from "../../../styles/TextSize";
import colors from "../../../utils/Colors";


const { StyleSheet } = require("react-native");

const ProductStyles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.GRAY_COLOR
    },
    container: {
        flex: 1, backgroundColor: colors.COLOR_WHITE
    },
    itemImageStyle : {
        width: "100%", backgroundColor: colors.GRAY_COLOR, padding: 20, alignItems: "center", height: 200
    },
    itemDescTextStyle : {
        fontSize: TextSize.NORMAL_TEXT, ...Font.FONT_REGULAR
    },
    itemNameTextStyle : {
        fontSize: TextSize.TITLE, ...Font.FONT_REGULAR
    },
    priceBottomView : {
        position: "absolute", bottom: 0, height: 150, left: 0, right: 0, padding: 20, borderTopColor: colors.GRAY_COLOR, borderTopWidth: 1
    },
    itemPriceTextStyle : {
        fontSize: TextSize.TITLE, ...Font.FONT_REGULAR, marginStart: 10 
    }
    
});

export default ProductStyles;
