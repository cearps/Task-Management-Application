import LogInForm from "../../../../src/components/forms/account-forms/login-form";

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import UserAPI from "../../../../src/api/userAPI";
import { BrowserRouter } from "react-router-dom";

// Mock the useNavigate hook from react-router-dom
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

// Mock the UserAPI
jest.mock("../../../../src/api/userAPI");

describe("LogInForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders login form with email and password fields", () => {
    render(
      <BrowserRouter>
        <LogInForm />
      </BrowserRouter>
    );

    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  test("validates email input", async () => {
    render(
      <BrowserRouter>
        <LogInForm />
      </BrowserRouter>
    );

    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: "invalid-email" } });

    await waitFor(() => {
      expect(screen.getByText(/Email is invalid/i)).toBeInTheDocument();
    });
  });

  test("validates password input", async () => {
    render(
      <BrowserRouter>
        <LogInForm />
      </BrowserRouter>
    );

    const passwordInput = screen.getByLabelText(/password/i);
    fireEvent.change(passwordInput, { target: { value: "short" } });

    await waitFor(() => {
      expect(
        screen.getByText(/Password must be at least 8 characters/i)
      ).toBeInTheDocument();
    });
  });

  test("does not submit the form if there are validation errors", async () => {
    render(
      <BrowserRouter>
        <LogInForm />
      </BrowserRouter>
    );

    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: "invalid-email" } });

    const passwordInput = screen.getByLabelText(/password/i);
    fireEvent.change(passwordInput, { target: { value: "short" } });

    const submitButton = screen.getByRole("button", { name: /login/i });
    fireEvent.click(submitButton);

    expect(UserAPI.loginUserObservable).not.toHaveBeenCalled();
  });

  test("calls the login API and navigates on successful login", async () => {
    const mockResponse = { token: "mock-token" };
    (UserAPI.loginUserObservable as jest.Mock).mockReturnValue({
      pipe: jest.fn().mockReturnValue({
        subscribe: ({ next }: any) => next(mockResponse),
      }),
    });

    render(
      <BrowserRouter>
        <LogInForm />
      </BrowserRouter>
    );

    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });

    const passwordInput = screen.getByLabelText(/password/i);
    fireEvent.change(passwordInput, { target: { value: "Abc123$$" } });

    const submitButton = screen.getByRole("button", { name: /login/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(UserAPI.loginUserObservable).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "Abc123$$",
      });
      expect(localStorage.getItem("token")).toBe("mock-token");
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });

  test("displays login errors on API failure", async () => {
    const mockError = {
      response: {
        data: { description: "Invalid credentials" },
      },
    };
    (UserAPI.loginUserObservable as jest.Mock).mockReturnValue({
      pipe: jest.fn().mockReturnValue({
        subscribe: ({ error }: any) => error(mockError),
      }),
    });

    render(
      <BrowserRouter>
        <LogInForm />
      </BrowserRouter>
    );

    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });

    const passwordInput = screen.getByLabelText(/password/i);
    fireEvent.change(passwordInput, { target: { value: "Abc123$$" } });

    const submitButton = screen.getByRole("button", { name: /login/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument();
    });
  });
});
