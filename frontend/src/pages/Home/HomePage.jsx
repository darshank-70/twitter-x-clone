import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { Navigate, Outlet } from "react-router-dom";
import LoginPage from "../LoginPage";
import { Audio } from "react-loader-spinner";
import SideBar from "../../Sidebar/SideBar";
import Feed from "../Feed/FeedPage";
import Widgets from "../../Widgets/Widgets";
import "./homepage.css";
import XIcon from "@mui/icons-material/X";
import useLoggedInUser from "../../hooks/useLoggedInUser";

const HomePage = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loggedInUser] = useLoggedInUser();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      console.log(user);
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [loggedInUser]);
  const handleLogout = () => {
    auth.signOut();
  };
  // return !currentUser ? (
  //   <LoginPage />
  // ) : (

  // console.log(loggedInUser);
  return (
    <div className="home-wrapper">
      <div className="home-container">
        {/* <div className="navbar">
          <button
            onClick={() => {
              auth.signOut();
            }}
          >
            Sign Out
          </button>
        </div>
        <p> Welcome, {currentUser.email}</p>
          <p> {currentUser.uid}</p>*/}
        <SideBar handleLogout={handleLogout} firebaseUser={currentUser} />
        <div className="feed-wrap">
          <Outlet />
        </div>
        <div className="widgets-wrap">
          <Widgets />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
