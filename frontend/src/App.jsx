import { useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { ToastContainer, Bounce } from "react-toastify";
import HomePage from "./pages/Home/HomePage";
import Feed from "./pages/Feed/FeedPage";
import Explore from "./pages/Explore/ExplorePage";
import Notifications from "./pages/Notifications/NotificationsPage";
import Messages from "./pages/Messages/MessagesPage";
import BookMarks from "./pages/Bookmarks/BookmarksPage";
import Lists from "./pages/Lists/ListsPage";
import Profiles from "./pages/Profiles/ProfilesPage";
import More from "./pages/More/MorePage";
import ProtectedRoute from "./ProtectedRoute";
import AuthProvider from "./AuthProvider";
import { io } from "socket.io-client";
import PostsProvider, { usePosts } from "../context/PostsProvider";
function App() {
  const [newPostRecieved, setNewPostRecieved] = useState(null);

  const socket = useRef(null); // Use useRef to hold the socket instance

  useEffect(() => {
    if (!socket.current?.id) {
      socket.current = io("https://twitter-x-clone-1.onrender.com");
    }
    console.log(socket.current);
    //  upon connection and reconnection.
    socket.current.on("connect", () => {
      console.log("SOCKET CONNECTION SUCCESS");
      console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    });
    console.log(socket);
    //  upon connection failure.
    socket.current.on("connect_error", (error) => {
      if (socket.active) {
        // temporary failure, the socket will automatically try to reconnect
        console.log("reconnecting socket");
      } else {
        // the connection was denied by the server
        // in that case, `socket.connect()` must be manually called in order to reconnect
        console.log(error.message);
        console.log("Server Denied conn");
      }
    });
    socket.current.on("success", (message) => console.log(message));
    socket.current.on("notify", (post) => {
      setNewPostRecieved(post);
      // make notification Options
      const notificationOptions = {
        body: post.tweetText,
      };
      console.log("Emitted notify event from backend");
      if (post.tweetImageUrl) {
        notificationOptions.icon = post.tweetImageUrl;
      }
      // show actual notification
      new Notification("New Tweet Posted", notificationOptions);
    });

    // Clean up on component unmount
    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, []);
  const postsHook = usePosts();
  console.log(postsHook);
  return (
    <div className="app">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<ProtectedRoute element={<HomePage />} />}
            />
            <Route
              path="home"
              element={<ProtectedRoute element={<HomePage />} />}
            >
              <Route
                index
                path="feed"
                element={
                  <PostsProvider>
                    <Feed />
                  </PostsProvider>
                }
              />
              <Route path="explore" element={<Explore />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="messages" element={<Messages />} />
              <Route path="bookmarks" element={<BookMarks />} />
              <Route path="lists" element={<Lists />} />
              <Route path="profiles" element={<Profiles />} />
              <Route path="more" element={<More />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
