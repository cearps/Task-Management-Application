import { useState, useEffect } from "react";
import validateUsername from "../../../../../src/components/forms/account-forms/validation/username-validation";
import { render } from "@testing-library/react";

describe("validateUsername", () => {
  let setUsername = jest.fn();

  beforeEach(() => {
    setUsername = jest.fn();
  });

  const TestComponent = ({ username }: { username: string }) => {
    const [usernameErrors, setUsernameErrors] = useState("");
    useEffect(() => {
      validateUsername(username, setUsernameErrors, setUsername);
    }, [username, setUsernameErrors]);
    return <div>{usernameErrors}</div>;
  };

  it("should set an error if the username is empty", () => {
    const { getByText } = render(<TestComponent username="" />);
    expect(getByText("Username is required")).toBeInTheDocument();
  });

  it("should set an error if the username is too short", () => {
    const { getByText } = render(<TestComponent username="aa" />);
    expect(
      getByText("Username must be at least 3 characters")
    ).toBeInTheDocument();
  });
});
