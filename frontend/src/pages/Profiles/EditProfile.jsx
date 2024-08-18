import { Height, Translate } from "@mui/icons-material";
import { Box, Button, Modal, TextField } from "@mui/material";
import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";

const Editprofile = ({
  currentUser,
  loggedInUser,
  handleEditRender,
  fetchUpdatedUser,
}) => {
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState(loggedInUser[0]?.bio || "User Bio");
  const [location, setLocation] = useState(
    loggedInUser[0]?.location || "user location"
  );
  const [website, setWebsite] = useState(
    loggedInUser[0]?.website || "user web"
  );
  const [dob, setDob] = useState(loggedInUser[0]?.dob);
  const [isModalOpen, setModalOpen] = useState(false);
  const boxStyle = {
    backgroundColor: "whitesmoke",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    height: 600,
    width: 600,
  };
  console.log(displayName);
  console.log(currentUser);
  useEffect(() => {
    setDisplayName(
      currentUser?.displayName
        ? currentUser?.displayName
        : loggedInUser[0]?.username
    );
  }, [currentUser, loggedInUser]);
  const DobModal = ({ dob, setDob }) => {
    const [isDobOpen, setDobOpen] = useState(false);
    return (
      // Select Your Date of Birth:
      <div className="dob">
        <label htmlFor="date-id">
          Date Of Birth:
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </label>
      </div>
    );
  };
  const handleSaveChanges = async () => {
    setModalOpen(false);
    const editedData = {
      username: displayName,
      bio,
      location,
      website,
    };
    await axios.patch(
      `https://twitter-x-clone-vksq.onrender.com/user-updates?email=${currentUser?.email}`,
      editedData
    );
    await fetchUpdatedUser();
    //re render parent comp
    handleEditRender();
  };
  return (
    <div className="edit-profile-container">
      <Button variant="outlined" onClick={() => setModalOpen(true)}>
        Edit Profile
      </Button>
      <div className="modal-container">
        <Modal
          onClose={(e, r) => setModalOpen(false)}
          open={isModalOpen}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={boxStyle} className="container-modal">
            <div className="box-container">
              <div className="header">Edit Profile</div>
              <div className="user-details">
                {/* Username */}
                <TextField
                  label={"username"}
                  onChange={(e) => setDisplayName(e.target.value)}
                  value={displayName}
                  fullWidth
                />
                {/*Bio */}
                <TextField
                  label={"Bio"}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  fullWidth
                />
                {/* Location */}
                <TextField
                  label={"Location"}
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  fullWidth
                />
                {/* website */}
                <TextField
                  label={"Website Url"}
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  fullWidth
                />
                {/* dob */}
                <div className="dob-container"></div>
              </div>
              <div className="user-dob">
                <DobModal dob={dob} setDob={setDob} />
              </div>
              <div className="last-section"></div>
              <Button
                onClick={handleSaveChanges}
                variant={"outlined"}
                fullWidth
              >
                {" "}
                Save Changes
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Editprofile;
