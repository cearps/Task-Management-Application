import KanbanDisplay from "../../../src/components/kanbans/kanban-display";
import { render } from "@testing-library/react";

describe("KanbanDisplay", () => {
  it("renders without crashing", () => {
    render(
      <KanbanDisplay
        kanban={{
          id: 0,
          name: "",
          description: "",
          startDate: "",
          dueDate: "",
          userIds: [],
          tasks: [],
        }}
      />
    );
  });
});
