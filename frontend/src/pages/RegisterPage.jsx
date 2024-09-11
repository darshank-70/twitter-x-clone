import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "../css/registerpage.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import HomePage from "./Home/HomePage";
import LoginPage from "./LoginPage";
import axios from "axios";
import xImage from "../assets/ximage.png";

const RegisterPage = () => {
  const [username, setUsername] = useState(null);
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState(null);
  const navigate = useNavigate();
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        username: emailId,
        name: username,
        email: emailId,
        enabledNotification: false,
        remainingTweets: 3,
      };
      const { data } = axios.post(
        "https://twitter-x-clone-vksq.onrender.com/register",
        userData
      );
      console.log("User created First TIME", data);
    } catch (err) {}
    try {
      await createUserWithEmailAndPassword(auth, emailId, password);
      toast.success("User Created Succesfully");
      const user = auth.currentUser;

      console.log("registered user:::", user);
      navigate("/login");
    } catch (error) {
      console.log(error.message);
      toast.error("Could not create Account", { position: "top-right" });
    }
  };
  return (
    <div className="register-container">
      <div className="image-container">
        <img src={xImage} className="ximage" />
      </div>
      <div className="logo-container">
        <div className="signup-form-container">
          <h1>Happening Now</h1>
          <form className="register-form" onSubmit={handleRegisterSubmit}>
            <input
              type="text"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              required
              type="text"
              placeholder="Email Id"
              onChange={(e) => setEmailId(e.target.value)}
            />
            <input
              required
              type="text"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="text"
              placeholder="Confirm Password"
              onChange={(e) => setconfirmPassword(e.target.value)}
            />
            <button type="submit">Register</button>
          </form>
          <div className="goto-signin">
            Already Have an Account, <Link to={"/login"}>Sign In Now</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
