import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";
import DeviceCard from "../components/DeviceCard";

export default function DevicesScreen() {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    const ref = collection(db, "users", auth.currentUser.uid, "devices");

    const unsub = onSnapshot(ref, async (snapshot) => {
      const list = [];

      for (const snap of snapshot.docs) {
        const deviceId = snap.id;
        const customName = snap.data().customName || "";

        const binRef = doc(db, "bin", deviceId);
        const binSnap = await getDoc(binRef);

        let percentage = 0;

        if (binSnap.exists()) {
          const distance = binSnap.data().distanceCm;
          const capacity = 50;
          const filled = capacity - distance;

          percentage = Math.round((filled / capacity) * 100);
          if (percentage < 0) percentage = 0;
          if (percentage > 100) percentage = 100;
        }

        list.push({ id: deviceId, customName, percentage });
      }

      setDevices(list);
    });

    const interval = setInterval(() => {
      setDevices((prev) => [...prev]);
    }, 60000); // ⏱ 1 dakika

    return () => {
      unsub();
      clearInterval(interval);
    };
  }, []);

  const deleteDevice = async (id) => {
    await deleteDoc(
      doc(db, "users", auth.currentUser.uid, "devices", id)
    );
  };

  return (
    <ScrollView style={{ padding: 16 }}>
      <Text style={{ fontSize: 22, marginBottom: 16 }}>
        My Bins
      </Text>

      {devices.length === 0 && <Text>No bins added.</Text>}

      {devices.map((d) => (
        <View key={d.id}>
          <DeviceCard {...d} />
          <TouchableOpacity
            onPress={() => deleteDevice(d.id)}
            style={{
              backgroundColor: "red",
              padding: 8,
              borderRadius: 8,
              marginBottom: 24,
            }}
          >
            <Text style={{ color: "white", textAlign: "center" }}>
              Delete
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}
