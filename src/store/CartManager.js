import AsyncStorage from "@react-native-community/async-storage";
import Key from "../utils/Keys";

export default class CartManager {
    static instance = CartManager.instance || new CartManager();

    persistToCart = async(cartData) => {
        try {
            var data = await AsyncStorage.setItem(Key.CART_MANAGE, JSON.stringify(cartData));
            return data;
        } catch (error) {
            console.log("error", error);
        }
    }

    retrieveCartItems = async() => {
        try {
            const value = await AsyncStorage.getItem(Key.CART_MANAGE);
            if (value !== null) {
                return JSON.parse(value);
            }
        } catch (error) {
            console.log("error", error);
            // Error retrieving data
        }
    }

    removeCartItems = async() => {
        try {
            await AsyncStorage.removeItem(Key.CART_MANAGE);
            return true;
          }
          catch (exception) {
            return false;
          }
    }
}
