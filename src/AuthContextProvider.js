import React, { createContext, useContext, useEffect, useState } from "react";
import { auth} from "./firebase";
import { updateProfile } from "firebase/auth";
import { storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const UserContext = createContext();
function AuthContextProvider({ children }) {
  const [user, setUser] = useState();

  const createUser = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
    
  };
  useEffect(() => {
    auth.onAuthStateChanged((currentUser) => {
      console.log(currentUser);
      setUser(currentUser);
    });
  }, []);

  const signIn = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const logout = () => {
    return auth.signOut();
  };

  return (
    <UserContext.Provider value={{ createUser, user, logout, signIn }}>
      {children}
    </UserContext.Provider>
  );
}

export default AuthContextProvider;

export const UserAuth = () => {
  return useContext(UserContext);
};

export const Upload = async(file, user, setLoading) => {
  const fileRef = ref(storage, "profilePic/" + user.uid);
  setLoading(true);
  const snapshot = await uploadBytes(fileRef, file);
  const photoURL = await getDownloadURL(fileRef);
  updateProfile(user, { photoURL });
  setLoading(false);
  alert("Profile picture uploaded");
};
