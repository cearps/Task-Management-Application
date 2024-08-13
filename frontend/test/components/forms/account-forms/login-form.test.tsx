import LogInForm from "../../../../src/components/forms/account-forms/login-form";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

describe("LogInForm", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <LogInForm />
      </MemoryRouter>
    );
  });
});
