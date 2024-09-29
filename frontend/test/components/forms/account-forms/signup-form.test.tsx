import SignUpForm from "../../../../src/components/forms/account-forms/signup-form";

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import UserAPI from "../../../../src/api/userAPI";
import { BrowserRouter } from "react-router-dom";
import { SignUpResponse } from "../../../../src/utilities/types";
import { of } from "rxjs";

// Mock the API call to prevent real API requests during tests
jest.mock("../../../../src/api/userAPI");

const signUpResponse: SignUpResponse = {
  fullName: "Test User",
  email: "test@test.com",
  id: 1,
  enabled: true,
  username: "testuser",
  credentialsNonExpired: true,
  accountNonExpired: true,
  accountNonLocked: true,
  authorities: [],
};

describe("SignUpForm", () => {
  const setup = () =>
    render(
      <BrowserRouter>
        <SignUpForm />
      </BrowserRouter>
    );

  it("renders the form correctly", () => {
    setup();

    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getAllByLabelText(/Password/i)[1]).toBeInTheDocument();
    expect(screen.getByLabelText(/Password Confirmation/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Sign Up/i)[1]).toBeInTheDocument();
  });

  it("updates input fields correctly when typing", () => {
    setup();

    const usernameInput = screen.getByLabelText(/Username/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getAllByLabelText(/Password/i)[1];
    const passwordConfirmationInput = screen.getByLabelText(
      /Password Confirmation/i
    );

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "Abc123$$" } });
    fireEvent.change(passwordConfirmationInput, {
      target: { value: "Abc123$$" },
    });

    expect(usernameInput).toHaveValue("testuser");
    expect(emailInput).toHaveValue("test@example.com");
    expect(passwordInput).toHaveValue("Abc123$$");
    expect(passwordConfirmationInput).toHaveValue("Abc123$$");
  });

  it("submits the form successfully when there are no validation errors", async () => {
    // Mock successful API response
    (UserAPI.createUserObservable as jest.Mock).mockReturnValue(
      of(signUpResponse)
    );

    setup();

    const usernameInput = screen.getByLabelText(/Username/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getAllByLabelText(/Password/i)[0];
    const passwordConfirmationInput = screen.getByLabelText(
      /Password Confirmation/i
    );
    const submitButton = screen.getAllByText(/Sign Up/i)[1];

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "Abc123$$" } });
    fireEvent.change(passwordConfirmationInput, {
      target: { value: "Abc123$$" },
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      // Check if the API call was made
      expect(UserAPI.createUserObservable).toHaveBeenCalledWith({
        userTag: "testuser",
        email: "test@example.com",
        password: "Abc123$$",
      });
    });
  });
});
