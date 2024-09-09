import { render } from "@testing-library/react";
import AddBoardForm from "../../../src/components/forms/add-board-form";

describe("AddBoardForm", () => {
  test("renders without crashing", () => {
    render(
      <AddBoardForm isOpen={true} onClose={() => {}} onSubmit={() => {}} />
    );
  });
});
