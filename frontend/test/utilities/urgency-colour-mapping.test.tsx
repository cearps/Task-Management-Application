import urgencyToColour from "../../src/utilities/urgency-colour-mapping";

describe("urgencyToColour", () => {
  it("returns the correct colour for an urgency value", () => {
    expect(urgencyToColour(1)).toBe("bg-red-500");
    expect(urgencyToColour(2)).toBe("bg-yellow-500");
    expect(urgencyToColour(3)).toBe("bg-green-500");
    expect(urgencyToColour(4)).toBe("bg-gray-500");
  });
});
