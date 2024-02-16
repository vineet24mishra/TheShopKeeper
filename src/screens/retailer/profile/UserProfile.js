import * as React from "react";
import { SafeAreaView, View, Image, Text } from "react-native";
import ThemeButton from "../../../components/ThemeButton";
import { AuthContext } from "../../../context/Context";
import UserModelStore from "../../../store/UserManager";
import AlertController from "../../../utils/AlertManager";
import ProfileStyle from "./Style";
import UserManager from "../../../store/UserManager";
import RetailerHeader from "../../../components/RetailerHeader";
import Locale from "../../../locale/Index";


function UserProfile({navigation, route}) {
  const [user, setUser] = React.useState({});

  React.useEffect(() => {
    UserManager.instance.retrieveUserType().then((user) => {
      setUser(user);
    });
  });

  React.useEffect(() => {
    if(route.params?.userData){
        setUser(route.params?.userData);
        navigation.setParams({userData: undefined});
    }
  }, [route.params?.userData]);

  function onPressLogout(context) {
    AlertController.multipleActionAlert(Locale.ENGLISH.LOGOUT, Locale.ENGLISH.LOGOUT_MESSAGES,
      Locale.ENGLISH.NO, Locale.ENGLISH.YES, (callBack) => {
        if (callBack) {
          UserModelStore.instance.removeUser();
          context.signOut();
        }
      });
  }

  return (
    <AuthContext.Consumer>{
      context => {
        return (
          <SafeAreaView style={ProfileStyle.safeArea}>
            <RetailerHeader isHomeScreen = {true} customLabel = {Locale.ENGLISH.PROFILE_SCREEN_TITLE} />
            <View style={ProfileStyle.container}>
              <View style={ProfileStyle.listStyle}>
              <Image source={require("../../../assets/icons/editUser.png")}
                  style={ProfileStyle.profileIcon}></Image>
                <Text style={[ProfileStyle.userText, { marginTop: 40 }]}>{user && user.name}</Text>
                <Text style={ProfileStyle.userText}>{user && user.email}</Text>
                <Text style={ProfileStyle.userText}>{user && user.number}</Text>
                <Text style={ProfileStyle.userText}>{user && user.address}</Text>
              </View>
              <View style={ProfileStyle.buttonParentView}>
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
                      { userData: user});
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
