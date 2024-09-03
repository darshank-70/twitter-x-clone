import React, { useRef, useState } from "react";
import PostCard from "../../components/PostCard";
import { Button } from "@mui/material";
import axios from "axios";
import "./explore.css";
import ShimmerPostCard from "../../components/ShimmerPostCard";

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState(null);
  const searchInputRef = useRef();
  const [searchedPosts, setSearchedPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const searchButtonClicked = async (e) => {
    setError(false);
    e.preventDefault();
    setIsLoading(true);
    setSearchQuery(searchInputRef.current.value);

    try {
      const response = await axios.post(
        "https://twitter-x-clone-1.onrender.com/search",
        {
          query: searchQuery,
        }
      );
      const { keyPosts } = response.data;
      console.log(response);
      console.log(searchQuery);
      setSearchedPosts(keyPosts.reverse());
      if (keyPosts.length == 0)
        setError(`could not find posts related to ${searchQuery} `);
    } catch (error) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="explore-page">
      search results
      <div className="searchbar-container">
        <form onSubmit={searchButtonClicked}>
          <input
            className="chatbot-input"
            type="text"
            ref={searchInputRef}
            placeholder="Search X"
            onChange={(e) => setSearchQuery(e.target.value)}
            required
          />
          <Button
            type="submit"
            disabled={isLoading || !searchQuery}
            onClick={searchButtonClicked}
            variant="contained"
            value={searchQuery}
          >
            Search
          </Button>
        </form>
      </div>
      <div className="searched-posts-container">
        <div className="posts-tweeted">
          {isLoading && [1, 2, 3].map((item) => <ShimmerPostCard key={item} />)}
          {error && <h2>Could not find any posts related to {searchQuery}</h2>}
          {!error && searchedPosts && (
            <h2>results for your Search on {searchQuery}</h2>
          )}
          {!error &&
            searchedPosts &&
            searchedPosts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Explore;
