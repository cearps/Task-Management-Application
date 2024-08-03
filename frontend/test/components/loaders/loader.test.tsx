import Loader from "../../../src/components/loaders/loader";
import { render } from "@testing-library/react";

describe("Loader", () => {
  it("renders without crashing", () => {
    render(<Loader />);
  });
});
