import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function PrivacyScreen({ goBack }) {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>

        {/* HEADER */}
        <View style={styles.header}>
          <Ionicons name="shield-checkmark-outline" size={32} color="#2e7d32" />
          <Text style={styles.title}>Privacy Policy</Text>
        </View>

        {/* CONTENT */}
        <View style={styles.card}>
          <Section
            title="1. Introduction"
            text="This Privacy Policy explains how the SmartBin mobile application collects, uses, and protects your information. By using this application, you agree to the practices described in this policy."
          />

          <Section
            title="2. Data We Collect"
            text="The application collects only the minimum data required to provide its services. This includes user authentication data (email, username), registered device identifiers, and sensor-related information such as distance measurements from smart waste bins."
          />

          <Section
            title="3. Purpose of Data Usage"
            text="Collected data is used solely to monitor waste bin fill levels, display device status, and provide notifications to users. No data is processed for advertising or commercial profiling purposes."
          />

          <Section
            title="4. Data Storage and Security"
            text="All data is securely stored using Google Firebase services. Industry-standard security measures are applied to protect your data against unauthorized access, alteration, or disclosure."
          />

          <Section
            title="5. Data Sharing"
            text="Your data is not shared with third parties. Access is strictly limited to the application owner and the authenticated user associated with the data."
          />

          <Section
            title="6. User Rights"
            text="Users have the right to access, update, or delete their personal data at any time through the application. Account deletion will result in the permanent removal of associated data."
          />

          <Section
            title="7. Changes to This Policy"
            text="This Privacy Policy may be updated periodically. Any changes will be communicated through the application. Continued use of the app constitutes acceptance of the updated policy."
          />

          <Section
            title="8. Contact"
            text="If you have any questions regarding this Privacy Policy or data handling practices, please contact the application administrator."
          />
        </View>

        {/* BACK BUTTON */}
        <TouchableOpacity style={styles.backBtn} onPress={goBack}>
          <Ionicons name="arrow-back" size={20} color="white" />
          <Text style={styles.backText}>Back to Profile</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------- SECTION COMPONENT ---------- */
function Section({ title, text }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionText}>{text}</Text>
    </View>
  );
}

/* ---------- STYLES ---------- */
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
    gap: 6,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1f2937",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 18,
    padding: 20,
    gap: 16,
    elevation: 3,
  },
  section: {
    gap: 6,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1f2937",
  },
  sectionText: {
    fontSize: 14,
    lineHeight: 22,
    color: "#4b5563",
  },
  backBtn: {
    marginTop: 24,
    backgroundColor: "#2e7d32",
    padding: 16,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  backText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
