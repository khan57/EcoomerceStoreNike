import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import ProductScreen from "./src/Screens/ProductScreen";
import ProductDetailScreen from "./src/Screens/ProductDetailScreen";
import ShoppingCart from "./src/Screens/ShoppingCart";
import Navigation from "./src/navigation";
import { Provider } from "react-redux";
import { store } from "./src/store";
export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Navigation />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
