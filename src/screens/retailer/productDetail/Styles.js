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
    buttonParentViewStyle : {flex : 1,  justifyContent : "center", alignItems : "center"}
    
});

export default ProductStyles;
