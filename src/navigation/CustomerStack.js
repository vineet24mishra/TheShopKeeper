import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/customer/home/Home";
import UserProfile from "../screens/customer/profile/UserProfile";
import CartScreen from "../screens/customer/cart/CartScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { TabIcon } from "../components/bottomtabs/TabIcon";
import History from "../screens/customer/history/History";
import ProductDetail from "../screens/customer/productDetail/ProductDetail";
import EditProfile from "../screens/customer/editProfile/EditProfile";

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
      <Tab.Screen name="History" component={History}
        options={
          {
            tabBarIcon: (focused) => (
              <TabIcon
                focused={focused}
                image={
                  require("../assets/icons/history.png")
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

export default function CustomerTabStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Home" component={onTabNavigation} />
      <Stack.Screen name="CartScreen" component={CartScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
      <Stack.Screen name="EditProfile" component={EditProfile} />

    </Stack.Navigator>
  );
}
