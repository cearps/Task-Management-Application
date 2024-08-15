import { useState, useEffect } from "react";
import validateEmail from "../../../../../src/components/forms/account-forms/validation/email-validation";
import { render } from "@testing-library/react";

describe("Email Validation", () => {
  let setEmail = jest.fn();

  beforeEach(() => {
    setEmail = jest.fn();
  });

  const TestComponent = ({ email }: { email: string }) => {
    const [emailErrors, setEmailErrors] = useState("");
    useEffect(() => {
      validateEmail(email, setEmailErrors, setEmail);
    }, [email, setEmailErrors]);

    return <div>{emailErrors}</div>;
  };

  it("should set an error if the email is empty", () => {
    const { getByText } = render(<TestComponent email="" />);
    expect(getByText("Email is required")).toBeInTheDocument();
  });

  it("should set an error if the email is invalid", () => {
    const { getByText } = render(<TestComponent email="invalid" />);
    expect(getByText("Email is invalid")).toBeInTheDocument();
  });

  it("should not set an error if the email is valid", () => {
    const { queryByText } = render(<TestComponent email="valid@example.com" />);
    expect(queryByText("Email is required")).not.toBeInTheDocument();
    expect(queryByText("Email is invalid")).not.toBeInTheDocument();
  });
});
