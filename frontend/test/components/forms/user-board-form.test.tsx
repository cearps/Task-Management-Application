import { render, screen, fireEvent } from "@testing-library/react";
import UserBoardForm from "../../../src/components/forms/user-board-form";
import { KanbanBoard, UserInfo } from "../../../src/utilities/types";
import UserAPI from "../../../src/api/userAPI";
import { of } from "rxjs"; // Mock observable

jest.mock("../../../src/api/userAPI", () => ({
  getUserObservable: jest.fn(),
}));

// Sample data for tests
const mockBoard: KanbanBoard = {
  id: 1,
  name: "Test Board",
  users: [
    { id: 1, userTag: "User1" },
    { id: 2, userTag: "User2" },
  ],
  tasks: [],
  description: "Test Description",
  dueDate: "",
  startDate: "",
};

const currentUser: UserInfo = {
  id: 1,
  userTag: "User1",
};

// Mock props
const mockProps = {
  onClose: jest.fn(),
  onSubmit: jest.fn(),
  errors: null,
  board: mockBoard,
};

describe("UserBoardForm", () => {
  beforeEach(() => {
    // Mocking the observable user API
    (UserAPI.getUserObservable as jest.Mock).mockReturnValue(of(currentUser));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the component with initial data", () => {
    render(<UserBoardForm {...mockProps} />);

    expect(screen.getByText("Update Board Users")).toBeInTheDocument();
    expect(screen.getByText("Board Name: Test Board")).toBeInTheDocument();
    expect(screen.getByText("User1")).toBeInTheDocument();
    expect(screen.getByText("User2")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter user tag")).toBeInTheDocument();
  });

  it("calls onClose when clicking outside the modal", () => {
    const { container } = render(<UserBoardForm {...mockProps} />);

    fireEvent.mouseDown(container);

    expect(mockProps.onClose).toHaveBeenCalledTimes(1);
  });

  it("updates userTag state on input change", () => {
    render(<UserBoardForm {...mockProps} />);

    const input = screen.getByPlaceholderText("Enter user tag");
    fireEvent.change(input, { target: { value: "NewUser" } });

    expect(input).toHaveValue("NewUser");
  });

  it("calls onSubmit when a new user is added", () => {
    render(<UserBoardForm {...mockProps} />);

    const input = screen.getByPlaceholderText("Enter user tag");
    fireEvent.change(input, { target: { value: "NewUser" } });

    const addUserButton = screen.getByRole("button", { name: /add user/i });
    fireEvent.click(addUserButton);

    expect(mockProps.onSubmit).toHaveBeenCalledWith({
      ...mockBoard,
      users: [...mockBoard.users, { id: 1, userTag: "NewUser" }],
    });
  });

  it("calls onSubmit when a user is removed", () => {
    render(<UserBoardForm {...mockProps} />);

    const deleteUserButton = screen.getByText("Delete User");
    fireEvent.click(deleteUserButton);

    expect(mockProps.onSubmit).toHaveBeenCalledWith({
      ...mockBoard,
      users: [{ id: 1, userTag: "User1" }],
    });
  });

  it("does not show the delete button for the current user", () => {
    render(<UserBoardForm {...mockProps} />);

    const deleteButtons = screen.getAllByText("Delete User");
    expect(deleteButtons).toHaveLength(1); // Only one button for non-current user (User2)
  });

  it("displays error messages when errors prop is passed", () => {
    render(<UserBoardForm {...mockProps} errors="User tag is required" />);

    expect(screen.getByText("User tag is required")).toBeInTheDocument();
  });
});
