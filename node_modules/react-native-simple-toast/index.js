import {NativeModules, ToastAndroid, Platform} from "react-native";

var RCTToastNative = Platform.OS === 'android' ? NativeModules.Toast : NativeModules.LRDRCTSimpleToast;

var ToastNative = {
    //Toast duration constants
    SHORT: RCTToastNative.SHORT,
    LONG: RCTToastNative.LONG,

    // Toast gravity constants
    TOP: RCTToastNative.TOP,
    BOTTOM: RCTToastNative.BOTTOM,
    CENTER: RCTToastNative.CENTER,

    show: function (message,
                    duration,
                    position,
                    styles) {
        RCTToastNative.show(message || "This is a toast message", duration || ToastNative.SHORT, position || ToastNative.TOP, styles || {});
    }
};

export default ToastNative;


// import { NativeModules, ToastAndroid, Platform } from 'react-native';

// const RCTToastAndroid =
//   Platform.OS === 'android' ? ToastAndroid : NativeModules.LRDRCTSimpleToast;

// const SimpleToast = {
//   // Toast duration constants
//   SHORT: RCTToastAndroid.SHORT,
//   LONG: RCTToastAndroid.LONG,

//   // Toast gravity constants
//   TOP: RCTToastAndroid.TOP,
//   BOTTOM: RCTToastAndroid.BOTTOM,
//   CENTER: RCTToastAndroid.CENTER,

//   show: function(message, duration) {
//     RCTToastAndroid.show(
//       message,
//       duration === undefined ? this.SHORT : duration,
//     );
//   },

//   showWithGravity: function(message, duration, gravity) {
//     RCTToastAndroid.showWithGravity(
//       message,
//       duration === undefined ? this.SHORT : duration,
//       gravity,
//     );
//   },

//   showWithGravityAndOffset: function(
//     message,
//     duration,
//     gravity,
//     xOffset,
//     yOffset,
//   ) {
//     RCTToastAndroid.showWithGravityAndOffset(
//       message,
//       duration === undefined ? this.SHORT : duration,
//       gravity,
//       xOffset === undefined ? 25 : xOffset,
//       yOffset === undefined ? 50 : yOffset,
//     );
//   },
// };

// export default SimpleToast;
