import Modal from "../../../src/components/modal/modal";
import { render } from "@testing-library/react";

test("renders Modal component", () => {
  const onClose = jest.fn();
  const { getByText } = render(
    <Modal isOpen={true} onClose={onClose}>
      <div>Modal Content</div>
    </Modal>
  );

  const modalContent = getByText("Modal Content");
  expect(modalContent).toBeInTheDocument();
});
