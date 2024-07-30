import { MemoryRouter } from "react-router-dom";
import Base from "../../../src/components/sections/base";
import { render } from "@testing-library/react";

describe("Base", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <Base pageTitle={""}>
          <h1>Test</h1>
        </Base>
      </MemoryRouter>
    );
  });
});
