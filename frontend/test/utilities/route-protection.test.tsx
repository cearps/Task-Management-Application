import PrivateRoute from "../../src/utilities/route-protection";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import UserAPI from "../../src/api/userAPI";

// Mock components
const ProtectedComponent = () => <div>Protected Content</div>;
const LoginComponent = () => <div>Login Page</div>;

// Mock authentication function

// mock the UserAPI.isAuthenticated function
jest.mock("../../src/api/userAPI", () => ({
  isAuthenticated: jest.fn(),
}));

const mockedIsAuthenticated = UserAPI.isAuthenticated as jest.Mock;

describe("PrivateRoute", () => {
  beforeEach(() => {
    mockedIsAuthenticated.mockReset();
  });
  it("renders protected component for authenticated users", () => {
    mockedIsAuthenticated.mockReturnValue(true);
    render(
      <MemoryRouter initialEntries={["/protected"]}>
        <Routes>
          <Route path="/accounts/login" element={<LoginComponent />} />
          <Route
            path="/protected"
            element={<PrivateRoute children={<ProtectedComponent />} />}
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Protected Content")).toBeInTheDocument();
  });

  it("redirects to login for unauthenticated users", () => {
    mockedIsAuthenticated.mockReturnValue(false);

    render(
      <MemoryRouter initialEntries={["/protected"]}>
        <Routes>
          <Route path="/accounts/login" element={<LoginComponent />} />
          <Route
            path="/protected"
            element={<PrivateRoute children={<ProtectedComponent />} />}
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });
});
