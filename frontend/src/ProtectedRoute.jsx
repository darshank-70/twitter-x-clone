import React, { useState } from "react";
import { useAuth } from "./AuthProvider";
import { Navigate } from "react-router-dom";
const ProtectedRoute = ({ element: Element, ...rest }) => {
  const [authUser, setAuthUser] = useState(null);
  const { currentAuthUser } = useAuth();  
  return currentAuthUser ? Element : <Navigate to={"/login"} replace />;
};

export default ProtectedRoute;
