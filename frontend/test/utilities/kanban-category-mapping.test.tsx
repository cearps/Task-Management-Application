import { getTaskStatus } from "../../src/utilities/kanban-category-mapping";

describe("getTaskStatus", () => {
  it("returns the correct status for a task", () => {
    expect(getTaskStatus(1)).toBe("Task Backlog");
  });
});
