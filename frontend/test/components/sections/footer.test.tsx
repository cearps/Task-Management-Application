import Footer from "../../../src/components/sections/footer";
import { render } from "@testing-library/react";

describe("Footer", () => {
  it("renders without crashing", () => {
    render(<Footer />);
  });
});
