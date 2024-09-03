import { FavoriteSharp } from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  styled,
} from "@mui/material";
import React, { useState } from "react";
import BookmarksRoundedIcon from "@mui/icons-material/BookmarksRounded";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
const PostCard = ({ post, key }) => {
  const { tweetText, tweetImageUrl, username, userEmail, userProfilePicUrl } =
    post;
  const [toggleLike, setToggleLike] = useState("default");
  const handleLikeButtonClick = () => {
    setToggleLike((prevState) => {
      if (prevState === "default") return "error";
      return "default";
    });
  };
  const CustomLikeButton = styled(IconButton)(({ theme }) => ({
    "& .MuiTouchRipple-root": {
      color: theme.palette.error.main,
    },
  }));

  return (
    <div key={key}>
      <Card sx={{ padding: 5, marginTop: 2 }}>
        {/* header  */}
        <CardHeader
          avatar={<Avatar src={userProfilePicUrl} />}
          title={username}
          titleTypographyProps={{ fontSize: 14, fontWeight: "bold" }}
          subheader={userEmail}
          subheaderTypographyProps={{ color: "#adadad8" }}
        />
        {/* Image if exists */}
        {tweetImageUrl && (
          <CardMedia
            component="img"
            height="194"
            image={tweetImageUrl}
            alt="Image tweeted"
          />
        )}
        {/* Tweet Message */}

        <CardContent>
          <Typography variant="subtitle1" color="black">
            {tweetText}
          </Typography>
        </CardContent>
        <CardActions>
          <div className="post-actions">
            <CustomLikeButton
              onClick={handleLikeButtonClick}
              aria-label="like-post"
            >
              <FavoriteSharp color={toggleLike} />
            </CustomLikeButton>
            <IconButton aria-label="comment-post">
              <ChatBubbleOutlineRoundedIcon />
            </IconButton>
            <IconButton aria-label="save-post">
              <BookmarksRoundedIcon />
            </IconButton>
            <IconButton aria-label="share"></IconButton>
          </div>
          x
        </CardActions>
      </Card>
    </div>
  );
};

export default PostCard;
