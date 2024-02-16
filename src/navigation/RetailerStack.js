import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/retailer/home/Home";
import AddProduct from "../screens/retailer/addProduct/AddProduct";
import { createStackNavigator } from "@react-navigation/stack";
import { TabIcon } from "../components/bottomtabs/TabIcon";
import UserProfile from "../screens/retailer/profile/UserProfile";
import ProductDetail from "../screens/retailer/productDetail/ProductDetail";
import EditProfile from "../screens/retailer/editProfile/EditProfile";
import UpdateProduct from "../screens/retailer/updateProduct/UpdateProduct";
import OrderList from '../screens/retailer/orderList/OrderList';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function onTabNavigation() {
  return (
    <Tab.Navigator headerMode={"none"} initialRouteName={"Home"}
      tabBarOptions={{ showLabel: false }}>
      <Tab.Screen name="Home" component={Home}
        options={
          {
            tabBarIcon: (focused) => (
              <TabIcon
                focused={focused}
                image={
                  require("../assets/icons/home.png")
                }
              />
            )
          }
        } />
      <Tab.Screen name="AddProduct" component={AddProduct}
        options={
          {
            tabBarIcon: (focused) => (
              <TabIcon
                focused={focused}
                image={
                  require("../assets/icons/bag.png")
                }
              />
            )
          }
        } />
        <Tab.Screen name="OrderList" component={OrderList}
        options={
          {
            tabBarIcon: (focused) => (
              <TabIcon
                focused={focused}
                image={
                  require("../assets/icons/bag.png")
                }
              />
            )
          }
        } />
      <Tab.Screen name="UserProfile" component={UserProfile}
        options={
          {
            tabBarIcon: (focused) => (
              <TabIcon
                focused={focused}
                image={
                  require("../assets/icons/account.png")
                }
              />
            )
          }
        } />
    </Tab.Navigator>);

}

export default function RetailerTabStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Home" component={onTabNavigation} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="UpdateProduct" component={UpdateProduct} />
    </Stack.Navigator>
  );
}
