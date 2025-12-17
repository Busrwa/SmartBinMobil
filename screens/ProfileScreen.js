import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
} from "react-native";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import PrivacyScreen from "./PrivacyScreen";
import TermsScreen from "./TermsScreen";
import KvkkScreen from "./KvkkScreen";

import { avatars } from "../constants/avatars";
import { useUser } from "../context/UserContext";

export default function ProfileScreen() {
  const [page, setPage] = useState("profile");
  const [modalVisible, setModalVisible] = useState(false);

  const { avatar, setAvatar } = useUser();
  const user = auth.currentUser;

  /* -------- SAVE AVATAR -------- */
  const selectAvatar = async (key) => {
    setAvatar(key);
    setModalVisible(false);

    await updateDoc(doc(db, "users", user.uid), {
      avatar: key,
    });
  };

  if (page === "privacy")
    return <PrivacyScreen goBack={() => setPage("profile")} />;

  if (page === "terms")
    return <TermsScreen goBack={() => setPage("profile")} />;

  if (page === "kvkk")
    return <KvkkScreen goBack={() => setPage("profile")} />;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>

        {/* HEADER */}
        <View style={styles.headerCard}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Image source={avatars[avatar]} style={styles.avatar} />
            <Ionicons
              name="camera"
              size={22}
              color="white"
              style={styles.cameraIcon}
            />
          </TouchableOpacity>

          <Text style={styles.hello}>
            Hello, {user?.displayName || "User"} 👋
          </Text>

          <Text style={styles.email}>{user?.email}</Text>
        </View>

        {/* MENU */}
        <View style={styles.menuCard}>
          <MenuButton
            icon="shield-checkmark-outline"
            label="Privacy Policy"
            onPress={() => setPage("privacy")}
          />
          <MenuButton
            icon="document-text-outline"
            label="Terms of Service"
            onPress={() => setPage("terms")}
          />
          <MenuButton
            icon="information-circle-outline"
            label="Data Protection (KVKK)"
            onPress={() => setPage("kvkk")}
          />
        </View>

        {/* LOGOUT */}
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => signOut(auth)}
        >
          <Ionicons name="log-out-outline" size={20} color="white" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        {/* AVATAR MODAL */}
        <Modal visible={modalVisible} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalBox}>
              <Text style={styles.modalTitle}>Choose Avatar</Text>

              <View style={styles.avatarGrid}>
                {Object.keys(avatars).map((key) => (
                  <TouchableOpacity
                    key={key}
                    onPress={() => selectAvatar(key)}
                  >
                    <Image
                      source={avatars[key]}
                      style={[
                        styles.avatarOption,
                        avatar === key && styles.selected,
                      ]}
                    />
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.closeBtn}
              >
                <Text style={{ color: "white" }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

      </View>
    </SafeAreaView>
  );
}

/* ---------- MENU BUTTON ---------- */
function MenuButton({ icon, label, onPress }) {
  return (
    <TouchableOpacity style={styles.menuBtn} onPress={onPress}>
      <Ionicons name={icon} size={22} color="#2e7d32" />
      <Text style={styles.menuText}>{label}</Text>
      <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
    </TouchableOpacity>
  );
}

/* ---------- STYLES ---------- */
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
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#2e7d32",
    borderRadius: 12,
    padding: 4,
  },
  hello: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1f2937",
  },
  email: { fontSize: 14, color: "#6b7280" },

  menuCard: {
    backgroundColor: "white",
    borderRadius: 18,
    paddingVertical: 8,
    elevation: 3,
  },
  menuBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
    gap: 14,
  },
  menuText: {
    flex: 1,
    fontSize: 15,
    fontWeight: "500",
    color: "#1f2937",
  },

  logoutBtn: {
    backgroundColor: "#dc2626",
    padding: 16,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  logoutText: { color: "white", fontSize: 16, fontWeight: "600" },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 16,
    width: "85%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 16,
    textAlign: "center",
  },
  avatarGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  avatarOption: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  selected: {
    borderWidth: 3,
    borderColor: "#2e7d32",
  },
  closeBtn: {
    backgroundColor: "#6b7280",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
  },
});
