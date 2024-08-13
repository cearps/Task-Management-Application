import Button from "../../../src/components/buttons/button";
import { render } from "@testing-library/react";

describe("Button", () => {
  it("renders without crashing", () => {
    render(<Button type={"button"} children={undefined} />);
  });
});
