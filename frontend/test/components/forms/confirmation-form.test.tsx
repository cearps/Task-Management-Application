import ConfirmationModal from "../../../src/components/forms/confirmation-form";
import { render, screen, fireEvent } from "@testing-library/react";

// Mock props for the modal
const defaultProps = {
  isOpen: true,
  message: "Are you sure?",
  onConfirm: jest.fn(),
  onCancel: jest.fn(),
};

describe("ConfirmationModal", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  it("does not render when isOpen is false", () => {
    render(
      <ConfirmationModal
        {...defaultProps}
        isOpen={false} // Pass isOpen as false
      />
    );

    // Modal should not be in the document
    expect(screen.queryByText("Are you sure?")).not.toBeInTheDocument();
  });

  it("renders correctly when isOpen is true", () => {
    render(<ConfirmationModal {...defaultProps} />);

    // Modal should render with correct message and buttons
    expect(screen.getByText("Are you sure?")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Confirm")).toBeInTheDocument();
  });

  it("calls onCancel when clicking outside the modal", () => {
    const { container } = render(<ConfirmationModal {...defaultProps} />);

    // Simulate clicking outside the modal
    fireEvent.mouseDown(container);

    // Expect onCancel to be called
    expect(defaultProps.onCancel).toHaveBeenCalledTimes(1);
  });

  it("calls onCancel when clicking the 'Cancel' button", () => {
    render(<ConfirmationModal {...defaultProps} />);

    // Simulate clicking the 'Cancel' button
    fireEvent.click(screen.getByText("Cancel"));

    // Expect onCancel to be called
    expect(defaultProps.onCancel).toHaveBeenCalledTimes(1);
  });

  it("calls onConfirm when clicking the 'Confirm' button", () => {
    render(<ConfirmationModal {...defaultProps} />);

    // Simulate clicking the 'Confirm' button
    fireEvent.click(screen.getByText("Confirm"));

    // Expect onConfirm to be called
    expect(defaultProps.onConfirm).toHaveBeenCalledTimes(1);
  });
});
