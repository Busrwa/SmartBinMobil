import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import DevicesScreen from "./DevicesScreen";
import AddDeviceScreen from "./AddDeviceScreen";
import ProfileScreen from "./ProfileScreen";
import BottomTab from "../components/BottomTab";

export default function DashboardScreen() {
  const [tab, setTab] = useState("devices");

  // 🔑 root reset key'leri
  const [devicesKey, setDevicesKey] = useState(0);
  const [addKey, setAddKey] = useState(0);
  const [profileKey, setProfileKey] = useState(0);

  const handleReselect = (tabName) => {
    if (tabName === "devices") setDevicesKey((k) => k + 1);
    if (tabName === "add") setAddKey((k) => k + 1);
    if (tabName === "profile") setProfileKey((k) => k + 1);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {tab === "devices" && <DevicesScreen key={devicesKey} />}
        {tab === "add" && <AddDeviceScreen key={addKey} />}
        {tab === "profile" && (
          <ProfileScreen resetTrigger={profileKey} />
        )}

      </View>

      <BottomTab
        tab={tab}
        setTab={setTab}
        onReselect={handleReselect}
      />
    </SafeAreaView>
  );
}
