import { NavigationContainer } from "@react-navigation/native";
import ProductScreen from "./Screens/ProductScreen";
import ProductDetailsScreen from "./Screens/ProductDetailScreen";
import ShoppingCart from "./Screens/ShoppingCart";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, Text } from "react-native";
import { useSelector } from "react-redux";
import { selectNumberOfItems } from "./store/cartSlice";
import TrackOrder from "./Screens/TrackOrder";

const Navigation = () => {
  const numberOfItems = useSelector(selectNumberOfItems);
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ contentStyle: { backgroundColor: "white" } }}
      >
        <Stack.Screen
          name="Products"
          component={ProductScreen}
          options={({ navigation }) => ({
            headerRight: () => (
              <Pressable
                style={{ flexDirection: "row" }}
                onPress={() => navigation.navigate("Cart")}
              >
                <FontAwesome5 name="shopping-cart" size={18} color="gray" />
                <Text style={{ marginLeft: 5, fontWeight: "500" }}>
                  {numberOfItems}
                </Text>
              </Pressable>
            ),
            headerLeft: () => (
              <MaterialCommunityIcons
                onPress={() => navigation.navigate("TrackOrder")}
                name="truck-delivery"
                size={22}
                color={"gray"}
                style={{ marginRight: 5 }}
              />
            ),
          })}
        />
        <Stack.Screen
          name="Product Detail"
          component={ProductDetailsScreen}
          options={{ presentation: "modal" }}
        />
        <Stack.Screen name="Cart" component={ShoppingCart} />
        <Stack.Screen name="TrackOrder" component={TrackOrder} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
