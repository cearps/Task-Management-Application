import SignUpForm from "../../../../src/components/forms/account-forms/signup-form";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

describe("SignUpForm", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <SignUpForm />
      </MemoryRouter>
    );
  });
});
