import { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(null); // ✅ FIX added

  // ✅ Auto login + fetch Firestore userData
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        try {
          const userRef = doc(db, "users", currentUser.uid);
          const snap = await getDoc(userRef);

          if (snap.exists()) {
            setUserData(snap.data());
          }
        } catch (error) {
          console.error("Firestore error:", error.message);
        }
      } else {
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // ✅ Login function (called from Login.jsx)
  const login = (user, token, data) => {
    setUser(user);
    setToken(token);
    setUserData(data);
  };

  // ✅ Logout
  const logout = async () => {
    await auth.signOut();
    setUser(null);
    setUserData(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userData, // ✅ VERY IMPORTANT
        token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
