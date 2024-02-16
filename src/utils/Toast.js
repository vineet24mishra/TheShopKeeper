import Toast from "react-native-simple-toast";
import colors from "./Colors";

export default class ToastCollection  {
  
    static toastShowAtTop = (toastMessage) => {
        Toast.show(toastMessage, Toast.SHORT, Toast.TOP, ToastStyleStandard);
    }

    static toastShowAtCenter = (toastMessage) => {
        Toast.show(toastMessage, Toast.SHORT, Toast.CENTER, ToastStyleStandard);
    }

    static toastShowAtBottom = (toastMessage) => {
        Toast.show(toastMessage, Toast.SHORT, Toast.BOTTOM, ToastStyleStandard);
    }

}

export const ToastStyleStandard = {
	backgroundColor: colors.THEMECOLOR,
	color: colors.COLOR_WHITE,
	fontSize: 16,
	borderRadius: 10, //ios only
	// fontWeight: "bold",
	yOffset: 40 //android only
};
