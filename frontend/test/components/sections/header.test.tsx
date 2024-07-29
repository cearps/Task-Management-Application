import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Home from "../../../src/pages/home";

describe("Header", () => {
  it("should render the header", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    const header = screen.getByRole("banner");
    expect(header).toBeInTheDocument();
  });
});
