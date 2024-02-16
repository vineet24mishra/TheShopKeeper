import * as React from "react";
import { Image, SafeAreaView, Text, View } from "react-native";
import Header from "../../../components/Header";
import Locale from "../../../locale/Index";
import ProductStyles from "./Styles";
import ThemeButton from "../../../components/ThemeButton";

function ProductDetail({ route, navigation }) {
    const [productInfo, setProductInfo] = React.useState(route.params && route.params.data);
    
    React.useEffect(() => {
        if(route.params?.newAddedData){
            setProductInfo(route.params?.newAddedData);
            navigation.setParams({newAddedData: undefined});
        }
      }, [route.params?.newAddedData]);


    return (
        <SafeAreaView style={ProductStyles.safeArea}>
            <Header
                isHomeScreen={false} />
            <View style={ProductStyles.container}>
                <View style={ProductStyles.itemImageStyle}>
                    <Image
                        source={require("../../../assets/icons/imagePlaceholder.png")}
                    />
                </View>
                <View style={{ padding: 20 }}>
                    <Text style={ProductStyles.itemNameTextStyle}>{productInfo && productInfo.productName}</Text>
                    <Text style={ProductStyles.itemNameTextStyle}>{productInfo && productInfo.productPrice && Locale.ENGLISH.RUPEE_SIGN + productInfo.productPrice}</Text>
                    {<Text style={ProductStyles.itemDescTextStyle}>{productInfo && productInfo.productDesc && productInfo.productDesc}</Text>}
                    <Text style={[ProductStyles.itemDescTextStyle, { color:  parseInt(productInfo.productQuantity) == 0 ? "red" : "green" }]}>{productInfo && parseInt(productInfo.productQuantity) == 0 ? "Out of stcok"  : productInfo && Locale.ENGLISH.IN_STOCK + productInfo.productQuantity}</Text>
                </View>
            <View style = {ProductStyles.buttonParentViewStyle}>
            <ThemeButton 
             buttonText = {Locale.ENGLISH.BUTTON_UPDATE_TITLE}
             onClick={() => {
                navigation.navigate("UpdateProduct", {productDetails : productInfo});
              }}/>

            </View>
            </View>
        </SafeAreaView>
    );
}

export default ProductDetail;
