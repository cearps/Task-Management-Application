import KanbanColumn from "../../../src/components/kanbans/kanban-column";
import { render } from "@testing-library/react";
import { Task } from "../../../src/utilities/types";

describe("KanbanColumn", () => {
  it("renders without crashing", () => {
    render(
      <KanbanColumn
        title={""}
        taskCategoryId={""}
        kanbanId={""}
        setActiveTaskMethod={(task: Task) => () => task}
      />
    );
  });
});
