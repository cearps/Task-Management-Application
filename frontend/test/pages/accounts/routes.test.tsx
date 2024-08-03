import { MemoryRouter } from "react-router-dom";
import AccountRoutes from "../../../src/pages/accounts/routes";
import { render } from "@testing-library/react";

describe("AccountRoutes", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <AccountRoutes />
      </MemoryRouter>
    );
  });
});
