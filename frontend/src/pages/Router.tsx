import { BrowserRouter, Route, Routes } from "react-router-dom";
import AccountRoutes from "./accounts/routes";
import BoardRoutes from "./boards/routes";
import { DecisionRoute } from "../utilities/route-protection";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/accounts/*" element={<AccountRoutes />} />
        <Route path="/boards/*" element={<BoardRoutes />} />
        <Route path="/" element={<DecisionRoute />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
