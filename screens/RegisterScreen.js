import { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, Image } from "react-native";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
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
    if (!username || !email || !password)
      return setModal({ visible: true, title: "Error", message: "All fields required" });

    if (password !== confirm)
      return setModal({ visible: true, title: "Error", message: "Passwords do not match" });

    try {
      setLoading(true);
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(res.user, { displayName: username });

      await setDoc(doc(db, "users", res.user.uid), {
        username,
        email,
      });
    } catch (e) {
      setModal({ visible: true, title: "Register Failed", message: e.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.logo} />

      <TextInput placeholder="Username" style={styles.input} onChangeText={setUsername} />
      <TextInput placeholder="Email" style={styles.input} onChangeText={setEmail} />
      <TextInput placeholder="Password" secureTextEntry style={styles.input} onChangeText={setPassword} />
      <TextInput placeholder="Confirm Password" secureTextEntry style={styles.input} onChangeText={setConfirm} />

      <TouchableOpacity style={styles.button} onPress={register}>
        <Text style={styles.btnText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={goLogin}>
        <Text style={styles.link}>Back to Login</Text>
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
  link: { textAlign: "center", marginTop: 16, color: "#2e7d32" },
};
