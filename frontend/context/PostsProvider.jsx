import React, { useEffect, useRef, useState } from "react";
const PostsContext = React.createContext();
export const usePosts = () => {
  return React.useContext(PostsContext);
};
const PostsProvider = ({ children }) => {
  const postsRef = useRef();
  const fetchPosts = async () => {
    try {
      const response = await fetch(
        "https://twitter-x-clone-vksq.onrender.com/post"
      );
      const data = await response.json();
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <PostsContext.Provider value={postsRef.current?.postsArray}>
      {children}
    </PostsContext.Provider>
  );
};

export default PostsProvider;
