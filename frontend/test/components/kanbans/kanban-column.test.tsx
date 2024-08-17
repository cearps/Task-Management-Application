import KanbanColumn from "../../../src/components/kanbans/kanban-column";
import { render } from "@testing-library/react";
import { KanbanBoard, KanbanTask } from "../../../src/utilities/types";

describe("KanbanColumn", () => {
  it("renders without crashing", () => {
    render(
      <KanbanColumn
        title={""}
        taskCategoryId={""}
        kanban={
          {
            tasks: [],
            id: 0,
            name: "",
            description: "",
            startDate: "",
            dueDate: "",
            users: [],
          } as KanbanBoard
        }
        setActiveTaskMethod={(task: KanbanTask) => () => task}
      />
    );
  });
});
