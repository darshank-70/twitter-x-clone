import React from "react";
import { TwitterTimelineEmbed, TwitterTweetEmbed } from "react-twitter-embed";
const Widgets = () => {
  return (
    <div className={"widgets-container"}>
      <div className="widgets-input-search">
        <input type="text" name="" placeholder="Search Twitter" />
      </div>
      <h2>What's Happening?</h2>
      <TwitterTweetEmbed tweetId="1557187138352861186" />
      <TwitterTimelineEmbed
        sourceType="profile"
        screenName="elonmusk"
        options={{ height: 455 }}
      />
    </div>
  );
};

export default Widgets;
