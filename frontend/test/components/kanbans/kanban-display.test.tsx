import KanbanDisplay from "../../../src/components/kanbans/kanban-display";
import { KanbanBoard } from "../../../src/utilities/types";

// KanbanDisplay.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import UserAPI from "../../../src/api/userAPI";
import { of } from "rxjs";

// Mock the necessary API modules
jest.mock("../../../src/api/taskAPI");
jest.mock("../../../src/api/userAPI");

const mockKanban: KanbanBoard = {
  id: 1,
  name: "Test Kanban",
  description: "Test Kanban description",
  users: [],
  startDate: "2023-01-01",
  dueDate: "2023-12-31",
  tasks: [
    {
      id: 1,
      name: "Task 1",
      description: "Description 1",
      dueDate: "2023-09-30",
      urgency: 1,
      taskCategory: 1,
      users: [],
      comments: [],
    },
    {
      id: 2,
      name: "Task 2",
      description: "Description 2",
      dueDate: "2023-10-01",
      urgency: 2,
      taskCategory: 2,
      users: [],
      comments: [],
    },
  ],
};

const setKanbanMock = jest.fn();

describe("KanbanDisplay Component", () => {
  beforeEach(() => {
    (UserAPI.getUserObservable as jest.Mock).mockReturnValue(of({}));
    render(<KanbanDisplay kanban={mockKanban} setKanban={setKanbanMock} />);
  });

  it("renders the Kanban board title and task details", () => {
    expect(screen.getByText("Test Kanban")).toBeInTheDocument();
    expect(screen.getByText("START DATE:")).toBeInTheDocument();
    expect(screen.getByText("DUE DATE:")).toBeInTheDocument();
  });

  it("shows the progress bar with calculated progress", async () => {
    const progressBar = screen.getByTestId("progressbar");
    jest.setSystemTime(new Date("2023-01-01")); // Simulate current date
    expect(progressBar).toHaveStyle({ width: "100%" }); // Initial state as per provided dates
  });

  it('opens the task modal when clicking "Add Task"', () => {
    const addTaskButton = screen.getByRole("button", { name: /add task/i });
    fireEvent.click(addTaskButton);

    expect(screen.getAllByText("Add Task")[1]).toBeInTheDocument(); // Ensure AddTaskForm opens
  });
});
