import {
  Text,
  View,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useGetOrderQuery } from "../store/apiSlice";
import { useState } from "react";

const TrackOrder = () => {
  const { data, isLoading, error } = useGetOrderQuery(ref);

  const [ref, setRef] = useState("");

  return (
    <ScrollView style={styles.root}>
      <TextInput
        style={styles.input}
        value={ref}
        onChangeText={(val) => setRef(val)}
        placeholder="Enter Order Id"
      />
      {isLoading && <ActivityIndicator />}
      {data?.status !== "OK" && <Text>Order not found</Text>}
      {data?.status === "OK" && (
        <Text>{JSON.stringify(data.data, null, 2)}</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    padding: 10,
  },
  input: {
    borderColor: "lightgrey",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
});
export default TrackOrder;
