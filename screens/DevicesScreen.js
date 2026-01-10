import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { auth, db } from "../firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { useDevices } from "../context/DevicesContext";
import DeviceCard from "../components/DeviceCard";
import Loader from "../components/Loader";

export default function DevicesScreen() {
  const { devices, loadingDevices } = useDevices();

  // 🔥 DOC ID ile SİLME (EN DOĞRU YÖNTEM)
  const deleteDevice = async (docId) => {
    if (!auth.currentUser) return;

    try {
      await deleteDoc(
        doc(
          db,
          "users",
          auth.currentUser.uid,
          "devices",
          docId
        )
      );
    } catch (e) {
      console.log("Delete device error:", e);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* HEADER */}
        <View style={styles.headerCard}>
          <Ionicons
            name="trash-bin-outline"
            size={36}
            color="#2e7d32"
          />
          <Text style={styles.title}>My Bins</Text>
          <Text style={styles.subtitle}>
            Monitor the fill levels of your smart trash bins.
          </Text>
        </View>

        {/* LOADING */}
        {loadingDevices ? (
          <Loader />
        ) : devices.length === 0 ? (
          <View style={styles.emptyBox}>
            <Ionicons
              name="cube-outline"
              size={42}
              color="#9ca3af"
            />
            <Text style={styles.emptyText}>
              You have not added any bins yet.
            </Text>
          </View>
        ) : (
          devices.map((d) => (
            <View key={d.id} style={styles.cardWrapper}>
              <DeviceCard
                deviceId={d.deviceId}
                customName={d.customName}
                distanceCm={d.distanceCm}
              />

              <TouchableOpacity
                style={styles.deleteBtn}
                onPress={() => deleteDevice(d.id)}
              >
                <Ionicons
                  name="trash-outline"
                  size={18}
                  color="white"
                />
                <Text style={styles.deleteText}>
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f9fafb" },
  container: { padding: 20, gap: 20 },

  headerCard: {
    backgroundColor: "white",
    borderRadius: 18,
    padding: 24,
    alignItems: "center",
    gap: 8,
    elevation: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1f2937",
  },
  subtitle: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
  },

  cardWrapper: {
    backgroundColor: "white",
    borderRadius: 18,
    padding: 12,
    elevation: 3,
  },

  deleteBtn: {
    backgroundColor: "#dc2626",
    padding: 12,
    borderRadius: 14,
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  deleteText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },

  emptyBox: {
    alignItems: "center",
    marginTop: 40,
    gap: 10,
  },
  emptyText: {
    color: "#6b7280",
    fontSize: 15,
  },
});
