import { View, Text } from "react-native";

export default function DeviceCard({ id, percentage, customName }) {
  let bgColor = "#D5F5D5";
  let warningText = "";

  if (percentage >= 60 && percentage < 80) {
    bgColor = "#FFF7C2";
  }

  if (percentage >= 80) {
    bgColor = "#FFC9C9";
    warningText = "Please replace the trash bag!";
  }

  return (
    <View
      style={{
        backgroundColor: bgColor,
        padding: 16,
        borderRadius: 14,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#ccc",
      }}
    >
      <Text style={{ fontSize: 16, fontWeight: "600" }}>
        Bin ID: {id}
      </Text>

      {customName ? (
        <Text style={{ fontSize: 14, marginBottom: 6 }}>
          Bin Name: {customName}
        </Text>
      ) : null}

      {/* Progress Bar */}
      <View
        style={{
          height: 14,
          backgroundColor: "#eee",
          borderRadius: 8,
          overflow: "hidden",
          marginTop: 8,
        }}
      >
        <View
          style={{
            width: `${percentage}%`,
            height: "100%",
            backgroundColor: "#4CAF50",
          }}
        />
      </View>

      <Text style={{ marginTop: 8 }}>
        Fullness: %{percentage}
      </Text>

      {warningText ? (
        <Text style={{ color: "#b30000", fontWeight: "bold" }}>
          {warningText}
        </Text>
      ) : null}
    </View>
  );
}
