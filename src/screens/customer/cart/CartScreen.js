import * as React from "react";
import { FlatList, Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { EmptyPlaceholder } from "../../../components/EmptyPlaceholder";
import Header from "../../../components/Header";
import { Loader } from "../../../components/Loader";
import ThemeButton from "../../../components/ThemeButton";
import FireStoreManager from "../../../firestore/FireStoreManager";
import Locale from "../../../locale/Index";
import CartManager from "../../../store/CartManager";
import UserModelStore from "../../../store/UserManager";
import TextSize from "../../../styles/TextSize";
import AlertController from "../../../utils/AlertManager";
import colors from "../../../utils/Colors";
import HomeStyles from "../home/Styles";
import CartStyles from "./Styles";

function CartScreen({ navigation, route }) {

  const [cartItems, setCartItems] = React.useState([]);
  const [allProductPrice, setProductPrice] = React.useState(0);
  const [isLoading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState({});

  React.useEffect(() => {
    getCartItems();
    getUserDetails();
  }, []);

  function getCartItems() {
    setLoading(true);
    CartManager.instance.retrieveCartItems().then((data) => {
      setLoading(false);
      if (data) {
        setCartItems(data);
        getTotalCost(data);
      }
    });
  }

  function getTotalCost(items) {
    var sum = 0;
    for (let index = 0; index < items.length; index++) {
      const element = items[index];
      sum += parseInt(element.productPrice);
    }
    setProductPrice(sum.toFixed());
  }

  function getUserDetails() {
    UserModelStore.instance.retrieveUserType().then((data) => {
      setUser(data);
    });
  }

  function removeItemFromCart(index) {
    AlertController.multipleActionAlert(Locale.ENGLISH.REMOVE_ITEM, Locale.ENGLISH.REMOVE_ITEM_MESSAGE,
      Locale.ENGLISH.NO, Locale.ENGLISH.YES, (callBack) => {
        if (callBack) {
          var totalData = [...cartItems];
          var removeItem = totalData.indexOf(index);
          totalData.splice(removeItem, 1);
          setCartItems(totalData);
          CartManager.instance.persistToCart(totalData);
          route.params.updateCartItemCount(totalData.length);
          getTotalCost(totalData);
        }
      });
  }

  function checkoutItems() {
    const currentDate = new Date();
    const timestamp = currentDate.getTime();
    AlertController.multipleActionAlert(Locale.ENGLISH.CONFIRMATION, Locale.ENGLISH.BUY_ITEM_ALERT,
      Locale.ENGLISH.NO, Locale.ENGLISH.YES, (callBack) => {
        if (callBack) {
          setLoading(true);
          cartItems.customerDetails = user;
          cartItems.orderStatus = 0;
          cartItems.timestamp = timestamp;
          FireStoreManager.checkoutProcess(cartItems, (success) => {
            console.log(" checkoutItems success : ", success);
            setCartItems([]);
            CartManager.instance.removeCartItems();
            route.params.updateCartItemCount(0);
          });
          updateOrderHistory();
        }
      });
  }

  function updateOrderHistory() {
    FireStoreManager.updateOrderHistory(cartItems, user.id, (success) => {
      setLoading(false);
      if (success) {
        console.log("success", success);
        AlertController.singleActionAlert(Locale.ENGLISH.SUCCESS, Locale.ENGLISH.ORDER_SUCCESS, (callback) => {
          if (callback) {
            navigation.navigate("History");
          }
        });
      }
    });
  }

  function renderItem({ item, index }) {
    return (
      <View style={CartStyles.cartCellStyle}>
        <TouchableOpacity
          onPress={() => { removeItemFromCart(index); }}
          style={CartStyles.deleteButtonStyle}>
          <Image
            style={CartStyles.deleteButtonImageStyle}
            source={require("../../../assets/icons/removeItem.png")}
          />
        </TouchableOpacity>
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
      </View>
    );
  }

  function RenderHorizontalTextView({ lable, value }) {
    return (
      <View style={CartStyles.horizontalDetailViewStyle}>
        <Text style={CartStyles.infoLabelStyle}>{lable}</Text>
        <Text
          numberOfLines={3}
          style={CartStyles.infoValueStyle}>{value}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={HomeStyles.safeArea}>
      <Header
        isHomeScreen={false} />
      { cartItems.length == 0 && !isLoading ? <EmptyPlaceholder message={Locale.ENGLISH.EMPTY_CART} /> : <View style={HomeStyles.container}>
        <Text style={CartStyles.titleTextStyle}>{Locale.ENGLISH.MY_CART}</Text>
        <FlatList
          style={{ backgroundColor: colors.COLOR_WHITE }}
          data={cartItems}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
        <View style={CartStyles.mainDetailViewStyle}>
          <Text style={CartStyles.titleTextStyle}>{Locale.ENGLISH.ORDER_INFO}</Text>
          <RenderHorizontalTextView
            lable={Locale.ENGLISH.TOTAL}
            value={allProductPrice}
          />
          <RenderHorizontalTextView
            lable={Locale.ENGLISH.TOTAL_ITEM}
            value={cartItems.length}
          />
          <RenderHorizontalTextView
            lable={Locale.ENGLISH.DELIVERY_ADDRESS}
            value={"Vijay Nagar, Indore"}
          />
          <ThemeButton
            extraStyle={{ alignSelf: "center", width: "90%" }}
            buttonText={Locale.ENGLISH.CHECKOUT}
            onClick={() => { checkoutItems(); }}
          />
        </View>
      </View>}
      { isLoading && <Loader />}
    </SafeAreaView>
  );
}

export default CartScreen;
