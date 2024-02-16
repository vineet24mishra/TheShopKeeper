import * as React from "react";
import { SafeAreaView, FlatList, View, Image, Text } from "react-native";
import { Loader } from "../../../components/Loader";
import { EmptyPlaceholder } from "../../../components/EmptyPlaceholder";
import { TouchableOpacityDoubleClick } from "../../../utils/PreventDoubleClick";
import HomeStyles from "./Style";
import Locale from "../../../locale/Index";
import UserManager from "../../../store/UserManager";
import FireStoreManager from "../../../firestore/FireStoreManager";
import TextSize from "../../../styles/TextSize";
import ToastCollection from "../../../utils/Toast";
import RetailerHeader from "../../../components/RetailerHeader";

function Home({ navigation }) {

  const [itemList, setProductsList] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    getUsersDetails();
  }, []);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("tabPress", () => {
      getUsersDetails();
    });

    return unsubscribe;
  }, [navigation]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getUsersDetails();
    });

    return unsubscribe;
  }, [navigation]);

  function getUsersDetails() {
    UserManager.instance.retrieveUserType().then((userInfo) => {
      if (userInfo) {
        getAllListedProduct(userInfo.id);
      }
    });
  }

  function getAllListedProduct(id) {
    setLoading(true);
    if (id) {
      FireStoreManager.getRetailersAllProducts(id, (success, error) => {
        setLoading(false);
        if (success) {
          setProductsList(success);
        }
        if (error) {
          ToastCollection.toastShowAtBottom(Locale.ENGLISH.TOAST_SOMETHING_WENT_WRONG);
        }

      });
    }
  }

  function renderItem({ item }) {
    return (
      <TouchableOpacityDoubleClick
        onPress={() => { navigation.navigate("ProductDetail", { data: item }); }}
        style={HomeStyles.itemListStyle}>
        <View style={HomeStyles.itemImageParent}>
          <Image
            style={HomeStyles.itemImageStyle}
            source={require("../../../assets/icons/imagePlaceholder.png")}
          />
        </View>
        <Text style={[HomeStyles.itemTextStyle, { fontSize: TextSize.NORMAL_TEXT, marginTop: 5 }]}>
          {item.productName}
        </Text>
        <Text style={[HomeStyles.itemTextStyle]}>
          {Locale.ENGLISH.RUPEE_SIGN + item.productPrice}
        </Text>

        <Text style={[HomeStyles.itemTextStyle, { color: parseInt(item.productQuantity) == 0 ? "red" : "green" }]}>
          {parseInt(item.productQuantity) == 0 ? "Out of stock" : Locale.ENGLISH.IN_STOCK + item.productQuantity}
        </Text>

      </TouchableOpacityDoubleClick>
    );
  }

  return (
    <SafeAreaView style={HomeStyles.safeArea}>
      <RetailerHeader isHomeScreen={true} customLabel={Locale.ENGLISH.HOME_SCREEN_TITLE} />
      <View style={HomeStyles.container}>
        {!isLoading && itemList.length == 0 ? <EmptyPlaceholder message={Locale.ENGLISH.MESSAGE_EMPTY_LIST} />
          : <FlatList
            data={itemList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            numColumns={2}
          />
        }
      </View>
      {isLoading && <Loader />}
    </SafeAreaView>
  );
}

export default Home;
