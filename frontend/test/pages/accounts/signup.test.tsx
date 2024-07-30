import { MemoryRouter } from "react-router-dom";
import SignUp from "../../../src/pages/accounts/signup";
import { render } from "@testing-library/react";

describe("SignUp", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );
  });
});
