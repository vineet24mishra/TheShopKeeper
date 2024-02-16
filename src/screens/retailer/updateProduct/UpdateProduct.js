import * as React from "react";
import { View, SafeAreaView } from "react-native";
import Input from "../../../components/TextInput";
import ThemeButton from "../../../components/ThemeButton";
import FireStoreManager from "../../../firestore/FireStoreManager";
import ToastCollection from "../../../utils/Toast";
import Locale from "../../../locale/Index";
import { Loader } from "../../../components/Loader";
import UpdateProductStyle from "./Style";
import RetailerHeader from "../../../components/RetailerHeader";

function UpdateProduct({ navigation, route }) {
  const [productInfo] = React.useState(route.params.productDetails);
  const [isLoading, setIsLoading] = React.useState(false);
  const [productName, setProductName] = React.useState(productInfo.productName);
  const [productPrice, setProductPrice] = React.useState(productInfo.productPrice);
  const [productQty, setProductQty] = React.useState(productInfo.productQuantity);
  const [productDescription, setProductDescription] = React.useState(productInfo.productDesc);

  function onPressUpdateProduct() {
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
    updateProduct();
  }

  function updateProduct() {
    productInfo.productName = productName;
    productInfo.productPrice = productPrice;
    productInfo.productQuantity = productQty;
    productInfo.productDesc = productDescription;

    FireStoreManager.updateProductDetails(productInfo, (success, error) => {
      setIsLoading(false);
      if (success) {
        // route.params.updateProductDetails(success);
        navigation.navigate("ProductDetail", {newAddedData: success});
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

  return (
    <SafeAreaView style={UpdateProductStyle.safeArea}>
      <RetailerHeader isHomeScreen={false} customLabel={Locale.ENGLISH.UPDATE_PRODUCT} />
      <View style={UpdateProductStyle.container}>
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

        <ThemeButton buttonText={Locale.ENGLISH.UPDATE_PRODUCT} 
         onClick={() => { onPressUpdateProduct(); }} />

      </View>
      { isLoading && <Loader />}
    </SafeAreaView>
  );
}

export default UpdateProduct;
