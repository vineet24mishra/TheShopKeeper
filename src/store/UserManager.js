import AsyncStorage from "@react-native-community/async-storage";
import Key from "../utils/Keys";

export default class UserModelStore {
    static instance = UserModelStore.instance || new UserModelStore();

    persistUserType = async(userData) => {

        this.storeDetails(Key.USER_TYPE, userData);
    }

    storeDetails = async(key, value) => {
        if (key == Key.USER_TYPE) {
            try {
                var data = await AsyncStorage.setItem(key, value);
                return data;
            } catch (error) {
                console.log("error", error);
            }
        }
    }

    retrieveUserType = async() => {
        try {
            const value = await AsyncStorage.getItem(Key.USER_TYPE);
            if (value !== null) {
                return JSON.parse(value);
            }
        } catch (error) {
            console.log("error", error);
            // Error retrieving data
        }
    }

    removeUser = async() => {
        try {
            await AsyncStorage.removeItem(Key.USER_TYPE);
            return true;
          }
          catch (exception) {
            return false;
          }
    }
}
