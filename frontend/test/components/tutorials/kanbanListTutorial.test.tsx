import {
  KanbanListTutorialFirstBoard,
  KanbanListTutorialNoBoard,
} from "../../../src/components/tutorials/kanbanListTutorial";
import { render } from "@testing-library/react";

describe("KanbanListTutorialFirstBoard", () => {
  it("renders without errors", () => {
    render(<KanbanListTutorialFirstBoard />);
  });
});

describe("KanbanListTutorialNoBoard", () => {
  it("renders without errors", () => {
    render(<KanbanListTutorialNoBoard />);
  });
});
