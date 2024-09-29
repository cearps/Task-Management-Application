import KanbanColumn from "../../../src/components/kanbans/kanban-column";
import { KanbanBoard, UserInfo } from "../../../src/utilities/types";

import { render, screen, cleanup } from "@testing-library/react";

const mockKanban: KanbanBoard = {
  // tasks: mockTasks,
  tasks: [],
  id: 1,
  name: "Kanban Board",
  description: "Kanban Board description",
  startDate: "2024-09-01",
  dueDate: "2024-09-30",
  users: [],
};

const mockSetActiveTaskMethod = jest.fn();
const mockCurrentUser: UserInfo | null = null;

describe("KanbanColumn", () => {
  afterEach(cleanup);

  test("renders the KanbanColumn component with the correct title", () => {
    render(
      <KanbanColumn
        title="In Progress"
        taskCategoryId="1"
        kanban={mockKanban}
        setActiveTaskMethod={mockSetActiveTaskMethod}
        currentUser={mockCurrentUser}
        provided={{
          innerRef: null,
          droppableProps: null,
        }}
        snapshot={{ isDraggingOver: false }}
      />
    );

    expect(screen.getByText("In Progress")).toBeInTheDocument();
  });
});
