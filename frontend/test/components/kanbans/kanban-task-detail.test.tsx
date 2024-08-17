import DetailedTaskView from "../../../src/components/kanbans/kanban-task-detail";
import { render } from "@testing-library/react";

describe("DetailedTaskView", () => {
  it("renders without crashing", () => {
    render(
      <DetailedTaskView
        task={{
          id: 0,
          name: "",
          description: "",
          dueDate: "",
          urgency: 0,
          taskCategory: 0,
          users: [],
        }}
        onClose={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    );
  });
});
