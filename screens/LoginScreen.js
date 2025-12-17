import { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, Image } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import Loader from "../components/Loader";
import AppModal from "../components/AppModal";

export default function LoginScreen({ goRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({ visible: false });

  const login = async () => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
    } catch {
      setModal({
        visible: true,
        title: "Login Failed",
        message: "Email or password is incorrect",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.logo} />

      <TextInput placeholder="Email" style={styles.input} onChangeText={setEmail} />
      <TextInput placeholder="Password" secureTextEntry style={styles.input} onChangeText={setPassword} />

      <TouchableOpacity style={styles.button} onPress={login}>
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.linkBtn} onPress={goRegister}>
        <Text style={styles.linkText}>Create Account</Text>
      </TouchableOpacity>

      {loading && <Loader />}
      <AppModal {...modal} onClose={() => setModal({ visible: false })} />
    </View>
  );
}

const styles = {
  container: { flex: 1, justifyContent: "center", padding: 24 },
  logo: { width: 120, height: 120, alignSelf: "center", marginBottom: 20 },
  input: { borderWidth: 1, padding: 12, marginBottom: 12, borderRadius: 10 },
  button: { backgroundColor: "#2e7d32", padding: 14, borderRadius: 12 },
  btnText: { color: "white", textAlign: "center", fontSize: 16 },
  linkBtn: { marginTop: 16, alignItems: "center" },
  linkText: { color: "#2e7d32", fontSize: 15 },
};
