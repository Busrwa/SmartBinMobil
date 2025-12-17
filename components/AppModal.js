import { Modal, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function AppModal({
  visible,
  title,
  message,
  onClose,
  type = "info",
}) {
  const colors = {
    success: "#2e7d32",
    error: "#dc2626",
    info: "#2e7d32",
  };

  const icons = {
    success: "checkmark-circle",
    error: "close-circle",
    info: "information-circle",
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.box}>

          {/* ICON – SADECE YENİ KULLANIMDA */}
          {type && (
            <Ionicons
              name={icons[type]}
              size={42}
              color={colors[type]}
              style={{ marginBottom: 10 }}
            />
          )}

          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors[type] }]}
            onPress={onClose}
          >
            <Text style={{ color: "white", fontWeight: "600" }}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = {
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 18,
    padding: 24,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  message: {
    fontSize: 15,
    marginBottom: 20,
    textAlign: "center",
    lineHeight: 22,
  },
  button: {
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    width: "100%",
  },
};
