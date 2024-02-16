import { useNavigation } from "@react-navigation/core";
import * as React from "react";
import { FlatList, Image, SafeAreaView, Text, View } from "react-native";
import { EmptyPlaceholder } from "../../../components/EmptyPlaceholder";
import Header from "../../../components/Header";
import { Loader } from "../../../components/Loader";
import FireStoreManager from "../../../firestore/FireStoreManager";
import TextSize from "../../../styles/TextSize";
import HomeStyles from "./Styles";
import { TouchableOpacityDoubleClick } from "../../../utils/PreventDoubleClick";
import CartManager from "../../../store/CartManager";
import colors from "../../../utils/Colors";
import Locale from "../../../locale/Index";
import UserModelStore from "../../../store/UserManager";

function Home() {

  const navigation = useNavigation();
  const [itemList, setProductsToList] = React.useState([]);
  const [itemCount, setItemCount] = React.useState(0);
  const [isLoading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState({});


  React.useEffect(() => {
    getAllProducts();
    getCartItems();
    getUserDetails();
  }, []);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("tabPress", () => {
      getAllProducts();
      getCartItems();
      getUserDetails();

    });

    return unsubscribe;
  }, [navigation]);


  function getAllProducts() {
    setLoading(true);
    FireStoreManager.getAllProducts((success) => {
      setLoading(false);
      if (success) {
        setProductsToList(success);
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
      setUser(data);
    });
  }


  function updateCartItemCount(count) {
    setItemCount(count);
  }


  function renderItem({ item }) {
    return (
      <TouchableOpacityDoubleClick
        onPress={() => { navigation.navigate("ProductDetail", { data: item, updateCartItemCount: updateCartItemCount, userID: user.id }); }}
        style={HomeStyles.itemListStyle}>
        <View style={{ backgroundColor: colors.LIGHT_GRAY, padding: 14, borderRadius: 10, alignItems: "center" }}>
          <Image
            style={HomeStyles.itemImageStyle}
            source={require("../../../assets/icons/imagePlaceholder.png")}
          />
        </View>
        <Text style={[HomeStyles.itemTextStyle, { fontSize: TextSize.NORMAL_TEXT }]}>
          {item.productName}
        </Text>
        <Text style={HomeStyles.itemTextStyle}>
          {Locale.ENGLISH.RUPEE_SIGN + item.productPrice}
        </Text>
        <Text style={[HomeStyles.itemTextStyle, { color: parseInt(item.productQuantity) == 0 ? "red" : "green" }]}>
          {parseInt(item.productQuantity) != 0 ? Locale.ENGLISH.IN_STOCK + item.productQuantity : Locale.ENGLISH.OUT_OF_STOCK}
        </Text>


      </TouchableOpacityDoubleClick>
    );
  }

  return (
    <SafeAreaView style={HomeStyles.safeArea}>
      <Header
        itemCountTotal={itemCount}
        userName={user.name}
        onPress={() => { navigation.navigate("CartScreen", { updateCartItemCount: updateCartItemCount }); }}
        isHomeScreen={true} />
      <View style={HomeStyles.container}>
        {itemList.length == 0 ? !isLoading && <EmptyPlaceholder message={Locale.ENGLISH.MESSAGE_EMPTY_LIST} />
          : <FlatList
            data={itemList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            numColumns={2}
          />}
      </View>
      {isLoading && <Loader />}
    </SafeAreaView>
  );
}

export default Home;
