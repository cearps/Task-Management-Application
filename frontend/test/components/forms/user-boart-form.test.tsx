import UserBoardForm from "../../../src/components/forms/user-board-form";
import { render } from "@testing-library/react";

describe("UserBoardForm", () => {
  test("renders without crashing", () => {
    render(
      <UserBoardForm
        onClose={() => {}}
        onSubmit={() => {}}
        errors={null}
        board={{
          id: 1,
          name: "Test",
          dueDate: "2022-12-12",
          startDate: "2022-12-12",
          description: "Test",
          users: [],
          tasks: [],
        }}
      />
    );
  });
});
