import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Pressable,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { productsSlice } from "../store/productsSlice";

const ProductScreen = ({ navigation }) => {
  const products = useSelector(({ products: { products } }) => products);
  const dispatch = useDispatch();
  return (
    <FlatList
      data={products}
      renderItem={({ item, index }) => (
        <Pressable
          style={styles.itemContainer}
          onPress={() => {
            dispatch(productsSlice.actions.setSelectedProduct(item.id));
            navigation.navigate("Product Detail");
          }}
        >
          <Image
            source={{
              uri: item.image,
            }}
            // aspect ration used to make same lenght and width
            style={styles.image}
          />
        </Pressable>
      )}
      numColumns={2}
    />
  );
};

const styles = StyleSheet.create({
  image: { width: "100%", aspectRatio: 1 },
  itemContainer: {
    width: "50%",
    padding: 1,
  },
});

export default ProductScreen;
