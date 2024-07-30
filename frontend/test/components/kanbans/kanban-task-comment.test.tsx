import { render } from "@testing-library/react";
import KanbanTaskComment from "../../../src/components/kanbans/kanban-task-comment";

describe("KanbanTaskComment", () => {
  it("renders without crashing", () => {
    render(
      <KanbanTaskComment
        comment={{
          id: 0,
          taskId: 0,
          userId: 0,
          content: "",
          createdAt: "",
        }}
      />
    );
  });
});
