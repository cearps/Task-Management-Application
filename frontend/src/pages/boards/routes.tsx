import React from "react";
import { Route, Routes } from "react-router-dom";
import KanbanList from "./kanban-list";
import KanbanSingle from "./kanban-single";

const BoardRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<KanbanList />} />
      <Route path=":boardId" element={<KanbanSingle />} />
    </Routes>
  );
};

export default BoardRoutes;
