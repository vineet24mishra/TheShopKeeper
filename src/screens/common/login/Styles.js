import colors from "../../../utils/Colors";
import * as Fonts from "../../../assets/fonts/Fonts";

const { StyleSheet } = require("react-native");

const LoginStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center", marginTop: 50
  },
  textFieldContainer: {
    marginTop: 70,
    marginLeft: 50,
    backgroundColor: colors.COLOR_WHITE,
    marginBottom : 30
  },
  firstLabelStyle: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 5,
    ...Fonts.FONT_BOLD
  },
  secondLabelStyle: {
    fontSize: 18,
    color: colors.GRAY_COLOR,
    fontWeight: "700",
    ...Fonts.FONT_REGULAR
  },
  linkButtonTextLabel: {
    color: colors.THEMECOLOR,
    fontSize: 16,
    fontWeight: "700",
    ...Fonts.FONT_REGULAR
  },
  linkButtonContainer: {
    flexDirection: "row",
    justifyContent: "center", alignItems:"center"
  },
  linkTextLabelStyle: {
    fontSize: 18,
    color: colors.GRAY_COLOR,
    fontWeight: "700",
    ...Fonts.FONT_REGULAR
  },
  checkBoxContainer:{ 
    flexDirection: "row", 
    alignSelf:"flex-start", 
    marginStart:50, 
    margin:20
  },
  checkBoxTextStyle:{
    marginStart: 10, 
    color:colors.GRAY_COLOR, 
    fontWeight:"700",
    ...Fonts.FONT_REGULAR, fontSize : 16
  },
  checkBoxImageStyle:{
    width: 20, 
    height: 20,
    tintColor: colors.THEMECOLOR
  }
});

export default LoginStyles;
