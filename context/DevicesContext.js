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

  // bin realtime listener'ları
  const binUnsubsRef = useRef({});

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      // 🧹 temizlik
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

      // 🔥 kullanıcı device listesi (REAL-TIME)
      const unsubscribeDevices = onSnapshot(devicesRef, (snapshot) => {
        const userDevices = snapshot.docs.map((d) => ({
          id: d.id, // 🔥 firestore doc id (SİLME İÇİN)
          ...d.data(),
        }));

        // silinenleri state’ten temizle
        setDevices((prev) =>
          prev.filter((p) =>
            userDevices.some((u) => u.deviceId === p.deviceId)
          )
        );

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
                      id: device.id, // 🔥 doc id korunuyor
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
