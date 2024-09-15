import Login from "./login";
import Signup from "./signup";
import { Route, Routes } from "react-router-dom";
import { NonAuthenticatedRoute } from "../../utilities/route-protection";

const AccountRoutes = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <NonAuthenticatedRoute>
            <Login />
          </NonAuthenticatedRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <NonAuthenticatedRoute>
            <Signup />
          </NonAuthenticatedRoute>
        }
      />
    </Routes>
  );
};

export default AccountRoutes;
