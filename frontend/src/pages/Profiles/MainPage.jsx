import React, { useEffect, useState } from "react";
import useLoggedInUser from "../../hooks/useLoggedInUser";
import {
  Avatar,
  Button,
  CircularProgress,
  Modal,
  Switch,
  ToggleButton,
} from "@mui/material";
import "./mainpage.css";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { PostAdd } from "@mui/icons-material";
import PostCard from "../../components/PostCard";
import axios from "axios";
import SyncIcon from "@mui/icons-material/Sync";
import Editprofile from "./EditProfile";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import LanguageIcon from "@mui/icons-material/Language";

const MainPage = ({ currentUser }) => {
  // we get this from mongodb which has Coverimage url
  const defaultImageUrl =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
  const [loggedInUser, setLoggedInUser] = useLoggedInUser();

  const [isLoading, setIsLoading] = useState(false);
  const [isAvatarLoading, setAvatarLoading] = useState(false);
  const [avatarImageUrl, setAvatarImageUrl] = useState(
    loggedInUser[0]?.avatarImageUrl || defaultImageUrl
  );
  const [coverImageUrl, setCoverImageUrl] = useState(
    loggedInUser[0]?.coverImageUrl || defaultImageUrl
  );
  const [postsArray, setPostsArray] = useState(null);
  const fetchUpdatedUser = async () => {
    fetch(
      `https://twitter-x-clone-vksq.onrender.com/loggedInUser?email=${currentUser.email}`
    )
      .then((res) => res.json())
      .then((userFromDb) => setLoggedInUser(userFromDb));
  };
  const fetchPosts = async () => {
    try {
      console.log(currentUser?.email);
      const response = await fetch(
        `https://twitter-x-clone-vksq.onrender.com/user-post?email=${currentUser?.email}`
      );
      const data = await response.json();
      setPostsArray(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
  // oninitial Load
  useEffect(() => {
    setIsLoading(true);
    setAvatarLoading(true);
    setAvatarImageUrl(loggedInUser[0]?.avatarImageUrl);
    setCoverImageUrl(loggedInUser[0]?.coverImageUrl);
    fetchPosts();
    setIsLoading(false);
    setAvatarLoading(false);
  }, [loggedInUser, currentUser]);
  const handleAvatarInput = (e) => {
    setAvatarLoading(true);
    const imageUploaded = e.target.files[0];
    const formData = new FormData();
    formData.set("image", imageUploaded);
    const response = axios
      .post(
        "https://api.imgbb.com/1/upload?key=c452bc13182fbd9677158a44470747dd",
        formData
      )
      .then((response) => {
        console.log(response);
        const url = response.data.data.display_url;
        console.log(currentUser);
        // setAvatarLoading(false);
        setAvatarImageUrl(url);
        const userAvatarImage = {
          email: currentUser?.email,
          avatarImageUrl: url,
        };
        console.log(currentUser?.email);
        axios.patch(
          `https://twitter-x-clone-vksq.onrender.com/user-updates?email=${currentUser?.email}`,
          userAvatarImage
        );
        // setAvatarLoading(false);
      })
      .catch((err) => {
        // setAvatarLoading(false);
        console.log("Failed Avatar Upload", err);
      })
      .finally(() => setAvatarLoading(false));
  };
  // const handleCoverInput = async (e) => {
  //   setIsLoading(true);

  //   const imageUploaded = e.target.files[0];
  //   const formData = new FormData();
  //   formData.set("image", imageUploaded);
  //   console.log(formData);
  //   try {
  //     axios
  //       .post(
  //         "https://api.imgbb.com/1/upload?key=c452bc13182fbd9677158a44470747dd",
  //         formData
  //       )
  //       .then((response) => {
  //         setCoverImageUrl(response.data.data.display_url);
  //         console.log("cover Updatedddd", response);
  //         const url = response.data.data.display_url;
  //         console.log(currentUser);
  //         setCoverImageUrl(url);
  //         const userCoverImage = {
  //           email: currentUser?.email,
  //           coverImageUrl: url,
  //         };
  //         console.log(currentUser?.email);
  //         axios
  //           .patch(
  //             `https://twitter-x-clone-vksq.onrender.com/user-updates?email=${currentUser?.email}`,
  //             userCoverImage
  //           )
  //           .then((r) => {
  //             setCoverImageUrl(
  //               loggedInUser[0]?.coverImageUrl
  //                 ? loggedInUser[0]?.coverImageUrl
  //                 : defaultImageUrl
  //             );
  //           });
  //         // setIsLoading(false);
  //       })
  //       .catch((err) => console.log("errin posting image", err));

  //     // console.log(response);
  //     //insert it into DB by patch along with URL
  //   } catch (error) {
  //     console.log(error);
  //     // setIsLoading(false);
  //   } finally {
  //     setIsLoading(false);
  //   }
  //   await fetchUpdatedUser();
  // };
  const handleCoverInput = (e) => {
    setIsLoading(true);
    const imageUploaded = e.target.files[0];
    const formData = new FormData();
    formData.set("image", imageUploaded);
    axios
      .post(
        "https://api.imgbb.com/1/upload?key=c452bc13182fbd9677158a44470747dd",
        formData
      )
      .then((response) => {
        console.log(response);
        const url = response.data.data.display_url;
        console.log(currentUser);
        // setAvatarLoading(false);
        setCoverImageUrl(url);
        const userCoverImage = {
          email: currentUser?.email,
          coverImageUrl: url,
        };
        console.log(currentUser?.email);
        axios.patch(
          `https://twitter-x-clone-vksq.onrender.com/user-updates?email=${currentUser?.email}`,
          userCoverImage
        );
        // setAvatarLoading(false);
      })
      .catch((err) => {
        // setAvatarLoading(false);
        console.log("Failed COver Upload", err);
      })
      .finally(() => setIsLoading(false));
  };

  const [isProfileEdited, setProfileEdited] = useState(false);
  // const handleEditRender = () => {
  //   setProfileEdited(true);
  // };
  const [notificationEnabled, setNotificationEnabled] = useState(false);
  const [isToggleOn, setIsToggleOn] = useState(
    loggedInUser?.notificationEnabled
  );
  const handleNotificationToggle = (event) => {
    const newToggleState = event.target.checked;

    // If enabling notifications, request permission
    if (newToggleState) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          // User accepted notifications, update the state and backend
          updateNotificationPreference(newToggleState);
        } else {
          // User denied notifications, do not enable the toggle
          setIsToggleOn(false);
          alert("You need to enable notifications in your browser settings.");
        }
      });
    } else {
      // If disabling notifications, directly update the state and backend
      updateNotificationPreference(newToggleState);
    }
  };

  const updateNotificationPreference = (newToggleState) => {
    setIsToggleOn(newToggleState);

    // Update in the backend
    axios
      .patch(`http://localhost:5555/user-updates?email=${currentUser?.email}`, {
        notificationEnabled: Notification.permission == "granted",
      })
      .then((response) => {
        console.log("Notification preference updated:", response.data);
      })
      .catch((error) => {
        console.error("Error updating notification preference:", error);
        // Optionally, revert the toggle state if the update fails
        setIsToggleOn(!newToggleState);
      });
  };

  return (
    <div
      className="main-page-container"
      id={isProfileEdited ? "edited" : "not-edited"}
    >
      {/* Cover Image */}
      <img className="cover-image" src={coverImageUrl || defaultImageUrl} />

      <div className="cover-inputs">
        <label htmlFor="cover-input">
          {isLoading ? <CircularProgress /> : <AddAPhotoIcon />}
        </label>
        <input
          disabled={isLoading}
          type="file"
          accept=".jpg"
          id="cover-input"
          onChange={handleCoverInput}
        />
      </div>
      {/* Avatar */}
      <Avatar
        sx={{ width: 125, height: 125, objectFit: "cover" }}
        className="avatar-image"
        src={avatarImageUrl || defaultImageUrl}
      />
      <div className="avatar-inputs">
        <label htmlFor="avatar-input" className="svg-icon">
          {" "}
          {isAvatarLoading ? <CircularProgress /> : <AddAPhotoIcon />}
        </label>
        <input
          type="file"
          accept=".jpg"
          id="avatar-input"
          onChange={handleAvatarInput}
        />
      </div>
      <div className="edit-button">
        <Editprofile
          // handleEditRender={handleEditRender}
          fetchUpdatedUser={fetchUpdatedUser}
          currentUser={currentUser}
          loggedInUser={loggedInUser}
        />
        <Switch
          checked={loggedInUser?.notificationEnabled}
          onChange={handleNotificationToggle}
        />
        <h5>{isToggleOn ? "Notification Enabled" : "Notification Disabled"}</h5>
        {}
      </div>
      {/* User Info */}
      {
        <div className="user-info-wrap">
          {/* display Name */}
          <h3 className="user-display-name">
            {currentUser?.displayName != null
              ? currentUser.displayName
              : loggedInUser[0]?.username}
          </h3>

          {/* @username */}
          <h5>@{loggedInUser[0]?.email.split("@")[0]}</h5>
          {/* bio */}
          <i>
            {" "}
            <h3>{loggedInUser[0]?.bio}</h3>
          </i>
          {/* location */}
          <div className="location-website">
            <h4>
              {" "}
              <MyLocationIcon />
              {loggedInUser[0]?.location}
            </h4>

            <h4>
              <LanguageIcon /> {loggedInUser[0]?.website}
            </h4>
          </div>
        </div>
      }
      <div className="my-tweets">
        <h2>My Tweets</h2>
        <div className="posts-tweeted">
          {postsArray &&
            postsArray.map((post) => (
              <PostCard id={post._id} key={post._id} post={post} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
