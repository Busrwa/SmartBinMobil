import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import DashboardScreen from "./screens/DashboardScreen";

import { UserProvider } from "./context/UserContext";
import { DevicesProvider } from "./context/DevicesContext";

export default function App() {
  const [user, setUser] = useState(null);
  const [screen, setScreen] = useState("login");
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthChecked(true);
    });
    return unsub;
  }, []);

  if (!authChecked) return null; // splash eklenebilir

  if (!user && screen === "login")
    return <LoginScreen goRegister={() => setScreen("register")} />;

  if (!user && screen === "register")
    return <RegisterScreen goLogin={() => setScreen("login")} />;

  return (
    <UserProvider>
      <DevicesProvider>
        <DashboardScreen />
      </DevicesProvider>
    </UserProvider>
  );
}
