import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../firebase";

const DevicesContext = createContext();

export function DevicesProvider({ children }) {
  const [devices, setDevices] = useState([]);
  const [loadingDevices, setLoadingDevices] = useState(true);

  // bin listener'ları tutmak için
  const binUnsubsRef = useRef({});

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      // 🧹 her auth değişiminde temizlik
      Object.values(binUnsubsRef.current).forEach((u) => u());
      binUnsubsRef.current = {};
      setDevices([]);

      if (!user) {
        setLoadingDevices(false);
        return;
      }

      setLoadingDevices(true);

      const devicesRef = collection(
        db,
        "users",
        user.uid,
        "devices"
      );

      // 🔥 kullanıcı device listesi
      const unsubscribeDevices = onSnapshot(devicesRef, (snapshot) => {
        const userDevices = snapshot.docs.map((d) => ({
          id: d.id, // sadece UI için
          ...d.data(),
        }));

        if (userDevices.length === 0) {
          setDevices([]);
          setLoadingDevices(false);
          return;
        }

        userDevices.forEach((device) => {
          const deviceId = device.deviceId;

          if (!deviceId) return;

          // bin listener yoksa ekle
          if (!binUnsubsRef.current[deviceId]) {
            const binRef = doc(db, "bin", deviceId);

            binUnsubsRef.current[deviceId] = onSnapshot(
              binRef,
              (binSnap) => {
                if (!binSnap.exists()) return;

                const binData = binSnap.data();

                setDevices((prev) => {
                  const others = prev.filter(
                    (d) => d.deviceId !== deviceId
                  );

                  return [
                    ...others,
                    {
                      deviceId,
                      customName: device.customName || "",
                      distanceCm: binData.distanceCm,
                    },
                  ];
                });

                setLoadingDevices(false);
              }
            );
          }
        });
      });

      return () => unsubscribeDevices();
    });

    return () => unsubscribeAuth();
  }, []);

  return (
    <DevicesContext.Provider
      value={{ devices, loadingDevices }}
    >
      {children}
    </DevicesContext.Provider>
  );
}

export const useDevices = () => useContext(DevicesContext);
