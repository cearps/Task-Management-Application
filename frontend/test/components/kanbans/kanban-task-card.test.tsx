import KanbanCard from "../../../src/components/kanbans/kanban-task-card";
import { render } from "@testing-library/react";
import { Task } from "../../../src/utilities/types";

describe("KanbanCard", () => {
  it("renders without crashing", () => {
    render(
      <KanbanCard
        task={{
          id: 0,
          boardId: 0,
          name: "",
          description: "",
          dueDate: "",
          urgency: 0,
          taskCategoryId: 0,
        }}
        setActiveTaskMethod={(task: Task) => () => task}
      />
    );
  });
});
