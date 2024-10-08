import React, { useEffect, useState } from "react";
import TweetBox from "../../components/TweetBox";
import { useScrollTrigger } from "@mui/material";
import axios from "axios";
import PostCard from "../../components/PostCard";

const Feed = () => {
  const [postsArray, setPostsArray] = useState(null);
  const fetchPosts = async () => {
    try {
      const response = await fetch(
        "https://twitter-x-clone-vksq.onrender.com/post"
      );
      const data = await response.json();
      setPostsArray(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []); // Empty dependency array ensures fetching on initial render

  const handleNewTweet = async () => {
    await fetchPosts(); // Re-fetch posts after a new tweet
  };

  return (
    <div className="feed-page">
      <TweetBox onNewTweet={handleNewTweet} />

      <div className="posts-tweeted">
        {postsArray &&
          postsArray.map((post) => <PostCard key={post._id} post={post} />)}
      </div>
    </div>
  );
};

export default Feed;
