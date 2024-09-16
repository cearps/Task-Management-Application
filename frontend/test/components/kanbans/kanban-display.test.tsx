import KanbanDisplay from "../../../src/components/kanbans/kanban-display";
import { render } from "@testing-library/react";
import { KanbanBoard } from "../../../src/utilities/types";

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
          users: [],
          tasks: [],
        }}
        setKanban={(kanban: KanbanBoard) => {
          console.log(kanban);
        }}
      />
    );
  });
});
