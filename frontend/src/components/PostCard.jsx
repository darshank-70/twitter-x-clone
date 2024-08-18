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
} from "@mui/material";
import React from "react";
import BookmarksRoundedIcon from "@mui/icons-material/BookmarksRounded";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
const PostCard = ({ post, key }) => {
  const { tweetText, tweetImageUrl, username, userEmail, userProfilePicUrl } =
    post;
  return (
    <div key={key}>
      <Card sx={{ padding: 5, marginTop: 2 }}>
        {/* header  */}
        <CardHeader
          avatar={<Avatar src={userProfilePicUrl} />}
          title={username}
          subheader={userEmail}
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
          <Typography variant="body2" color="text.secondary">
            {tweetText}
          </Typography>
        </CardContent>
        <CardActions>
          <div className="post-actions">
            <IconButton aria-label="like-post">
              <FavoriteSharp />
            </IconButton>
            <IconButton aria-label="comment-post">
              <ChatBubbleOutlineRoundedIcon />
            </IconButton>
            <IconButton aria-label="save-post">
              <BookmarksRoundedIcon />
            </IconButton>
            <IconButton aria-label="share"></IconButton>
          </div>
        </CardActions>
      </Card>
    </div>
  );
};

export default PostCard;
