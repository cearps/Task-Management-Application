import { useState, useEffect } from "react";
import {
  validatePassword,
  validatePasswordConfirmation,
} from "../../../../../src/components/forms/account-forms/validation/password-validation";
import { render } from "@testing-library/react";

describe("PasswordValidation", () => {
  let setPassword = jest.fn();

  beforeEach(() => {
    setPassword = jest.fn();
  });

  const TestComponent = ({
    password,
    passwordConfirmation,
  }: {
    password: string;
    passwordConfirmation: string;
  }) => {
    const [passwordErrors, setPasswordErrors] = useState("");
    const [passwordConfirmationErrors, setPasswordConfirmationErrors] =
      useState("");

    useEffect(() => {
      validatePassword(password, setPasswordErrors, setPassword);
      validatePasswordConfirmation(
        password,
        passwordConfirmation,
        setPasswordConfirmationErrors,
        setPassword
      );
    }, [password, passwordConfirmation]);

    return (
      <div>
        {passwordErrors}
        {passwordConfirmationErrors}
      </div>
    );
  };

  it("should set an error if the password is empty", () => {
    const { getByText } = render(
      <TestComponent password="" passwordConfirmation="" />
    );
    expect(getByText(/Password is required/)).toBeInTheDocument();
  });

  it("should set an error if the password is too short", () => {
    const { getByText } = render(
      <TestComponent password="short" passwordConfirmation="short" />
    );
    expect(
      getByText(/Password must be at least 8 characters/)
    ).toBeInTheDocument();
  });

  it("should set an error if the password does not contain a lowercase letter", () => {
    const { getByText } = render(
      <TestComponent password="PASSWORD" passwordConfirmation="PASSWORD" />
    );
    expect(
      getByText(/Password must contain at least one lowercase letter/)
    ).toBeInTheDocument();
  });

  it("should set an error if the password does not contain an uppercase letter", () => {
    const { getByText } = render(
      <TestComponent password="password" passwordConfirmation="password" />
    );
    expect(
      getByText(/Password must contain at least one uppercase letter/)
    ).toBeInTheDocument();
  });

  it("should set an error if the password does not contain a number", () => {
    const { getByText } = render(
      <TestComponent password="Password" passwordConfirmation="Password" />
    );
    expect(
      getByText(/Password must contain at least one number/)
    ).toBeInTheDocument();
  });

  it("should set an error if the password does not contain a special character", () => {
    const { getByText } = render(
      <TestComponent password="Password1" passwordConfirmation="Password1" />
    );
    expect(
      getByText(/Password must contain at least one special character/)
    ).toBeInTheDocument();
  });

  it("should set an error if the password confirmation is empty", () => {
    const { getByText } = render(
      <TestComponent password="Password1!" passwordConfirmation="" />
    );
    expect(getByText(/Password Confirmation is required/)).toBeInTheDocument();
  });

  it("should set an error if the password and password confirmation do not match", () => {
    const { getByText } = render(
      <TestComponent password="Password1!" passwordConfirmation="Password2!" />
    );
    expect(getByText(/Passwords do not match/)).toBeInTheDocument();
  });

  it("should not set an error if the password and password confirmation match", () => {
    const { queryByText } = render(
      <TestComponent password="Password1!" passwordConfirmation="Password1!" />
    );
    expect(queryByText(/Password is required/)).not.toBeInTheDocument();
    expect(
      queryByText(/Password must be at least 8 characters/)
    ).not.toBeInTheDocument();
    expect(
      queryByText(/Password must contain at least one lowercase letter/)
    ).not.toBeInTheDocument();
    expect(
      queryByText(/Password must contain at least one uppercase letter/)
    ).not.toBeInTheDocument();
    expect(
      queryByText(/Password must contain at least one number/)
    ).not.toBeInTheDocument();
    expect(
      queryByText(/Password must contain at least one special character/)
    ).not.toBeInTheDocument();
    expect(
      queryByText(/Password Confirmation is required/)
    ).not.toBeInTheDocument();
    expect(queryByText(/Passwords do not match/)).not.toBeInTheDocument();
  });
});
