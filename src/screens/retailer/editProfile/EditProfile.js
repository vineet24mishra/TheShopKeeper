import * as React from "react";
import { Image, SafeAreaView, ScrollView, View } from "react-native";
import RetailerHeader from "../../../components/RetailerHeader";
import { Loader } from "../../../components/Loader";
import Input from "../../../components/TextInput";
import ThemeButton from "../../../components/ThemeButton";
import FireStoreManager from "../../../firestore/FireStoreManager";
import Locale from "../../../locale/Index";
import UserModelStore from "../../../store/UserManager";
import colors from "../../../utils/Colors";
import Key from "../../../utils/Keys";
import ToastCollection from "../../../utils/Toast";
import EditProfileStyles from "./Style";

function EditProfile({ navigation, route }) {
  const [userData] = React.useState(route.params && route.params.userData);
  const [name, setName] = React.useState(userData.name);
  const [setEmail] = React.useState("");
  const [number, setNumber] = React.useState("");
  const [address, setAddress] = React.useState(userData.address);
  const [isLoading, setLoading] = React.useState(false);

  function onPressUpdateProfile() {
    setLoading(true);
    userData.address = address;
    userData.name = name;
    FireStoreManager.updateUserProfile(userData, Key.FIRESTORE_RETAILER_CREATION, (success, error) => {
      setLoading(false);
      if (success) {
        navigation.navigate("UserProfile", {userData: success});
        UserModelStore.instance.persistUserType(JSON.stringify(userData));
        ToastCollection.toastShowAtBottom(Locale.ENGLISH.PROFILE_UPDATED);
      } else if (error) {
        console.log("error", error);
      }
    });
  }

  return (
    <SafeAreaView style={EditProfileStyles.safeArea}>
      <RetailerHeader
        customLabel = {Locale.ENGLISH.EDIT_PROFILE_TITLE}
        isHomeScreen={false} />
      <ScrollView style={{ backgroundColor: colors.COLOR_WHITE }}>
        <View style={EditProfileStyles.container}>
          <Image source={require("../../../assets/icons/editUser.png")}
            style={EditProfileStyles.editImageStyle} />
          <Input
            placeholder={userData.name}
            onChangeText={name => setName(name)}
            editable={true}
            defaultValue={userData.name}
          />
          <Input
            softKeyBoardType={"email-address"}
            placeholder={userData.email}
            onChangeText={email => setEmail(email)}
            editable={false}
          />
          <Input
            softKeyBoardType={"number-pad"}
            placeholder={userData.number}
            onChangeText={number => setNumber(number)}
            maxLength={10}
            value={number}
            editable={false}
          />
          <Input
            placeholder={Locale.ENGLISH.INPUT_ADDRESS}
            onChangeText={retailerAddress => setAddress(retailerAddress)}
            defaultValue={userData.address}
          />
          <ThemeButton
            buttonText={Locale.ENGLISH.UPDATE_PROFILE}
            onClick={() => {
              onPressUpdateProfile(); 
            }} />
        </View>
      </ScrollView>

      { isLoading && <Loader />}
    </SafeAreaView>
  );
}

export default EditProfile;
