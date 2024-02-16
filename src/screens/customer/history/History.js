import { useNavigation } from "@react-navigation/core";
import * as React from "react";
import { FlatList, Image, SafeAreaView, Text, View } from "react-native";
import { EmptyPlaceholder } from "../../../components/EmptyPlaceholder";
import Header from "../../../components/Header";
import { Loader } from "../../../components/Loader";
import FireStoreManager from "../../../firestore/FireStoreManager";
import Locale from "../../../locale/Index";
import CartManager from "../../../store/CartManager";
import UserModelStore from "../../../store/UserManager";
import TextSize from "../../../styles/TextSize";
import colors from "../../../utils/Colors";
import CartStyles from "../cart/Styles";
import HistoryStyle from "../history/Styles";
import HomeStyles from "../home/Styles";

function History() {
  const navigation = useNavigation();
  const [itemList, setOrderHistory] = React.useState([]);
  const [itemCount, setItemCount] = React.useState(0);
  const [user, setUserName] = React.useState([]);
  const [isLoading, setLoading] = React.useState(false);


  React.useEffect(() => {
    getUserDetails();
    getCartItems();
  }, []);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("tabPress", () => {
      getCartItems();
      getUserDetails();

    });
    return unsubscribe;
  }, [navigation]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getCartItems();
      getUserDetails();

    });
    return unsubscribe;
  }, [navigation]);


  function getCartItems() {
    CartManager.instance.retrieveCartItems().then((data) => {
      if (data) {
        const totalCartItems = data.length;
        setItemCount(totalCartItems);
      }
    });
  }

  function getOrderHistoryList(userId) {
    setLoading(true);
    FireStoreManager.getOrderHistoryList(userId, (success) => {
      setLoading(false);
      console.log("success", success);
      if (success) {
        setOrderHistory(success);
      }
    });
  }

  function getUserDetails() {
    UserModelStore.instance.retrieveUserType().then((data) => {
      setUserName(data);
      getOrderHistoryList(data.id);
    });
  }

  function updateCartItemCount(count) {
    setItemCount(count);
  }

  function renderItem({ item }) {
    const orderStatusColor = item.orderStatus == 0 ? "green" : item.orderStatus == 1 ? "green" : item.orderStatus == 3 ? colors.THEMECOLOR : "red";
    const orderStatusText = item.orderStatus == 0 ? "Pending" : item.orderStatus == 1 ? "Accepted" : item.orderStatus == 3 ? "Delivered" : "Declined by retailer";
    return (
      <View style={CartStyles.cartCellStyle}>
        <View style={CartStyles.detailViewStyle}>
          <Image
            style={CartStyles.cartImageStyel}
            source={require("../../../assets/icons/imagePlaceholder.png")}
          />
        </View>
        <View style={{ padding: 20 }}>
          <Text style={[HomeStyles.itemTextStyle, { fontSize: TextSize.NORMAL_TEXT }]}>{item.productName}</Text>
          <Text style={HomeStyles.itemTextStyle}>{Locale.ENGLISH.RUPEE_SIGN + item.productPrice}</Text>
        </View>
        <Text style={{ position: "absolute", top: 20, right: 0, color: orderStatusColor }}>{orderStatusText}</Text>
        <Text style={{ position: "absolute", bottom: 20, right: 0, color: colors.GRAY_COLOR }}>{item.purchasedAt}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={HistoryStyle.safeArea}>
      <Header
        isHomeScreen={true}
        userName={user.name}
        itemCountTotal={itemCount}
        onPress={() => { navigation.navigate("CartScreen", { updateCartItemCount: updateCartItemCount }); }}
      />
      <View style={HistoryStyle.container}>
        {itemList.length == 0 && !isLoading ? <EmptyPlaceholder message={Locale.ENGLISH.NO_PURCHASE_HISTORY} /> : <FlatList
          data={itemList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />}
      </View>
      {isLoading && <Loader />}
    </SafeAreaView>
  );
}

export default History;
