import * as React from "react";
import { View, SafeAreaView } from "react-native";
import Input from "../../../components/TextInput";
import ThemeButton from "../../../components/ThemeButton";
import FireStoreManager from "../../../firestore/FireStoreManager";
import ToastCollection from "../../../utils/Toast";
import Locale from "../../../locale/Index";
import UserManager from "../../../store/UserManager";
import { Loader } from "../../../components/Loader";
import AddProductStyle from "./Style";
import RetailerHeader from "../../../components/RetailerHeader";
// import RNUpiPayment from 'react-native-upi-pay';


function AddProduct() {

  const [isLoading, setIsLoading] = React.useState(false);
  const [productName, setProductName] = React.useState("");
  const [productPrice, setProductPrice] = React.useState("");
  const [productQty, setProductQty] = React.useState("");
  const [productDescription, setProductDescription] = React.useState("");
  const [user, setUserId] = React.useState(UserManager.instance.retrieveUserType().then((user) => {
    setUserId(user);
  }));

  function onPressAddProduct() {
    if (!productName) {
      ToastCollection.toastShowAtBottom(Locale.ENGLISH.TOAST_ENTER_PRODUCT_NAME);
      return;
    }
    if (!productPrice) {
      ToastCollection.toastShowAtBottom(Locale.ENGLISH.TOAST_ENTER_PRODUCT_PRICE);
      return;
    }
    if (!productQty) {
      ToastCollection.toastShowAtBottom(Locale.ENGLISH.TOAST_ENTER_PRODUCT_QUANTITY);
      return;
    }
    setIsLoading(true);
    AddProduct();
  }

  function AddProduct() {
    const currentDate = new Date();
    const timestamp = currentDate.getTime();
    const productDetails = {
      "productName": productName,
      "productPrice": productPrice,
      "productQuantity": productQty,
      "productDesc": productDescription,
      "retailerId": user.id,
      "timeStamp": timestamp,
      "storeName" : user.storeName
    };


    FireStoreManager.addRetailersProduct(productDetails, (success, error) => {
      setIsLoading(false);
      if (success) {
        ToastCollection.toastShowAtBottom(Locale.ENGLISH.TOAST_PRODUCT_ADDED);
        ClearText();
      }
      if (error) {
        ToastCollection.toastShowAtBottom(Locale.ENGLISH.TOAST_SOMETHING_WENT_WRONG);
      }
    });
  }

  function ClearText() {
    setProductName("");
    setProductPrice("");
    setProductQty("");
    setProductDescription("");
  }

  function openUPI() {
    // RNUpiPayment.initializePayment({
    //   vpa: '8770412807@axl',  		//your upi address like 12345464896@okhdfcbank
    //   payeeName: ' abc',   			// payee name 
    //   amount: '1',				//amount
    //   transactionRef: 'aasf-332-aoei-fn'	//some refs to aknowledge the transaction
    // }, () => { console.log("sucess"); }, () => { console.log("failure"); });
  }

  return (
    <SafeAreaView style={AddProductStyle.safeArea}>
      <RetailerHeader isHomeScreen={true} customLabel={"Add Product"} />
      <View style={AddProductStyle.container}>
        <Input
          secureTextEntry={false}
          placeholder={Locale.ENGLISH.INPUT_PRODUCT_NAME}
          onChangeText={productName => setProductName(productName)}
          value={productName}
        />
        <Input
          softKeyBoardType={"number-pad"}
          secureTextEntry={false}
          placeholder={Locale.ENGLISH.INPUT_PRODUCT_PRICE}
          onChangeText={productPrice => setProductPrice(productPrice)}
          value={productPrice}
        />
        <Input
          softKeyBoardType={"number-pad"}
          secureTextEntry={false}
          placeholder={Locale.ENGLISH.INPUT_PRODUCT_Quantity}
          onChangeText={productQty => setProductQty(productQty)}
          value={productQty}
        />
        <Input
          extraStyle={{ minHeight: 100 }}
          secureTextEntry={false}
          placeholder={Locale.ENGLISH.INPUT_PRODUCT_DESCRIPTION}
          onChangeText={productDescription => setProductDescription(productDescription)}
          value={productDescription}
        />

        <ThemeButton buttonText={Locale.ENGLISH.BUTTON_ADD_PRODUCT} onClick={() => {
          onPressAddProduct();
        }} />

      </View>
      { isLoading && <Loader />}
    </SafeAreaView>
  );
}

export default AddProduct;
