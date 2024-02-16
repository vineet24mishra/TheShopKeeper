import * as React from "react";
import { Image, SafeAreaView, Text, View } from "react-native";
import Header from "../../../components/Header";
import { Loader } from "../../../components/Loader";
import ThemeButton from "../../../components/ThemeButton";
import FireStoreManager from "../../../firestore/FireStoreManager";
import Locale from "../../../locale/Index";
import CartManager from "../../../store/CartManager";
import UserModelStore from "../../../store/UserManager";
import AlertController from "../../../utils/AlertManager";
import ToastCollection from "../../../utils/Toast";
import HomeStyles from "../home/Styles";
import ProductStyles from "./Styles";

function ProductDetail({ navigation, route }) {

    const [itemData] = React.useState(route.params && route.params.data);
    const [userID] = React.useState(route.params && route.params.userID);
    const [cartItems] = React.useState([]);
    const [isLoading, setLoading] = React.useState(false);
    const [user, setUser] = React.useState({});

    React.useEffect(() => {
        getCartItems();
        getUserDetails()
    });

    function addProductToCart() {
        cartItems.push(itemData);
        CartManager.instance.persistToCart(cartItems);
        route.params.updateCartItemCount(cartItems.length);
        ToastCollection.toastShowAtTop(Locale.ENGLISH.PRODUCT_ADDED_TO_CART);
    }

    function getUserDetails() {
        UserModelStore.instance.retrieveUserType().then((data) => {
            setUser(data);
        });
    }

    function getCartItems() {
        CartManager.instance.retrieveCartItems().then((data) => {
            if (data) {
                data.forEach(element => {
                    cartItems.push(element);
                });
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
                    itemData.customerDetails = user;
                    itemData.orderStatus = 0
                    itemData.timestamp = timestamp
                    FireStoreManager.checkoutProcess([itemData], (success) => {
                        console.log(" checkoutItems success : ", success);
                    });
                    updateOrderHistory();
                }
            });
    }

    function updateOrderHistory() {
        FireStoreManager.updateOrderHistory([itemData], userID, (success) => {
            setLoading(false);
            if (success) {
                AlertController.singleActionAlert(Locale.ENGLISH.SUCCESS, Locale.ENGLISH.ORDER_SUCCESS, (callback) => {
                    if (callback) {
                        navigation.navigate("History");
                    }
                });
            }
        });
    }

    return (
        <SafeAreaView style={HomeStyles.safeArea}>
            <Header
                isHomeScreen={false} />
            <View style={ProductStyles.container}>
                <View style={ProductStyles.itemImageStyle}>
                    <Image
                        source={require("../../../assets/icons/imagePlaceholder.png")}
                    />
                </View>
                <View style={{ padding: 20 }}>
                    <Text style={ProductStyles.itemNameTextStyle}>{itemData.productName}</Text>
                    <Text style={ProductStyles.itemDescTextStyle}>
                        {itemData.productDesc ? itemData.productDesc : Locale.ENGLISH.NO_DESCRIPTION}
                    </Text>
                    <Text style={[ProductStyles.itemDescTextStyle, { color: parseInt(itemData.productQuantity) == 0 ? "red" : "green" }]}>
                        {parseInt(itemData.productQuantity) != 0 ? Locale.ENGLISH.IN_STOCK + itemData.productQuantity : Locale.ENGLISH.OUT_OF_STOCK}
                    </Text>
                </View>
                {parseInt(itemData.productQuantity) != 0 && <View style={ProductStyles.priceBottomView}>
                    <Text style={ProductStyles.itemPriceTextStyle}>{Locale.ENGLISH.RUPEE_SIGN + itemData.productPrice}</Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                        <ThemeButton
                            extraStyle={{ alignSelf: "center", width: "45%" }}
                            buttonText={"Buy Now"}
                            onClick={() => { checkoutItems(); }}
                        />
                        <ThemeButton
                            extraStyle={{ alignSelf: "center", width: "45%" }}
                            buttonText={"Add To Cart"}
                            onClick={() => { addProductToCart(); }}
                        />
                    </View>
                </View>}
            </View>
            { isLoading && <Loader />}

        </SafeAreaView>
    );
}

export default ProductDetail;
