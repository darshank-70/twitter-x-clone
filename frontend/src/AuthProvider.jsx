import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { auth } from "./firebase";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { TrySharp } from "@mui/icons-material";
// create a context
const AuthContext = React.createContext();
export const useAuth = () => {
  return useContext(AuthContext);
};
const AuthProvider = ({ children }) => {
  const [currentAuthUser, setCurrentAuthUser] = useState(null);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) =>
      setCurrentAuthUser(user)
    );
    return unsubscribe;
  }, []);
  const emailLogin = async (email, password) => {
    const user = await signInWithEmailAndPassword(auth, email, password);
    return user;
  };
  const emailSignup = async (email, password) => {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    return user;
  };
  const googleSignIn = async () => {
    const googleProvider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, googleProvider);
    const googleUser = result.user;
    return googleUser;
  };
  const logout = () => {
    auth.signOut();
  };
  const value = {
    currentAuthUser,
    emailLogin,
    emailSignup,
    googleSignIn,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
