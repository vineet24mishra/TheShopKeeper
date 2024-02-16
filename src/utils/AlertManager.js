import { Alert } from "react-native";

export default class AlertController {
    static dismissActionAlert = (title, message, buttonTitle) => {
        Alert.alert(
            title,
            [
                { text: buttonTitle, onPress: () => console.log("Cancel Pressed"), style: "cancel" }
            ],
            { cancelable: false }
        );
    }

    static multipleActionAlert = (title, message, buttonTitleOne, buttonTitleTwo, callback) => {
        Alert.alert(
            title,
            message,
            [
                { text: buttonTitleOne, onPress: () => { callback(false); }, style: "cancel" },
                { text: buttonTitleTwo, onPress: () => { callback(true); } }
            ],
            { cancelable: false }
        );
    }

    static singleActionAlert = (title, message, callback) => {
        Alert.alert(
            title,
            message,
            [
                { text: "Ok", onPress: () => { callback(true); }, style: "cancel"  }
            ],
            { cancelable: false }
        );
    }
}
