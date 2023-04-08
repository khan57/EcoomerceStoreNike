import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import products from "../data/products";
const ProductScreen = () => {
  return (
    <FlatList
      data={products}
      renderItem={({ item, index }) => (
        <View style={styles.itemContainer}>
          <Image
            source={{
              uri: item.image,
            }}
            // aspect ration used to make same lenght and width
            style={styles.image}
          />
        </View>
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
