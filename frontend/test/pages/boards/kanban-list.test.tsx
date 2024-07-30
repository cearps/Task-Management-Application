import { MemoryRouter } from "react-router-dom";
import KanbanList from "../../../src/pages/boards/kanban-list";
import { render } from "@testing-library/react";

describe("KanbanList", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <KanbanList />
      </MemoryRouter>
    );
  });
});
