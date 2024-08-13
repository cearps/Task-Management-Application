import FormBase from "../../../src/components/forms/form-base";
import { render } from "@testing-library/react";

describe("FormBase", () => {
  it("renders without crashing", () => {
    render(<FormBase onSubmit={() => {}} children={undefined} />);
  });
});
