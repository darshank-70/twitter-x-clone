import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase";
import { Link, Navigate, useNavigate } from "react-router-dom";
import HomePage from "./Home/HomePage";
import "../css/loginpage.css";
import Loading from "../components/Loading";
import xImage from "../assets/ximage.png";
import { Button } from "@mui/material";
import { useAuth } from "../AuthProvider";
import GoogleButton from "react-google-button";
import axios from "axios";
const LoginPage = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  //handle email and password submit

  const { currentAuthUser, emailLogin, googleSignIn } = useAuth();
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await emailLogin(emailId, password);
      setIsUserLoggedIn(true);
      console.log("user signed in successfully");
    } catch (error) {
      console.log("Could not Sign in User", error);
    }
    setIsLoading(false);
  };
  const handleGoogleSignIn = async () => {
    const googleUser = await googleSignIn();
    console.log(googleUser);
    // check if the user signing in  first time.
    // i.e if DB already have user with the googleUser.email
    try {
      const user = await axios.get(
        `https://twitter-x-clone-vksq.onrender.com/loggedInUser?email=${googleUser.email}`
      );
      console.log(user);
      if (user.data.length == 0) {
        // user if signing in google first time
        const userData = {
          username: googleUser.displayName,
          name: googleUser.displayName,
          email: googleUser.email,
          enabledNotification: false,
          remainingTweets: 3,
        };
        const { data } = await axios.post(
          "https://twitter-x-clone-vksq.onrender.com/register",
          userData
        );
        console.log("User created First TIME", data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return currentAuthUser ? (
    <Navigate to={"/home/feed"} />
  ) : isLoading ? (
    <Loading />
  ) : (
    <div className="login-wrapper">
      <div className="logo-container">
        <img src={xImage} className="ximage" />
      </div>
      <div className="login-form-container">
        <h1>Happening Now</h1>
        <form className="login-form" onSubmit={handleLoginSubmit}>
          <input
            required
            type="text"
            value={emailId}
            placeholder="Email Id"
            onChange={(e) => setEmailId(e.target.value)}
          />
          <input
            required
            type="text"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="outlined" type="submit">
            Login{" "}
          </Button>
        </form>
        <br />
        <GoogleButton onClick={handleGoogleSignIn} />
        <br />
        <div className="goto-register">
          Dont Have an Account, <Link to={"/register"}>Register Now</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
