import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AccountRoutes from "./accounts/routes";
import BoardRoutes from "./boards/routes";
import Home from "./home";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/accounts/*" element={<AccountRoutes />} />
        <Route path="/boards/*" element={<BoardRoutes />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
