import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function TermsScreen({ goBack }) {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>

        {/* HEADER */}
        <View style={styles.header}>
          <Ionicons name="document-text-outline" size={32} color="#2e7d32" />
          <Text style={styles.title}>Terms of Service</Text>
        </View>

        {/* CONTENT */}
        <View style={styles.card}>
          <Section
            title="1. Acceptance of Terms"
            text="By accessing or using the SmartBin mobile application, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must discontinue use of the application."
          />

          <Section
            title="2. Description of Service"
            text="SmartBin is a monitoring platform designed to display fill-level data from smart waste bins. The service is provided for informational purposes only and does not guarantee accuracy or uninterrupted availability."
          />

          <Section
            title="3. User Responsibilities"
            text="Users are responsible for maintaining the confidentiality of their account credentials and for all activities conducted under their account. Any misuse of the application is strictly prohibited."
          />

          <Section
            title="4. System Limitations"
            text="The application relies on hardware sensors and network connectivity. The developer is not responsible for incorrect data readings, hardware malfunctions, connectivity issues, or delays in data transmission."
          />

          <Section
            title="5. Intellectual Property"
            text="All content, design elements, and software components of the application are the intellectual property of the developer. Unauthorized copying, modification, or redistribution is prohibited."
          />

          <Section
            title="6. Limitation of Liability"
            text="The application is provided on an 'as-is' basis. The developer shall not be liable for any direct or indirect damages arising from the use or inability to use the service."
          />

          <Section
            title="7. Termination"
            text="The developer reserves the right to suspend or terminate user access at any time in cases of misuse, security risks, or violations of these terms."
          />

          <Section
            title="8. Changes to Terms"
            text="These Terms of Service may be updated periodically. Continued use of the application after changes indicates acceptance of the revised terms."
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

/* ---------- SECTION ---------- */
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
