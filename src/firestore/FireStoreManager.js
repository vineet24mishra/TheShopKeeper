import firestore from "@react-native-firebase/firestore";
import Keys from "../utils/Keys";
import { getCurrentDateAndTime } from "../utils/TimeManger";
import ToastCollection from "../utils/Toast";

class FireStoreManager {
    isBooking = false;

    static isUserLogin(isFound) {
        this.isBooking = isFound;
    }

    static getUserSuccess() {
        return this.isBooking;
    }

    static registerRetailer = (registerReq, callback) => {
        firestore().collection(Keys.FIRESTORE_RETAILER_CREATION).add(registerReq).then(
            (response) => {
                if (response.id) {
                    registerReq.id = response.id;
                    callback(registerReq);
                }
            }
        ).
            catch((error) => {
                callback(error);
            });

    }

    static registerCustomer = (registerReq, callback) => {
        firestore().collection(Keys.FIRESTORE_CUSTOMER_CREATION).add(registerReq).then(
            (response) => {
                if (response.id) {
                    registerReq.id = response.id;
                    callback(registerReq);
                }
            }
        ).
            catch((error) => {
                console.log("error --->>>>", error);
                callback(error);
            });
    }

    static checkForUserLogin = (userType, phoneNumber, password, callback) => {
        console.log("userType: ", userType, "phoneNumber: ", phoneNumber);
        this.isUserLogin(false);
        firestore()
            .collection(userType)
            .get().then((data) => {
                console.log("infor gets success", data);
                for (var i = 0; i < data.docs.length; ++i) {
                    var subData = data.docs[i].data();
                    if (subData.number == phoneNumber && subData.password == password) {
                        this.isUserLogin(true);
                        subData.id = data.docs[i].ref.id;
                        callback(subData);
                    }
                }
                const isAvailable = this.getUserSuccess();
                console.log("isAvailable", isAvailable);
                if (!isAvailable) {
                    callback({});
                    ToastCollection.toastShowAtBottom("No user found or invalid credentials");
                }
            }).
            catch((error) => {
                console.log("error --->>>>", error);
                callback(error);
            });
    }

    static addRetailersProduct = (productInfo, callback) => {
        firestore().collection(Keys.FIRESTORE_PRODUCT_LIST_CREATION).add(productInfo).then(
            (response) => {
                if (response.id) {
                    callback(true);
                }
            }
        ).
            catch((error) => {
                console.log("error --->>>>", error);
                callback(error);
            });
    }

    static getAllProducts = (callback) => {
        firestore()
            .collection(Keys.FIRESTORE_PRODUCT_LIST_CREATION).orderBy("timeStamp", "desc")
            .onSnapshot((QuerySnapshot) => {
                const dataAlpha = [];
                console.log("realTimeUpdate : ", QuerySnapshot);
                QuerySnapshot._docs.forEach(items => {
                    const data = items.data();
                    data.productId = items.ref.id;
                    dataAlpha.push(items.data());
                });
                callback(dataAlpha);
            });
    }

    static getRetailersAllProducts = (userId, callback) => {
        firestore().collection(Keys.FIRESTORE_PRODUCT_LIST_CREATION).orderBy("timeStamp", "desc").onSnapshot((QuerySnapshot) => {
            console.log("data-->", QuerySnapshot);
            const dataAlpha = [];
            QuerySnapshot._docs.forEach(items => {
                if (items.data().retailerId == userId) {
                    const productList = items.data();
                    productList.id = items._ref._documentPath._parts[1];
                    dataAlpha.push(productList);
                }
            });
            callback(dataAlpha);
        });
    }

    static getCurrentRetailerOrders = (userId, callback) => {
        firestore().collection(Keys.FIRESTORE_ORDER_HISTORY).orderBy("timeStamp", "asc").onSnapshot((QuerySnapshot) => {
            const dataAlpha = [];
            QuerySnapshot._docs.forEach(items => {
                if (items.data().retailerId == userId) {
                    const productList = items.data();
                    console.log("getCurrentRetailerOrders-->", productList);
                    productList.id = items._ref._documentPath._parts[1];
                  
                    dataAlpha.push(productList);
                }
            });
            if (dataAlpha.length > 0) {
                callback(dataAlpha);
            } else {
                callback([])
            }
        });
    }


    static updateUserProfile = (userInfo, userType, callback) => {
        firestore().collection(userType).doc(userInfo.id).update({
            name: userInfo.name,
            address: userInfo.address
        }).then(() => {
            console.log("user updated successfully");
            callback(userInfo);
        }).catch((error) => {
            callback(error);
        });
    }

    static updateProductDetails = (productInfo, callback) => {
        firestore().collection(Keys.FIRESTORE_PRODUCT_LIST_CREATION).doc(productInfo.id)
            .update({
                productName: productInfo.productName,
                productPrice: productInfo.productPrice,
                productQuantity: productInfo.productQuantity,
                productDesc: productInfo.productDesc,
                retailerId: productInfo.retailerId
            }).then(() => {
                callback(productInfo);
            }).catch((error) => {
                callback(error);
            });
    }


    static updateOrderStatus = (productID, orderStatus) => {
        firestore().collection(Keys.FIRESTORE_ORDER_HISTORY).doc(productID)
            .update({
                orderStatus : orderStatus
            }).then(() => {
                callback(productInfo);
            }).catch((error) => {
                callback(error);
            });
    }

    static checkoutProcess = (productDetail, callback) => {
        productDetail.forEach(items => {
            console.log("items : ", items);
            firestore().collection(Keys.FIRESTORE_PRODUCT_LIST_CREATION).doc(items.productId).update({
                productQuantity: parseInt(items.productQuantity) - 1
            }).then(() => {
                console.log("order updated successFully");
                callback(true);
            }).catch((error) => {
                console.log("error --->>>>", error);
                callback(error);
            });
        });
    }

    static updateOrderHistory = (productDetail, userID, callback) => {
        productDetail.forEach(items => {
            items.purchasedAt = getCurrentDateAndTime();
            items.customerID = userID;
            firestore().collection(Keys.FIRESTORE_ORDER_HISTORY).add(items).then((response) => {
                if (response.id) {
                    callback(true);
                }
            }).catch((error) => {
                console.log("error --->>>>", error);
                callback(error);
            });
        });
    }

    static getOrderHistoryList = (userId, callback) => {
        firestore().collection(Keys.FIRESTORE_ORDER_HISTORY).get().then((data) => {
            const dataAlpha = [];
            data.docs.forEach(items => {
                if (items.data().customerID == userId) {
                    const productList = items.data();
                    dataAlpha.push(productList);
                }
            });
            callback(dataAlpha);
        }).catch((error) => {
            console.log("error --->>>>", error);
            callback(error);
        });
    }

}
export default FireStoreManager;
