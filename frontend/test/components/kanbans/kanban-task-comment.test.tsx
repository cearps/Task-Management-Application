import { render } from "@testing-library/react";
import KanbanTaskComment from "../../../src/components/kanbans/kanban-task-comment";
import { Comment } from "../../../src/utilities/types";

describe("KanbanTaskComment", () => {
  it("renders without crashing", () => {
    render(
      <KanbanTaskComment
        comment={
          {
            id: 0,
            comment: "Test Comment",
            user: {
              userId: 0,
              userTag: "Test User",
            },
            timestamp: "2021-10-10",
          } as Comment
        }
      />
    );
  });
});
