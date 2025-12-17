import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function KvkkScreen({ goBack }) {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>

        {/* HEADER */}
        <View style={styles.header}>
          <Ionicons name="shield-checkmark-outline" size={32} color="#2e7d32" />
          <Text style={styles.title}>Data Protection Notice</Text>
        </View>

        {/* CONTENT */}
        <View style={styles.card}>
          <Section
            title="1. Data Controller"
            text="This Data Protection Notice has been prepared in accordance with the Personal Data Protection Law No. 6698 (KVKK) to inform users of the SmartBin mobile application regarding the processing of their personal data."
          />

          <Section
            title="2. Processed Personal Data"
            text="The application processes user information such as email address, username, application usage data, and system logs. No special category personal data is processed."
          />

          <Section
            title="3. Purposes of Processing"
            text="Personal data is processed for user authentication, secure operation of the application, system monitoring of smart waste bins, and improving user experience."
          />

          <Section
            title="4. Data Transfer"
            text="Personal data is not shared with third parties except for legal obligations. All data is securely stored and processed using Firebase infrastructure services."
          />

          <Section
            title="5. Legal Basis"
            text="Personal data is processed based on legal grounds specified under Article 5 of KVKK, including the necessity of processing for the establishment and performance of a contract and compliance with legal obligations."
          />

          <Section
            title="6. Data Retention Period"
            text="Personal data is retained for the duration required by applicable legislation or until the purpose of processing no longer exists."
          />

          <Section
            title="7. Rights of Data Subjects"
            text="Pursuant to Article 11 of KVKK, users have the right to learn whether their personal data is processed, request information, request correction or deletion, and object to unlawful processing."
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
