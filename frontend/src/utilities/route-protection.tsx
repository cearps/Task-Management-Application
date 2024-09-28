// PrivateRoute.tsx
import React, { useEffect } from "react";
import UserAPI from "../api/userAPI";

interface RouteProps {
  children: React.ReactElement;
}

const PrivateRoute: React.FC<RouteProps> = ({ children }) => {
  useEffect(() => {
    const subscription = UserAPI.subscribeIsAuthenticated();
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return children;
};

const NonAuthenticatedRoute: React.FC<RouteProps> = ({ children }) => {
  useEffect(() => {
    const subscription = UserAPI.subscribeIsNotAuthenticated();
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return children;
};

const DecisionRoute: React.FC = () => {
  useEffect(() => {
    const subscription = UserAPI.subscribeIsAuthenticatedDecision();
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return null;
};

export { PrivateRoute, NonAuthenticatedRoute, DecisionRoute };
