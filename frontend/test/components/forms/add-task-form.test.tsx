import AddTaskForm from "../../../src/components/forms/add-task-form";

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { KanbanBoard, UserInfo } from "../../../src/utilities/types";

const originalError = console.error;

beforeAll(() => {
  // Suppress specific warning message in tests
  jest.spyOn(console, "error").mockImplementation((message) => {
    if (
      message.includes(
        "Support for defaultProps will be removed from memo components"
      ) ||
      message.includes(
        'Warning: Each child in a list should have a unique "key" prop.'
      )
    ) {
      return;
    }
    originalError(message);
  });
});

// Mock the react-select component
jest.mock("react-select", () => (props: any) => {
  const { options, isMulti, onChange } = props;

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(event.target.selectedOptions).map(
      (option) => ({
        value: option.value,
        label: option.label,
      })
    );
    onChange(isMulti ? selectedOptions : selectedOptions[0]);
  };

  return (
    <select multiple={isMulti} onChange={handleChange}>
      {options.map((option: any) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
});

describe("AddTaskForm", () => {
  const board: KanbanBoard = {
    id: 1,
    name: "Test Board",
    users: [
      { id: 1, userTag: "user1" },
      { id: 2, userTag: "user2" },
    ] as UserInfo[],
    tasks: [],
    description: "Test Description",
    dueDate: "",
    startDate: "",
  };

  const onSubmit = jest.fn();
  const onClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the form and inputs", () => {
    render(<AddTaskForm board={board} onClose={onClose} onSubmit={onSubmit} />);

    expect(screen.getAllByText("Add Task")[0]).toBeInTheDocument();
    expect(screen.getByLabelText("Task Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Description")).toBeInTheDocument();
    expect(screen.getByLabelText("Due Date")).toBeInTheDocument();
    expect(screen.getByLabelText("Urgency")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Add Task" })
    ).toBeInTheDocument();
  });

  test("validates and submits form", async () => {
    render(<AddTaskForm board={board} onClose={onClose} onSubmit={onSubmit} />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText("Task Name"), {
      target: { value: "New Task" },
    });
    fireEvent.change(screen.getByLabelText("Description"), {
      target: { value: "Task description" },
    });
    fireEvent.change(screen.getByLabelText("Due Date"), {
      target: { value: "2024-12-01" },
    });
    fireEvent.change(screen.getByLabelText("Urgency"), {
      target: { value: "1" },
    });

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: "Add Task" }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(expect.any(Object));
    });
  });

  test("calls onClose when clicking outside the form", () => {
    render(<AddTaskForm board={board} onClose={onClose} onSubmit={onSubmit} />);

    // Simulate a click outside the form
    fireEvent.mouseDown(document);

    expect(onClose).toHaveBeenCalled();
  });

  test("closes the form when clicking cancel", () => {
    render(<AddTaskForm board={board} onClose={onClose} onSubmit={onSubmit} />);

    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));

    expect(onClose).toHaveBeenCalled();
  });

  test("does not submit the form if required fields are missing", async () => {
    render(<AddTaskForm board={board} onClose={onClose} onSubmit={onSubmit} />);

    // Try to submit without filling the form
    fireEvent.click(screen.getByRole("button", { name: "Add Task" }));

    await waitFor(() => {
      expect(onSubmit).not.toHaveBeenCalled();
    });
  });
});
