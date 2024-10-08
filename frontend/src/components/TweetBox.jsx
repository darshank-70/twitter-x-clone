import React, { useState, useMemo, useEffect, useRef } from "react";
import { Avatar, Card, Button } from "@mui/material";
import { AddPhotoAlternateOutlined } from "@mui/icons-material";
import axios from "axios";
import useLoggedInUser from "../hooks/useLoggedInUser";
import { auth } from "../firebase";

const TweetBox = ({ onNewTweet }) => {
  const [loggedInUser] = useLoggedInUser();
  const [tweetText, setTweetText] = useState("");
  const [tweetImageUrl, setTweetImageUrl] = useState("");
  const [isLoadingFile, setIsLoadingFile] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [username, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const fileInputRef = useRef(null);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      console.log(user);
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);
  useEffect(() => {
    setUsername(
      currentUser?.displayName != null
        ? currentUser.displayName
        : loggedInUser[0]?.username
    );
    setUserEmail(loggedInUser[0]?.email.split("@")[0]);
  }, [loggedInUser, currentUser]);
  const userProfilePicUrl = useMemo(() => {
    const url = loggedInUser[0]?.avatarImageUrl;
    return url
      ? url
      : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
  }, [loggedInUser]);

  console.log("In Tweetbox::", loggedInUser);
  // const getUserDisplayName = () => {
  //   return currentUser?.displayName != null
  //     ? currentUser.displayName
  //     : loggedInUser[0]?.username;
  // };
  // const getUserEmail = () => {
  //   return loggedInUser[0]?.email.split("@")[0];
  // };
  const handleTweetSubmit = async (e) => {
    e.preventDefault();
    setUsername(
      currentUser?.displayName != null
        ? currentUser.displayName
        : loggedInUser[0]?.username
    );
    setUserEmail(loggedInUser[0]?.email.split("@")[0]);
    const userPost = {
      tweetText: tweetText,
      tweetImageUrl: tweetImageUrl,
      userProfilePicUrl: userProfilePicUrl,
      userEmail: loggedInUser[0]?.email, //from state
      username: username, //from state,
    };
    console.log(userPost);
    if (username && userEmail && tweetText) {
      //only create post if we have a user data
      try {
        const response = await fetch(
          "https://twitter-x-clone-vksq.onrender.com/post",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userPost),
          }
        );
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("Error submitting tweet:", error);
      }
      console.log(tweetText);
    } else {
      console.log("no user or no text, no post");
    }
    //reset the form
    setTweetText("");
    setTweetImageUrl(null);
    fileInputRef.current.value = null;
    await onNewTweet();
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();
    setIsLoadingFile(true);
    const image = e.target.files[0];
    const formData = new FormData();
    formData.set("image", image);
    console.log(formData);

    try {
      const response = await axios.post(
        "https://api.imgbb.com/1/upload?key=c452bc13182fbd9677158a44470747dd",
        formData
      );
      console.log(response);
      console.log(response.data.data.display_url);
      setTweetImageUrl(response.data.data.display_url);
    } catch (error) {
      console.error("Image upload Err:::", error);
    } finally {
      setIsLoadingFile(false);
    }
  };

  return (
    <div className="tweet-box">
      <Card sx={{ padding: 5 }}>
        <form onSubmit={handleTweetSubmit}>
          <div className="tweet-input">
            <Avatar src={userProfilePicUrl} />
            <input
              type="text"
              placeholder="What's Happening?"
              value={tweetText}
              onChange={(e) => setTweetText(e.target.value)}
            />
          </div>
          <div className="image-icon-tweet-btn">
            <label htmlFor="image-input" className="image_icon">
              {isLoadingFile ? (
                <p>Uploading</p>
              ) : tweetImageUrl ? (
                <p>Image Uploaded</p>
              ) : (
                <AddPhotoAlternateOutlined />
              )}
            </label>
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleImageUpload}
              id="image-input"
              className="imageInput"
            />
            <Button variant="contained" type="submit" disabled={isLoadingFile}>
              Tweet
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default TweetBox;
