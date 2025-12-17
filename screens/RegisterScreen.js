import { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import Loader from "../components/Loader";
import AppModal from "../components/AppModal";

export default function RegisterScreen({ goLogin }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({ visible: false });

  const register = async () => {
    if (!username || !email || !password || !confirm) {
      return setModal({
        visible: true,
        title: "Missing Information",
        message: "Please fill in all fields.",
      });
    }

    if (password !== confirm) {
      return setModal({
        visible: true,
        title: "Password Mismatch",
        message: "Passwords do not match.",
      });
    }

    try {
      setLoading(true);
      const res = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(res.user, {
        displayName: username,
      });

      await setDoc(doc(db, "users", res.user.uid), {
        username,
        email,
        createdAt: new Date(),
      });
    } catch (e) {
      setModal({
        visible: true,
        title: "Registration Failed",
        message: e.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f9fafb" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.wrapper}
            keyboardShouldPersistTaps="handled"
          >
            {/* LOGO */}
            <Image
              source={require("../assets/logo.png")}
              style={styles.logo}
            />

            {/* CARD */}
            <View style={styles.card}>
              <Text style={styles.title}>Create Account ✨</Text>
              <Text style={styles.subtitle}>
                Join us and manage your smart bins easily
              </Text>

              <TextInput
                placeholder="Username"
                style={styles.input}
                value={username}
                onChangeText={setUsername}
              />

              <TextInput
                placeholder="Email"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />

              <TextInput
                placeholder="Password"
                secureTextEntry
                style={styles.input}
                value={password}
                onChangeText={setPassword}
              />

              <TextInput
                placeholder="Confirm Password"
                secureTextEntry
                style={styles.input}
                value={confirm}
                onChangeText={setConfirm}
              />

              <TouchableOpacity
                style={[
                  styles.registerBtn,
                  loading && { opacity: 0.7 },
                ]}
                onPress={register}
                disabled={loading}
              >
                <Text style={styles.registerText}>
                  Create Account
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.loginLink}
                onPress={goLogin}
              >
                <Text style={styles.loginText}>
                  Already have an account?{" "}
                  <Text style={styles.loginBold}>Login</Text>
                </Text>
              </TouchableOpacity>
            </View>

            {loading && <Loader />}

            <AppModal
              {...modal}
              onClose={() => setModal({ visible: false })}
            />
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = {
  wrapper: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },
  logo: {
    width: 110,
    height: 110,
    alignSelf: "center",
    marginBottom: 24,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 24,
    elevation: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1f2937",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#f3f4f6",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  registerBtn: {
    backgroundColor: "#2e7d32",
    padding: 14,
    borderRadius: 14,
    marginTop: 8,
  },
  registerText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  loginLink: {
    marginTop: 18,
    alignItems: "center",
  },
  loginText: {
    fontSize: 14,
    color: "#6b7280",
  },
  loginBold: {
    color: "#2e7d32",
    fontWeight: "600",
  },
};
