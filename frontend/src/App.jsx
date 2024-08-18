import { useState } from "react";
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
function App() {
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
              <Route index path="feed" element={<Feed />} />
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
