import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import ProductScreen from "./src/Screens/ProductScreen";
import ProductDetailScreen from "./src/Screens/ProductDetailScreen";
import ShoppingCart from "./src/Screens/ShoppingCart";
import Navigation from "./src/navigation";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Navigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
