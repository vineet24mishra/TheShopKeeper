import colors from "../../../utils/Colors";
const { StyleSheet } = require("react-native");

const AddProductStyle = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.GRAY_COLOR
    },
    container: {
        flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: colors.COLOR_WHITE
    }
});

export default AddProductStyle;
