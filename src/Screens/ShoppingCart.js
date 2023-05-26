import {
  FlatList,
  Text,
  View,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  Alert,
} from "react-native";
import CartListItem from "../Components/CartListItem";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDeliveryPrice,
  selectSubTotal,
  selectTotal,
  cartSlice,
} from "../store/cartSlice";
import { useCreateOrderMutation } from "../store/apiSlice";

const ShoppingCart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const subTotal = useSelector(selectSubTotal);
  const deliveryFee = useSelector(selectDeliveryPrice);
  const total = useSelector(selectTotal);

  const [createOrder, { data, error, isLoading }] = useCreateOrderMutation();

  const dispatch = useDispatch();
  const oncreateOrder = async () => {
    const result = await createOrder({
      items: cartItems,
      subTotal,
      total,
      deliveryFee,
      total,
      customer: {
        name: "haseeb",
        address: "my home address",
        email: "haseeb.rehman@yahoo.com",
      },
    });

    if (result.data?.status === "OK") {
      Alert.alert(
        `Order has been submitted','Your order reference is :${result.data.data.ref}`
      );
    }

    dispatch(cartSlice.actions.clear());
  };
  return (
    <>
      <FlatList
        data={cartItems}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        ListFooterComponent={() => (
          <View style={styles.totalsContainer}>
            <View style={styles.row}>
              <Text style={styles.text}>SubTotal</Text>
              <Text style={styles.text}>{subTotal} US$</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.text}>Delivery</Text>
              <Text style={styles.text}>{deliveryFee} US$</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.textBold}>Total</Text>
              <Text style={styles.textBold}>{total} US$</Text>
            </View>
          </View>
        )}
      />

      <Pressable style={styles.button} onPress={oncreateOrder}>
        <Text style={styles.buttonText}>
          Checkout
          {isLoading && <ActivityIndicator size={"small"} />}
        </Text>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  totalsContainer: {
    margin: 20,
    borderColor: "gainsboro",
    borderTopWidth: 1,
    paddingTop: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 2,
  },
  text: {
    color: "grey",
    fontSize: 16,
  },
  textBold: {
    fontSize: 16,
    fontWeight: "500",
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

export default ShoppingCart;
