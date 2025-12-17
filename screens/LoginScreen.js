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
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase";
import Loader from "../components/Loader";
import AppModal from "../components/AppModal";

export default function LoginScreen({ goRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({ visible: false });
  const [resetModal, setResetModal] = useState({ visible: false });

  const login = async () => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
    } catch {
      setModal({
        visible: true,
        title: "Login Failed",
        message: "Email or password is incorrect.",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async () => {
    if (!email) {
      setResetModal({
        visible: true,
        title: "Email Required",
        message: "Please enter your email address first.",
      });
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email.trim());

      setResetModal({
        visible: true,
        title: "Check Your Email",
        message:
          "We sent a password reset link to your email. Please also check your Spam or Promotions folder.",
      });

    } catch (error) {
      console.log("RESET ERROR:", error);

      setResetModal({
        visible: true,
        title: "Error",
        message: error.message,
      });
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
              <Text style={styles.title}>Welcome Back 👋</Text>
              <Text style={styles.subtitle}>
                Sign in to manage your smart bins
              </Text>

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

              <TouchableOpacity
                onPress={resetPassword}
                style={styles.forgotBtn}
              >
                <Text style={styles.forgotText}>Forgot password?</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.loginBtn,
                  loading && { opacity: 0.7 },
                ]}
                onPress={login}
                disabled={loading}
              >
                <Text style={styles.loginText}>Login</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.outlineBtn}
                onPress={goRegister}
              >
                <Text style={styles.outlineText}>
                  Create Account
                </Text>
              </TouchableOpacity>
            </View>

            {loading && <Loader />}

            <AppModal
              {...modal}
              onClose={() => setModal({ visible: false })}
            />

            <AppModal
              {...resetModal}
              onClose={() => setResetModal({ visible: false })}
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
  forgotBtn: {
    alignSelf: "flex-end",
    marginBottom: 16,
  },
  forgotText: {
    fontSize: 13,
    color: "#6b7280",
  },
  loginBtn: {
    backgroundColor: "#2e7d32",
    padding: 14,
    borderRadius: 14,
    marginBottom: 14,
  },
  loginText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  outlineBtn: {
    padding: 14,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#2e7d32",
    alignItems: "center",
  },
  outlineText: {
    color: "#2e7d32",
    fontSize: 16,
    fontWeight: "600",
  },
};
