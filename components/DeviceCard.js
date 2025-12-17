import { View, Text } from "react-native";

const MAX_DISTANCE = 50;

export default function DeviceCard({
  deviceId,
  customName,
  distanceCm = 0,
}) {
  const percentage = Math.min(
    100,
    Math.max(
      0,
      Math.round(
        ((MAX_DISTANCE - distanceCm) / MAX_DISTANCE) * 100
      )
    )
  );

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
        borderWidth: 1,
        borderColor: "#ccc",
      }}
    >
      <Text style={{ fontSize: 16, fontWeight: "600" }}>
        Bin ID: {deviceId}
      </Text>

      {customName ? (
        <Text style={{ fontSize: 14, marginBottom: 6 }}>
          Bin Name: {customName}
        </Text>
      ) : null}

      {/* Progress */}
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

      {warningText && (
        <Text style={{ color: "#b30000", fontWeight: "bold" }}>
          {warningText}
        </Text>
      )}
    </View>
  );
}
