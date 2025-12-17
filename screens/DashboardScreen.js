import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import DevicesScreen from "./DevicesScreen";
import AddDeviceScreen from "./AddDeviceScreen";
import ProfileScreen from "./ProfileScreen";
import BottomTab from "../components/BottomTab";

export default function DashboardScreen() {
  const [tab, setTab] = useState("devices");

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {tab === "devices" && <DevicesScreen />}
        {tab === "add" && <AddDeviceScreen />}
        {tab === "profile" && <ProfileScreen />}
      </View>

      <BottomTab tab={tab} setTab={setTab} />
    </SafeAreaView>
  );
}
