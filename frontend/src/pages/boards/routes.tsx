import { Route, Routes } from "react-router-dom";
import KanbanList from "./kanban-list";
import KanbanSingle from "./kanban-single";
import PrivateRoute from "../../utilities/route-protection";

const BoardRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute children={<KanbanList />} />} />
      <Route
        path=":boardId"
        element={<PrivateRoute children={<KanbanSingle />} />}
      />
    </Routes>
  );
};

export default BoardRoutes;
