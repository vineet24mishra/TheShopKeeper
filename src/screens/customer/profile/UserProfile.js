import * as React from "react";
import { Image, SafeAreaView, Text, View } from "react-native";
import Header from "../../../components/Header";
import ThemeButton from "../../../components/ThemeButton";
import { AuthContext } from "../../../context/Context";
import UserModelStore from "../../../store/UserManager";
import AlertController from "../../../utils/AlertManager";
import CartManager from "../../../store/CartManager";
import Locale from "../../../locale/Index";
import ProfileStyles from "../../retailer/profile/Style";

function UserProfile({ navigation, route }) {
  const [user, setUser] = React.useState({});
  const [itemCount, setItemCount] = React.useState(0);

  React.useEffect(() => {
    getCartItems();
    if (route.params?.userData) {
      navigation.setParams({ userData: undefined });
    }
    getUserDetails();
  }, [route.params?.userData]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("tabPress", () => {
      getCartItems();
      getUserDetails();

    });

    return unsubscribe;
  }, [navigation]);

  function onPressLogout(context) {
    AlertController.multipleActionAlert(Locale.ENGLISH.LOGOUT, Locale.ENGLISH.LOGOUT_MESSAGES,
      Locale.ENGLISH.NO, Locale.ENGLISH.YES, (callBack) => {
        if (callBack) {
          UserModelStore.instance.removeUser();
          CartManager.instance.removeCartItems();
          context.signOut();
        }
      });
  }


  function getCartItems() {
    CartManager.instance.retrieveCartItems().then((data) => {
      if (data) {
        const totalCartItems = data.length;
        setItemCount(totalCartItems);
      }

    });
  }

  function getUserDetails() {
    UserModelStore.instance.retrieveUserType().then((data) => {
      if (data) {
        setUser(data);
      }
    });
  }

  function updateCartItemCount(count) {
    setItemCount(count);
  }

  return (
    <AuthContext.Consumer>{
      context => {
        return (
          <SafeAreaView style={ProfileStyles.safeArea}>
            <Header
              isHomeScreen={true}
              userName={user.name}
              itemCountTotal={itemCount}
              onPress={() => { navigation.navigate("CartScreen", { updateCartItemCount: updateCartItemCount }); }} />
            <View style={ProfileStyles.container}>
              <View style={ProfileStyles.listStyle}>
                <Image source={require("../../../assets/icons/editUser.png")}
                  style={ProfileStyles.profileIcon}></Image>
                <Text style={[ProfileStyles.userText, { marginTop: 40 }]}>{user && user.name}</Text>
                <Text style={ProfileStyles.userText}>{user && user.email}</Text>
                <Text style={ProfileStyles.userText}>{user && user.number}</Text>
                <Text style={ProfileStyles.userText}>{user && user.address}</Text>
              </View>
              <View style={ProfileStyles.buttonParentView}>
                <ThemeButton
                  extraStyle={{ width: "30%" }}
                  buttonText={Locale.ENGLISH.LOGOUT}
                  onClick={() => { onPressLogout(context); }}
                />
                <ThemeButton
                  extraStyle={{ width: "30%" }}
                  buttonText={Locale.ENGLISH.BUTTON_EDIT_PROFILE}
                  onClick={() => {
                    navigation.navigate("EditProfile",
                      { userData: user, updateUserProfile: user });
                  }}
                />
              </View>
            </View>
          </SafeAreaView>
        );
      }
    }
    </AuthContext.Consumer>
  );
}

export default UserProfile;
