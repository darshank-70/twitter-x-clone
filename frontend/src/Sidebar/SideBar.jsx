import React, { useState } from "react";
import SideBarOption from "../components/SideBarOption";
import "./sidebar.css";
import HomeSharpIcon from "@mui/icons-material/HomeSharp";
import SearchIcon from "@mui/icons-material/Search";
import HouseIcon from "@mui/icons-material/House";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import MoreIcon from "@mui/icons-material/More";
import XIcon from "@mui/icons-material/X";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  Avatar,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@mui/material";
import { DoneOutlineOutlined, MoreHorizOutlined } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import useLoggedInUser from "../hooks/useLoggedInUser";
import { auth } from "../firebase";

const SideBar = ({ handleLogout, firebaseUser }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [anchorElement, setAnchorElement] = useState(null);
  const [loggedInUser] = useLoggedInUser();
  const userProfilePic = loggedInUser[0]?.avatarImageUrl
    ? loggedInUser[0]?.avatarImageUrl
    : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  console.log(firebaseUser);
  console.log(loggedInUser);
  const handleMenuClick = (e) => {
    setIsMenuOpen(true);
    setAnchorElement(e.currentTarget);
  };
  const handleMenuClose = (e) => {
    setIsMenuOpen(false);
    setAnchorElement(null);
  };
  const getUserDisplayName = () => {
    return firebaseUser?.displayName != null
      ? firebaseUser.displayName
      : loggedInUser[0]?.username;
  };
  const getUserEmail = () => {
    return loggedInUser[0]?.email.split("@")[0];
  };
  const logoutClick = () => {
    auth.signOut();
  };
  return (
    <div className="sidebar-container">
      <XIcon className="x-icon" />
      <NavLink to={"/home/feed"}>
        <SideBarOption active name="Home" Icon={HouseIcon} />
      </NavLink>
      <NavLink to={"/home/explore"}>
        <SideBarOption name="Explore" Icon={SearchIcon} />
      </NavLink>
      <NavLink to={"/home/notifications"}>
        {" "}
        <SideBarOption name={"Notifications"} Icon={NotificationsIcon} />
      </NavLink>
      <NavLink to={"/home/messages"}>
        <SideBarOption name={"Messages"} Icon={MailOutlineIcon} />
      </NavLink>
      <NavLink to={"/home/bookmarks"}>
        <SideBarOption name={"Bookmarks"} Icon={BookmarkBorderIcon} />
      </NavLink>
      <NavLink to={"/home/lists"}>
        {" "}
        <SideBarOption name={"Lists"} Icon={ListAltIcon} />
      </NavLink>
      <NavLink to={"/home/profiles"}>
        {" "}
        <SideBarOption name={"Profiles"} Icon={PermIdentityIcon} />
      </NavLink>
      <NavLink to={"/home/more"}>
        <SideBarOption name={"More"} Icon={MoreHorizIcon} />
      </NavLink>
      <div className="profile-info-sidebar">
        <div>
          <Avatar src={userProfilePic} />
        </div>
        <div className="user-info">
          {/* users display name/ Name from DB */}
          <h4>{getUserDisplayName()}</h4>
          {/* users Email split  */}
          <h5>@{getUserEmail()}</h5>
        </div>
        <IconButton
          size="small"
          aria-controls={isMenuOpen ? "info-menu" : undefined}
          aria-haspopup={true}
          aria-expanded={isMenuOpen ? true : undefined}
          onClick={handleMenuClick}
        >
          <MoreHorizOutlined />
        </IconButton>
        <Menu
          id="info-menu"
          anchorEl={anchorElement}
          open={isMenuOpen}
          onClick={handleMenuClose}
          onClose={handleMenuClose}
        >
          <MenuItem className={"profile-info-1"}>
            <Avatar src={userProfilePic} />
            <div className="user-info user-info-sub">
              <div>
                {/* users display name/ Name from DB */}
                <h4>{getUserDisplayName()}</h4>
                {/* users Email split  */}
                <h5>@ {getUserEmail()}</h5>
              </div>
              <ListItemIcon>
                <DoneOutlineOutlined />
              </ListItemIcon>
            </div>
          </MenuItem>
          <Divider />
          <MenuItem>Add an Existing Account?</MenuItem>
          <MenuItem onClick={logoutClick}>Logout @ {getUserEmail()}</MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default SideBar;
