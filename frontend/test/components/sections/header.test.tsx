import { MemoryRouter } from "react-router-dom";
import Header from "../../../src/components/sections/header";
import { render } from "@testing-library/react";

describe("Header", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
  });
});
