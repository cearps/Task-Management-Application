import { render } from "@testing-library/react";
import KanbanListView from "../../../src/components/kanbans/kanban-list-view";

describe("KanbanListView", () => {
  it("renders without crashing", () => {
    render(<KanbanListView />);
  });
});
