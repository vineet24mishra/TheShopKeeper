import "react-native-gesture-handler";
import * as React from "react";
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import LoginStyles from "./Styles";
import Input from "../../../components/TextInput";
import ThemeButton from "../../../components/ThemeButton";
import colors from "../../../utils/Colors";
import ToastCollection from "../../../utils/Toast";
import Locale from "../../../locale/Index";
import FireStoreManager from "../../../firestore/FireStoreManager";
import Keys from "../../../utils/Keys";
import { Loader } from "../../../components/Loader";
import UserManager from "../../../store/UserManager";
import { AuthContext } from "../../../context/Context";


function Login({ navigation }) {
  const [number, setPhoneNumber] = React.useState("");
  const [password, setpassword] = React.useState("");
  const [isSecure, setSecurePassword] = React.useState(true);
  const [checked, setChecked] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);


  function onPressLogin(context) {
    if (!number) {
      ToastCollection.toastShowAtBottom(Locale.ENGLISH.TOAST_ENTER_NUMBER);
      return;
    }
    if (!password) {
      ToastCollection.toastShowAtBottom(Locale.ENGLISH.TOAST_ENTER_PASSWORD);
      return;
    }
    firebaseLogin(context);
  }

  function firebaseLogin(context) {
    setLoading(true);
    if (checked) {
      FireStoreManager.checkForUserLogin(Keys.FIRESTORE_RETAILER_CREATION, number, password, (success, failed) => {
        setLoading(false);
        if (success) {
          console.log("success", success);
          UserManager.instance.persistUserType(JSON.stringify(success));
          context.signIn({ id: success.number, userType: success.userType });
        } else if (failed) {
          console.log("error", failed);
        }
      });
    } else {
      FireStoreManager.checkForUserLogin(Keys.FIRESTORE_CUSTOMER_CREATION, number, password, (success, failed) => {
        setLoading(false);

        if (success) {
          console.log("success", success);
          UserManager.instance.persistUserType(JSON.stringify(success));
          context.signIn({ id: success.number, userType: success.userType });
        } else if (failed) {
          console.log("error", failed);
        }
      });
    }

  }

  function securePassword() {
    if (isSecure) {
      setSecurePassword(false);
    } else {
      setSecurePassword(true);
    }
  }

  function manageCheckBox() {
    if (checked) {
      setChecked(false);
    } else {
      setChecked(true);
    }
  }

  return (
    <AuthContext.Consumer>{
      context => {
        return (
          <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <ScrollView>
              <View style={LoginStyles.textFieldContainer}>
                <Text style={LoginStyles.firstLabelStyle}>Welcome,</Text>
                <Text style={LoginStyles.secondLabelStyle}>Sign in to Continue!</Text>
              </View>
              <View style={LoginStyles.container}>
                <Input
                  softKeyBoardType = {"number-pad"}
                  placeholder="Enter Mobile Number"
                  onChangeText={number => setPhoneNumber(number)}
                  maxLength={10}
                />
                <Input
                  secureTextEntry={isSecure ? true : false}
                  placeholder="Enter Password"
                  onChangeText={password => setpassword(password)}
                />
                <TouchableOpacity
                  onPress={() => { securePassword(); }}
                  style={{ position: "absolute", right: 15 }}>
                  <Image
                    style={{ width: 24, height: 24, marginRight: 40, marginBottom: 55, tintColor: isSecure ? colors.THEMECOLOR : colors.GRAY_COLOR }}
                    source={require("../../../assets/icons/eye.png")}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={LoginStyles.checkBoxContainer} onPress={() => {
                  manageCheckBox();
                }}>
                  <Image
                    style={LoginStyles.checkBoxImageStyle}
                    source={checked ? require(".././../../assets/icons/check.png") : require(".././../../assets/icons/unCheck.png")}
                  />
                  <Text style={LoginStyles.checkBoxTextStyle}>Sign in as a Retailer</Text>
                </TouchableOpacity>
                <ThemeButton buttonText="Sign In" onClick={() => {
                  onPressLogin(context);
                }} />
              </View>
              <View style={LoginStyles.linkButtonContainer}>
                <Text style={LoginStyles.linkTextLabelStyle}>{"I'm a new user,"} </Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Register");
                  }}>
                  <Text style={LoginStyles.linkButtonTextLabel}>Sign Up</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>

            { isLoading && <Loader />}
          </SafeAreaView>
        );
      }
    }
    </AuthContext.Consumer>
  );
}
export default Login;

