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
          comments: [],
          index: 0,
        }}
        addComment={function (comment: string, taskId: number): void {
          console.log(comment, taskId);
        }}
        onClose={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    );
  });
});
