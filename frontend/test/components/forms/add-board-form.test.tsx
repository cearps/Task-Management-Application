import { render, screen, fireEvent } from "@testing-library/react";
import AddBoardForm from "../../../src/components/forms/add-board-form";

// Mock Button component to focus on AddBoardForm behavior
jest.mock(
  "../../../src/components/buttons/button",
  () =>
    ({ children, ...props }: any) =>
      <button {...props}>{children}</button>
);

describe("AddBoardForm Component", () => {
  const defaultProps = {
    onClose: jest.fn(),
    onSubmit: jest.fn(),
    errors: undefined,
    defaultValues: undefined,
  };

  const setup = (props = {}) => {
    return render(<AddBoardForm {...defaultProps} {...props} />);
  };

  test("renders form with empty inputs by default", () => {
    setup();
    expect(screen.getByPlaceholderText(/enter board name/i)).toHaveValue("");
    expect(screen.getByLabelText(/due date/i)).toHaveValue("");
    expect(
      screen.getByRole("heading", { name: /create new board/i })
    ).toBeInTheDocument();
  });

  test("renders form with default values if provided", () => {
    const defaultValues = {
      name: "Test Board",
      dueDate: "2023-12-31",
    };
    setup({ defaultValues });

    expect(screen.getByPlaceholderText(/enter board name/i)).toHaveValue(
      "Test Board"
    );
    expect(screen.getByLabelText(/due date/i)).toHaveValue("2023-12-31");
    expect(
      screen.getByRole("heading", { name: /edit board/i })
    ).toBeInTheDocument();
  });

  test("calls onSubmit with form values when submitted", () => {
    setup();

    fireEvent.change(screen.getByPlaceholderText(/enter board name/i), {
      target: { value: "New Board" },
    });
    fireEvent.change(screen.getByLabelText(/due date/i), {
      target: { value: "2023-11-20" },
    });

    fireEvent.click(screen.getByRole("button", { name: /create board/i }));

    expect(defaultProps.onSubmit).toHaveBeenCalledWith(
      "New Board",
      "2023-11-20"
    );
  });

  test("calls onClose when cancel button is clicked", () => {
    setup();

    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));

    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  test("displays errors if provided", () => {
    setup({ errors: "An error occurred" });

    expect(screen.getByText(/an error occurred/i)).toBeInTheDocument();
  });

  test("calls onClose when clicking outside the form", () => {
    setup();

    // Simulate clicking outside the form
    fireEvent.mouseDown(document);

    expect(defaultProps.onClose).toHaveBeenCalled();
  });
});
