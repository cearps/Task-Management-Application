// PrivateRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import UserAPI from "../api/userAPI";

interface PrivateRouteProps {
  children: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const isAuthenticated = UserAPI.isAuthenticated();

  return isAuthenticated ? children : <Navigate to="/accounts/login" replace />;
};

export default PrivateRoute;
