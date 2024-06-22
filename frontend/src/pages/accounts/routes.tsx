import Login from "./login";
import Signup from "./signup";
import { Route, Routes } from "react-router-dom";

const AccountRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

export default AccountRoutes;
