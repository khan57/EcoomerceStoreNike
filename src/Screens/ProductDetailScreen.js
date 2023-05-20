import {
  StyleSheet,
  View,
  Image,
  FlatList,
  useWindowDimensions,
  Text,
  ScrollView,
  Pressable,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { cartSlice } from "../store/cartSlice";
import { useGetProductQuery } from "../store/apiSlice";

const ProductDetailsScreen = ({ route }) => {
  const id = route.params.id;
  const { data, error, isLoading } = useGetProductQuery(id);
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(cartSlice.actions.addCartItem({ product }));
    // Alert.alert("Add to cart", "New Product added to cart");
    ToastAndroid.show("Product added to cart", ToastAndroid.SHORT);
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    console.error(error.error);
    return <Text>Error in fetching products</Text>;
  }

  const product = data.data;
  if (!product) {
    return null;
  }

  return (
    <View>
      <ScrollView>
        {/* Image Carousel */}
        <FlatList
          data={product.images}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={{ width, aspectRatio: 1 }} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
        />
        <View style={{ padding: 20 }}>
          {/* Title */}

          <Text style={styles.title}>{product.name}</Text>

          {/* Price */}
          <Text style={styles.price}>$ {product.price}</Text>

          {/* Description */}

          <Text style={styles.description}>{product.description}</Text>
        </View>
      </ScrollView>
      {/* Add to cart button */}
      <Pressable style={styles.button} onPress={addToCart}>
        <Text style={styles.buttonText}>Add to Cart</Text>
      </Pressable>
      {/* Navigation icon */}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 34,
    fontWeight: "500",
    marginVertical: 10,
  },
  price: {
    fontWeight: "500",
    fontSize: 16,
    letterSpacing: 1.5,
  },
  description: {
    marginVertical: 10,
    fontSize: 18,
    lineHeight: 30,
    fontWeight: "300",
  },
  button: {
    position: "absolute",
    backgroundColor: "black",
    bottom: 30,
    width: "90%",
    alignSelf: "center",
    padding: 20,
    borderRadius: 100,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "500",
    fontSize: 16,
  },
});

export default ProductDetailsScreen;
