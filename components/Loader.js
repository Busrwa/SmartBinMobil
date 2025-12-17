import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

export default function Loader() {
  return (
    <View style={styles.container}>
      <LottieView
        source={require("../assets/loader.json")}
        autoPlay
        loop
        style={{ width: 150, height: 150 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.9)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 99,
  },
});
