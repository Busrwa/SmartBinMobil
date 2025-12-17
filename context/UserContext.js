import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [avatar, setAvatar] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setAvatar(snap.data().avatar || "avatar1");
      }

      setLoadingUser(false);
    };

    loadUserData();
  }, []);

  return (
    <UserContext.Provider value={{ avatar, setAvatar, loadingUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
