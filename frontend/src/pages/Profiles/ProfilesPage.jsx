import React, { useEffect, useState } from "react";
import MainPage from "./MainPage";
import { auth } from "../../firebase";
const Profiles = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => setCurrentUser(user));
  }, []);
  return (
    <div className="profiles-page-container">
      <MainPage currentUser={currentUser} />
    </div>
  );
};

export default Profiles;
