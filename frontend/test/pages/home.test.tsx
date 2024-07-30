import { MemoryRouter } from "react-router-dom";
import Home from "../../src/pages/home";
import { render } from "@testing-library/react";

describe("Home", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
  });
});
