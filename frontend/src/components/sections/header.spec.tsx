import { render, screen } from "@testing-library/react";
import Home from "../../pages/home";
import { MemoryRouter } from "react-router";

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
