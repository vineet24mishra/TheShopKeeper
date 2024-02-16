import colors from "../../../utils/Colors";


const { StyleSheet } = require("react-native");

const EditProfileStyles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.GRAY_COLOR
    },
    container: { flex: 1, backgroundColor: colors.COLOR_WHITE, alignItems: "center", justifyContent: "center" },
    editImageStyle : { height: 150, width: 150, marginTop: 20 }
    
});

export default EditProfileStyles;
