"use client";
import "./globals.css";

import Header from "./component/Header";
import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

type Dispatch<T> = (action: T) => void;

const AuthContext = createContext({
  user: null,
  setUser: () => {},
} as {
  user: null;
  setUser: Dispatch<any>;
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, async (u) => {
      if (u) {
        try {
          const userDoc = doc(db, "Users", u.uid);
          const userSnapshot = await getDoc(userDoc);

          if (userSnapshot.exists()) {
            const userData = userSnapshot.data();
            const { role } = userData;

            const updatedUser: any = {
              uid: u.uid,
              email: u.email,
              role: role,
            };

            setUser(updatedUser);
          } else {
            setUser(null);
          }
        } catch (error) {
          console.error("Error fetching user role from Firestore:", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <>
      <AuthContext.Provider value={{ user, setUser }}>
        <html lang="en">
          <body>
            <Header />
            {children}
          </body>
        </html>
      </AuthContext.Provider>
    </>
  );
}

export const useAuthContext = () => useContext(AuthContext);
