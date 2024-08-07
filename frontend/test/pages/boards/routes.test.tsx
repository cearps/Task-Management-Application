import { MemoryRouter } from "react-router-dom";
import BoardRoutes from "../../../src/pages/boards/routes";
import { render } from "@testing-library/react";

describe("BoardRoutes", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <BoardRoutes />
      </MemoryRouter>
    );
  });
});
