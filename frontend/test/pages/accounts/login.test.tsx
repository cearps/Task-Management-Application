import { MemoryRouter } from "react-router-dom";
import Login from "../../../src/pages/accounts/login";
import { render } from "@testing-library/react";

describe("Login", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
  });
});
