
import "react-native-gesture-handler";
import * as React from "react";
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import RegisterStyles from "./Styles";
import Input from "../../../components/TextInput";
import ThemeButton from "../../../components/ThemeButton";
import Locale from "../../../locale/Index";
import Constants from "../../../utils/Constants";
import ToastCollection from "../../../utils/Toast";
import colors from "../../../utils/Colors";
import FireStoreManager from "../../../firestore/FireStoreManager";
import Keys from "../../../utils/Keys";
import UserManager from "../../../store/UserManager";
import { Loader } from "../../../components/Loader";
import { AuthContext } from "../../../context/Context";

function Register({ navigation }) {

    const [name, setName] = React.useState("");
    const [storeName, setStoreName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [number, setNumber] = React.useState("");
    const [password, setpassword] = React.useState("");
    const [cnfPassword, setCnfPassword] = React.useState("");
    const [checked, setChecked] = React.useState(false);
    const [isSecure, setSecuredPassword] = React.useState(true);
    const [isLoading, setLoading] = React.useState(false);


    function onPressRegister(context) {
        if (!name) {
            ToastCollection.toastShowAtBottom(Locale.ENGLISH.TOAST_ENTER_NAME);
            return;
        }
        if (!storeName) {
            ToastCollection.toastShowAtBottom(Locale.ENGLISH.TOAST_ENTER_STORE_NAME);
            return;
        }
        if (!email) {
            ToastCollection.toastShowAtBottom(Locale.ENGLISH.TOAST_ENTER_EMAIL);
            return;
        }
        if (!email.match(Constants.EMAIL_REGEX)) {
            ToastCollection.toastShowAtBottom(Locale.ENGLISH.TOAST_VALID_EMAIL);
            return;
        }
        if (!number) {
            ToastCollection.toastShowAtBottom(Locale.ENGLISH.TOAST_ENTER_NUMBER);
            return;
        }
        if (!password) {
            ToastCollection.toastShowAtBottom(Locale.ENGLISH.TOAST_ENTER_PASSWORD);
            return;
        }
        if (password !== cnfPassword) {
            ToastCollection.toastShowAtBottom(Locale.ENGLISH.TOAST_MATCH_PASSWORD);
            return;
        }

        if (checked) {
            registerRetailer(context);

        } else {
            registerCustomer(context);
        }
        setLoading(true);

        function registerRetailer(context) {
            const registerRetailer = {
                "name": name,
                "storeName": storeName,
                "email": email,
                "number": number,
                "password": password,
                "image": "",
                "address": "",
                "userType": Keys.USER_TYPE_RETAILER
            };
            FireStoreManager.registerRetailer(registerRetailer, (success, error) => {
                setLoading(false);
                if (success) {
                    console.log("success ----->>>", success);
                    UserManager.instance.persistUserType(JSON.stringify(success));
                    context.signUp({ id: success.id, userType: success.userType });
                } else if (error) {
                    console.log("Register ERROR --->>", error);
                }

            });
        }

        function registerCustomer(context) {
            const registerCustomer = {
                "name": name,
                "email": email,
                "number": number,
                "password": password,
                "image": "",
                "address": "",
                "userType": Keys.USER_TYPE_CUSTOMER
            };
            FireStoreManager.registerCustomer(registerCustomer, (success, error) => {
                setLoading(false);
                if (success) {
                    UserManager.instance.persistUserType(JSON.stringify(success));
                    context.signUp({ id: success.id, userType: success.userType });
                    console.log("Register Success --->>", success);
                } else if (error) {
                    console.log("Register ERROR --->>", error);
                }
            });
        }
    }

    function manageSecuredPassword() {
        if (isSecure) {
            setSecuredPassword(false);
        } else {
            setSecuredPassword(true);
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
                            <View style={{ flex: 1 }}>
                                <View style={RegisterStyles.textFieldContainer}>
                                    <Text style={RegisterStyles.firstLabelStyle}>{Locale.ENGLISH.TEXT_CREATE_ACCOUNT}</Text>
                                    <Text style={RegisterStyles.secondLabelStyle}>{Locale.ENGLISH.TEXT_GET_STARTED}</Text>
                                </View>
                                <View style={RegisterStyles.container}>
                                    <Input
                                        placeholder={Locale.ENGLISH.INPUT_ENTER_NAME}
                                        onChangeText={name => setName(name)}
                                    />
                                   { checked && <Input
                                        placeholder={Locale.ENGLISH.INPUT_ENTER_STORE_NAME}
                                        onChangeText={storeName => setStoreName(storeName)}
                                    />}
                                    <Input
                                        softKeyBoardType={"email-address"}
                                        placeholder={Locale.ENGLISH.INPUT_ENTER_EMAIL}
                                        onChangeText={email => setEmail(email)}
                                    // autoCapitalize={false}
                                    />

                                    <Input
                                        softKeyBoardType={"number-pad"}
                                        placeholder={Locale.ENGLISH.INPUT_ENTER_NUMBER}
                                        onChangeText={number => setNumber(number)}
                                        maxLength={10}
                                    />
                                    <Input
                                        secureTextEntry={isSecure ? true : false}
                                        placeholder={Locale.ENGLISH.INPUT_ENTER_PASSWORD}
                                        onChangeText={password => setpassword(password)}
                                    />
                                    <TouchableOpacity
                                        style={{ position: "absolute", right: 15 }}
                                        onPress={() => manageSecuredPassword()}
                                    >
                                        <Image
                                            // eslint-disable-next-line max-len
                                            style={{ width: 24, height: 24, marginRight: 40, marginTop: checked ? 110 : 40, tintColor: isSecure ? colors.THEMECOLOR : colors.GRAY_COLOR }}
                                            source={require("../../../assets/icons/eye.png")}
                                        />
                                    </TouchableOpacity>
                                    <Input
                                        secureTextEntry={isSecure ? true : false}
                                        placeholder={Locale.ENGLISH.INPUT_ENTER_CNF_PASSWORD}
                                        onChangeText={cnfPassword => setCnfPassword(cnfPassword)}
                                    />
                                    <TouchableOpacity style={RegisterStyles.checkBoxContainer} onPress={() => {
                                        manageCheckBox();
                                    }}>
                                        <Image
                                            style={RegisterStyles.checkBoxImageStyle}
                                            source={checked ? require(".././../../assets/icons/check.png") : require(".././../../assets/icons/unCheck.png")}
                                        />
                                        <Text style={RegisterStyles.checkBoxTextStyle}>Sign up as a Retailer</Text>
                                    </TouchableOpacity>

                                    <ThemeButton buttonText={Locale.ENGLISH.BUTTON_SIGNUP} onClick={() => {
                                        onPressRegister(context);
                                    }} />
                                </View>
                                <View style={RegisterStyles.linkButtonContainer}>
                                    <Text style={RegisterStyles.linkTextLabelStyle}>{Locale.ENGLISH.TEXT_ALREADY_MEMBER} </Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate("Login");
                                        }}>
                                        <Text style={RegisterStyles.linkButtonTextLabel}>{Locale.ENGLISH.TEXT_SIGNIN}</Text>
                                    </TouchableOpacity>
                                </View>
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

export default Register;
