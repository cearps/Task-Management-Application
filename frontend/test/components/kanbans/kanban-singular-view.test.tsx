import KanbanSingularView from "../../../src/components/kanbans/kanban-singular-view";
import { render } from "@testing-library/react";

describe("kanbanSingularView", () => {
  it("renders without crashing", () => {
    render(<KanbanSingularView id="0" />);
  });
});
