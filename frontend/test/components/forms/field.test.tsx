import Field from "../../../src/components/forms/field";
import { render } from "@testing-library/react";

describe("Field", () => {
  it("renders without crashing", () => {
    render(
      <Field
        label={""}
        type={""}
        value={""}
        onChange={() => {}}
        placeholder={""}
        errors={""}
      />
    );
  });
});
