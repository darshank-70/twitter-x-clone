import React, { useEffect, useState } from "react";
import { auth } from "../firebase";

const useLoggedInUser = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState({});

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []); // Empty dependency array ensures this runs only once

  useEffect(() => {
    if (currentUser?.email) {
      fetch(
        `https://twitter-x-clone-vksq.onrender.com/loggedInUser?email=${currentUser.email}`
      )
        .then((res) => res.json())
        .then((userFromDb) => setLoggedInUser(userFromDb));
    }
  }, [currentUser]); // Dependency on currentUser ensures this runs when currentUser changes

  return [loggedInUser, setLoggedInUser];
};

export default useLoggedInUser;
