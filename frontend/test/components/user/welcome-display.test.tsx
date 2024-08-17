import { MemoryRouter } from "react-router-dom";
import WelcomeDisplay from "../../../src/components/user/welcome-display";
import { render } from "@testing-library/react";

describe("WelcomeDisplay", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <WelcomeDisplay />
      </MemoryRouter>
    );
  });
});
