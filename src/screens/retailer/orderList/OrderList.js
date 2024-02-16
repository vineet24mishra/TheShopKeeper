import { useNavigation } from "@react-navigation/core";
import * as React from "react";
import { FlatList, Image, SafeAreaView, Text, View } from "react-native";
import { EmptyPlaceholder } from "../../../components/EmptyPlaceholder";
import Header from "../../../components/Header";
import { Loader } from "../../../components/Loader";
import RetailerHeader from "../../../components/RetailerHeader";
import ThemeButton from "../../../components/ThemeButton";
import FireStoreManager from "../../../firestore/FireStoreManager";
import Locale from "../../../locale/Index";
import CartManager from "../../../store/CartManager";
import UserModelStore from "../../../store/UserManager";
import TextSize from "../../../styles/TextSize";
import colors from "../../../utils/Colors";
import ToastCollection from "../../../utils/Toast";
import CartStyles from "../../customer/cart/Styles";
import HistoryStyle from "../../customer/history/Styles";
import HomeStyles from "../../customer/home/Styles";

function OrderList() {
    const navigation = useNavigation();
    const [itemList, setOrderHistory] = React.useState([]);
    const [itemCount, setItemCount] = React.useState(0);
    const [userID, setUserId] = React.useState("");
    const [isLoading, setLoading] = React.useState(false);


    React.useEffect(() => {
        getUsersDetails()

    }, []);

    React.useEffect(() => {
        const unsubscribe = navigation.addListener("tabPress", () => {
            getUsersDetails()
        });
        return unsubscribe;
    }, [navigation]);


    function getUsersDetails() {
        UserModelStore.instance.retrieveUserType().then((userInfo) => {
            if (userInfo) {
                setUserId(userInfo.id)
                getAllOrders(userInfo.id)
            }
        });
    }

    function getAllOrders(id) {
        setLoading(true)
        FireStoreManager.getCurrentRetailerOrders(id, (success, error) => {
            setLoading(false)
            if (success) {
                console.log("getCurrentRetailerOrders response", success);
                setOrderHistory(success)
            }
        })
    }


    function acceptOrder(productID, orderStatus) {
        FireStoreManager.updateOrderStatus(productID, orderStatus, (sucess, error) => {
           if(sucess) {
            getAllOrders(userID)
            if(orderStatus == 1) {
                ToastCollection.toastShowAtBottom("Order Accepted Successfully.")
            } else {
                ToastCollection.toastShowAtBottom("Order declined by you.")
            }
           }
        })
    }


    function renderItem({ item }) {
        console.log("item--->>>", item);
        const orderStatusColor = item.orderStatus == 0 ? "green" : item.orderStatus == 1 ? "green" : item.orderStatus == 3 ? colors.THEMECOLOR : "red";
        const orderStatusText = item.orderStatus == 0 ? "Pending" : item.orderStatus == 1 ? "Accepted" : item.orderStatus == 3 ? "Delivered" : "Declined by you";
        return (
            <View style={{ backgroundColor: colors.LIGHT_GRAY, width: "90%", alignSelf: "center", borderRadius: 10, marginTop: 10 }}>
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
                    <Text style={{ position: "absolute", bottom: 20, right: 0, color: colors.GRAY_COLOR }}>{item.purchasedAt}</Text>
                    <Text style={{ position: "absolute", top: 5, right: 0, color: orderStatusColor }}>{orderStatusText}</Text>

                </View>
                <View style={{ height: 0.2, width: "90%", backgroundColor: "black", alignSelf: "center" }}></View>
                <View style={{ padding: 20 }}>
                    <Text style={HomeStyles.itemTextStyle}>Customer Details</Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
                        <Text style={HomeStyles.itemTextStyle}>Name : </Text>
                        <Text style={HomeStyles.itemTextStyle}>{item.customerDetails && item.customerDetails.name}</Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 5 }}>
                        <Text style={HomeStyles.itemTextStyle}>Mobile Number : </Text>
                        <Text style={HomeStyles.itemTextStyle}>{item.customerDetails && item.customerDetails.number}</Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 5 }}>
                        <Text style={HomeStyles.itemTextStyle}>Delivery Address : </Text>
                        <Text style={HomeStyles.itemTextStyle}>{item.customerDetails && item.customerDetails.address}</Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 5 }}>
                        <Text style={HomeStyles.itemTextStyle}>Payment : </Text>
                        <Text style={HomeStyles.itemTextStyle}>{"COD"}</Text>
                    </View>
                </View>
                {item.orderStatus !== 3 && item.orderStatus !== 2 && <View>
                    {item.orderStatus == 0 ? <View style={{ flexDirection: "row", alignSelf: "center" }}>
                        <ThemeButton
                            extraStyle={{ width: "42%", backgroundColor: "green" }}
                            buttonText={"Accept"}
                            onClick={() => { acceptOrder(item.id, 1) }}
                        />
                        <ThemeButton
                            extraStyle={{ width: "42%", backgroundColor: "red" }}
                            buttonText={"Decline"}
                            onClick={() => { acceptOrder(item.id, 2) }}
                        />
                    </View> : <ThemeButton
                            extraStyle={{ width: "90%", alignSelf: "center" }}
                            buttonText={"Deliver"}
                            onClick={() => { acceptOrder(item.id, 3) }}
                        />}
                </View>}


            </View>

        );
    }

    return (
        <SafeAreaView style={HistoryStyle.safeArea}>
            <RetailerHeader isHomeScreen={true} customLabel={"Orders List"} />
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

export default OrderList;
