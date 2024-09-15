import KanbanCard from "../../../src/components/kanbans/kanban-task-card";
import { render } from "@testing-library/react";
import { KanbanTask } from "../../../src/utilities/types";

describe("KanbanCard", () => {
  it("renders without crashing", () => {
    render(
      <KanbanCard
        task={{
          id: 0,
          name: "",
          description: "",
          dueDate: "",
          urgency: 0,
          taskCategory: 0,
          users: [],
          comments: [],
        }}
        setActiveTaskMethod={(task: KanbanTask) => () => task}
      />
    );
  });
});
