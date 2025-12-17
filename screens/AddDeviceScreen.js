import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import AppModal from "../components/AppModal";

export default function AddDeviceScreen() {
  const [deviceId, setDeviceId] = useState("");
  const [customName, setCustomName] = useState("");
  const [loading, setLoading] = useState(false);

  const [modal, setModal] = useState({
    visible: false,
    title: "",
    message: "",
    type: "info",
  });

  const showModal = (type, title, message) => {
    setModal({
      visible: true,
      type,
      title,
      message,
    });
  };

  const saveDevice = async () => {
    if (deviceId.length !== 10) {
      return showModal(
        "error",
        "Invalid Bin ID",
        "The Bin ID must be exactly 10 digits."
      );
    }

    try {
      setLoading(true);

      const binRef = doc(db, "bin", deviceId);
      const binSnap = await getDoc(binRef);

      if (!binSnap.exists()) {
        setLoading(false);
        return showModal(
          "error",
          "Bin Not Found",
          "No bin exists with this ID. Please check and try again."
        );
      }

      await setDoc(
        doc(db, "users", auth.currentUser.uid, "devices", deviceId),
        {
          deviceId,
          customName,
          addedAt: new Date(),
        }
      );

      setDeviceId("");
      setCustomName("");

      showModal(
        "success",
        "Bin Added Successfully",
        "Your smart bin has been added to your account."
      );
    } catch (err) {
      showModal(
        "error",
        "Unexpected Error",
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>

          {/* HEADER CARD */}
          <View style={styles.headerCard}>
            <Ionicons name="trash-outline" size={42} color="#2e7d32" />
            <Text style={styles.title}>Add New Bin</Text>
            <Text style={styles.subtitle}>
              Register your smart trash bin to start monitoring it.
            </Text>
          </View>

          {/* FORM CARD */}
          <View style={styles.formCard}>
            <Text style={styles.label}>Bin ID</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter 10-digit Bin ID"
              keyboardType="numeric"
              maxLength={10}
              value={deviceId}
              onChangeText={setDeviceId}
            />

            <Text style={styles.label}>Custom Name (optional)</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Kitchen Bin"
              value={customName}
              onChangeText={setCustomName}
            />

            <TouchableOpacity
              style={[styles.button, loading && { opacity: 0.7 }]}
              onPress={saveDevice}
              disabled={loading}
            >
              <Ionicons name="add-circle-outline" size={20} color="white" />
              <Text style={styles.buttonText}>
                {loading ? "Adding..." : "Add Bin"}
              </Text>
            </TouchableOpacity>
          </View>

        </View>
      </KeyboardAvoidingView>

      {/* MODAL */}
      <AppModal
        visible={modal.visible}
        title={modal.title}
        message={modal.message}
        type={modal.type}
        onClose={() => setModal({ ...modal, visible: false })}
      />
    </SafeAreaView>
  );
}

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  container: {
    padding: 20,
    gap: 20,
  },

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

  formCard: {
    backgroundColor: "white",
    borderRadius: 18,
    padding: 20,
    gap: 12,
    elevation: 3,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
  },

  button: {
    backgroundColor: "#2e7d32",
    padding: 16,
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
