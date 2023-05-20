import {
  StyleSheet,
  Image,
  FlatList,
  Pressable,
  ActivityIndicator,
  Text,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { productsSlice } from "../store/productsSlice";
import { useGetProductsQuery } from "../store/apiSlice";

const ProductScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useGetProductsQuery();
  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    console.error(error.error);
    return <Text>Error in fetching products</Text>;
  }

  const products = data.data;

  return (
    <FlatList
      data={products}
      renderItem={({ item, index }) => (
        <Pressable
          style={styles.itemContainer}
          onPress={() => {
            // dispatch(productsSlice.actions.setSelectedProduct(item._id));
            navigation.navigate("Product Detail", { id: item._id });
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
