import { MemoryRouter } from "react-router-dom";
import KanbanSingle from "../../../src/pages/boards/kanban-single";
import { render } from "@testing-library/react";

describe("KanbanSingle", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <KanbanSingle />
      </MemoryRouter>
    );
  });
});
