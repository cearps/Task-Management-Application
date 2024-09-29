import { render, screen, fireEvent } from "@testing-library/react";
import DetailedTaskView from "../../../src/components/kanbans/kanban-task-detail";
import { KanbanBoard, KanbanTask } from "../../../src/utilities/types";

describe("DetailedTaskView", () => {
  const mockTask: KanbanTask = {
    id: 1,
    name: "Test Task",
    description: "This is a test task.",
    dueDate: "2024-09-30",
    urgency: 1,
    taskCategory: 2,
    users: [{ id: 1, userTag: "User One" }],
    comments: [
      {
        id: 1,
        comment: "First comment",
        user: { userId: 1, userTag: "User One" },
        timestamp: "2024-09-01",
      },
    ],
  };

  const mockBoard: KanbanBoard = {
    id: 1,
    name: "Test Board",
    description: "This is a test board.",
    startDate: "2024-09-01",
    dueDate: "2024-09-30",
    users: [{ id: 1, userTag: "User One" }],
    tasks: [mockTask],
  };

  const addComment = jest.fn();
  const onClose = jest.fn();
  const onDeleteTask = jest.fn();

  beforeEach(() => {
    render(
      <DetailedTaskView
        task={mockTask}
        board={mockBoard}
        addComment={addComment}
        onClose={onClose}
        onDeleteTask={onDeleteTask}
      />
    );
  });

  it("renders without crashing", () => {
    render(
      <DetailedTaskView
        task={mockTask}
        board={mockBoard}
        addComment={addComment}
        onClose={onClose}
        onDeleteTask={onDeleteTask}
      />
    );
    expect(screen.getAllByText("Test Task")[0]).toBeInTheDocument();
  });

  it("displays task details correctly", () => {
    render(
      <DetailedTaskView
        task={mockTask}
        board={mockBoard}
        addComment={addComment}
        onClose={onClose}
        onDeleteTask={onDeleteTask}
      />
    );
    expect(screen.getAllByText("This is a test task.")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Due date:")[0]).toBeInTheDocument();
    expect(screen.getAllByText("2024-09-30")[0]).toBeInTheDocument();
    expect(screen.getAllByText("User One")[0]).toBeInTheDocument();
  });

  it("allows editing the task name", () => {
    render(
      <DetailedTaskView
        task={mockTask}
        board={mockBoard}
        addComment={addComment}
        onClose={onClose}
        onDeleteTask={onDeleteTask}
      />
    );

    fireEvent.click(screen.getAllByText("Edit Task")[0]);
    const input = screen.getByDisplayValue("Test Task");
    fireEvent.change(input, { target: { value: "Updated Task" } });
    fireEvent.click(screen.getByText("Save"));
  });

  it("calls onDeleteTask when delete button is clicked", () => {
    render(
      <DetailedTaskView
        task={mockTask}
        board={mockBoard}
        addComment={addComment}
        onClose={onClose}
        onDeleteTask={onDeleteTask}
      />
    );

    fireEvent.click(screen.getAllByText("Delete Task")[0]);
    expect(onDeleteTask).toHaveBeenCalledWith(mockTask.id);
  });

  it("adds a comment when the comment button is clicked", () => {
    render(
      <DetailedTaskView
        task={mockTask}
        board={mockBoard}
        addComment={addComment}
        onClose={onClose}
        onDeleteTask={onDeleteTask}
      />
    );

    const commentInput =
      screen.getAllByPlaceholderText("Leave a comment...")[0];
    fireEvent.change(commentInput, { target: { value: "New Comment" } });
    fireEvent.click(screen.getAllByText("Comment")[0]);

    expect(addComment).toHaveBeenCalledWith("New Comment", mockTask.id);
  });

  it("renders without crashing and displays task details", () => {
    expect(screen.getAllByText("Test Task")[0]).toBeInTheDocument();
    expect(screen.getByText("Due date:")).toBeInTheDocument();
    expect(screen.getByText("Urgency:")).toBeInTheDocument();
    expect(screen.getByText("Assigned to:")).toBeInTheDocument();
    expect(screen.getByText("First comment")).toBeInTheDocument();
  });

  it("allows editing the task name", () => {
    fireEvent.click(screen.getByText("Edit Task"));
    const input = screen.getByDisplayValue("Test Task");
    fireEvent.change(input, { target: { value: "Updated Task" } });
    fireEvent.click(screen.getByText("Save"));
  });

  it("calls onDeleteTask when Delete Task button is clicked", () => {
    fireEvent.click(screen.getByText("Delete Task"));
    expect(onDeleteTask).toHaveBeenCalledWith(mockTask.id);
  });

  it("allows adding a comment", () => {
    const commentInput = screen.getByPlaceholderText("Leave a comment...");
    fireEvent.change(commentInput, { target: { value: "New comment" } });
    fireEvent.click(screen.getByText("Comment"));
    expect(addComment).toHaveBeenCalledWith("New comment", mockTask.id);
  });

  it("does not close when clicking inside the task card", () => {
    const card = screen.getAllByText("Assigned to:")[0];
    fireEvent.click(card);
    expect(onClose).not.toHaveBeenCalled();
  });
});
