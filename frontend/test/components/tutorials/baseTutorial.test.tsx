import { render } from "@testing-library/react";
import { BaseTutorial } from "../../../src/components/tutorials/baseTutorial";

describe("BaseTutorial", () => {
  it("renders without errors", () => {
    render(<BaseTutorial steps={[]} />);
  });
});
