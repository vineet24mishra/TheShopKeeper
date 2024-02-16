import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/common/login/Login";
import Register from "../screens/common/register/Register";
import { AuthContext } from "../context/Context";
import Keys from "../utils/Keys";
import UserManager from "../store/UserManager";
import CustomerStack from "../navigation/CustomerStack";
import RetailerStack from "../navigation/RetailerStack";

const Stack = createStackNavigator();

export default function Root() {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case Keys.RESTORE_USER_ID_KEY:
          return {
            ...prevState,
            userId: action.userDetails.id,
            isLoading: false,
            userType: action.userDetails.userType
          };
        case Keys.SIGN_IN_KEY:
          return {
            ...prevState,
            isSignout: false,
            isLoading: false,
            userId: action.userDetails.id,
            userType: action.userDetails.userType
          };
        case Keys.SIGN_OUT_KEY:
          return {
            ...prevState,
            isSignout: true,
            userId: null,
            userType: null
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userId: null,
      userType: null
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    let userInfo;
    const bootstrapAsync = async() => {
      try {
        UserManager.instance.retrieveUserType().then((user) => {
          userInfo = user;
        }); 
      }
      catch (e) {
        // Restoring token failed
      }
      setTimeout(() => {
        dispatch({ type: Keys.RESTORE_USER_ID_KEY, userDetails: { id: userInfo && userInfo.id, userType: userInfo && userInfo.userType } });
      }, 2000);
    };
    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: userDetails => dispatch({ type: Keys.SIGN_IN_KEY, userDetails }),
      signOut: () => dispatch({ type: Keys.SIGN_OUT_KEY }),
      signUp: userDetails => dispatch({ type: Keys.SIGN_IN_KEY, userDetails })
    }), []);
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="OnBoardingStack" headerMode="none">
          {
        state.isLoading ? (
          <Stack.Screen name="RootLoadingNavigation" component={RootLoadingNavigation} />
        )
          : !state.userId ? (
            <Stack.Screen name="OnBoardingStack" component={OnBoardingStack} />
          ) : state.userType == Keys.USER_TYPE_CUSTOMER ? (
            <Stack.Screen name="CustomerStack" component={CustomerStack} />
          ) : (
            <Stack.Screen name="RetailerStack" component={RetailerStack} />
          )
      }

        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

function RootLoadingNavigation() {

  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          backgroundColor: "white"
        }}>
        <Text style={{ fontSize: 24 }}>TheShopKeeper</Text>
      </View>
    </>
  );
}

function OnBoardingStack() {
  return (
    <Stack.Navigator headerMode={"none"} initialRouteName={"Login"}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
}
