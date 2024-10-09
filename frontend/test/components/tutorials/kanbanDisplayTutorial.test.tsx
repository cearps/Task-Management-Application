import { KanbanDisplayTutorialNoTask } from "../../../src/components/tutorials/kanbanDisplayTutorial";
import { render } from "@testing-library/react";

describe("KanbanDisplayTutorialNoTask", () => {
  it("renders without errors", () => {
    render(<KanbanDisplayTutorialNoTask />);
  });
});
