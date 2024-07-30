import Router from "../../src/pages/Router";
import { render } from "@testing-library/react";

describe("Router", () => {
  it("renders without crashing", () => {
    render(<Router />);
  });
});
