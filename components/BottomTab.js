import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BottomTab({ tab, setTab, onReselect }) {
  return (
    <SafeAreaView edges={["bottom"]} style={styles.safe}>
      <View style={styles.container}>
        <TabItem
          label="My Bins"
          icon="trash-outline"
          activeIcon="trash"
          active={tab === "devices"}
          onPress={() => {
            if (tab === "devices") {
              onReselect("devices");
            } else {
              setTab("devices");
            }
          }}
        />

        <TabItem
          label="Add Bin"
          icon="add-circle-outline"
          activeIcon="add-circle"
          active={tab === "add"}
          onPress={() => {
            if (tab === "add") {
              onReselect("add");
            } else {
              setTab("add");
            }
          }}
        />

        <TabItem
          label="Profile"
          icon="person-outline"
          activeIcon="person"
          active={tab === "profile"}
          onPress={() => {
            if (tab === "profile") {
              onReselect("profile");
            } else {
              setTab("profile");
            }
          }}
        />

      </View>
    </SafeAreaView>
  );
}

function TabItem({ icon, activeIcon, label, active, onPress }) {
  return (
    <TouchableOpacity style={styles.tabItem} onPress={onPress}>
      <Ionicons
        name={active ? activeIcon : icon}
        size={26}
        color={active ? "#2e7d32" : "#9ca3af"}
      />
      <Text style={[styles.label, active && styles.activeLabel]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safe: {
    backgroundColor: "#ffffff",
  },
  container: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    paddingVertical: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    gap: 4,
  },
  label: {
    fontSize: 12,
    color: "#9ca3af",
  },
  activeLabel: {
    color: "#2e7d32",
    fontWeight: "600",
  },
});
