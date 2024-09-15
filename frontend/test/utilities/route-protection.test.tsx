import {
  PrivateRoute,
  DecisionRoute,
  NonAuthenticatedRoute,
} from "../../src/utilities/route-protection";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

describe("Route Protection", () => {
  test("renders PrivateRoute component", () => {
    render(
      <MemoryRouter initialEntries={["/private"]}>
        <Routes>
          <Route
            path="/private"
            element={
              <PrivateRoute>
                <div>Private Route</div>
              </PrivateRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Private Route")).toBeInTheDocument();
  });

  test("renders NonAuthenticatedRoute component", () => {
    render(
      <MemoryRouter initialEntries={["/non-authenticated"]}>
        <Routes>
          <Route
            path="/non-authenticated"
            element={
              <NonAuthenticatedRoute>
                <div>Non-Authenticated Route</div>
              </NonAuthenticatedRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Non-Authenticated Route")).toBeInTheDocument();
  });

  test("Tests decision route for logged in", () => {
    // mock the UserAPI.getUserObservable method to just omit true every second
    jest.mock("../../src/api/userAPI", () => {
      return {
        __esModule: true,
        default: {
          getUserObservable: () => {
            return {
              subscribe: (callback: (value: boolean) => void) => {
                setInterval(() => {
                  callback(true);
                }, 1000);
              },
              unsubscribe: () => {},
            };
          },
        },
      };
    });

    render(
      <MemoryRouter initialEntries={["/decision"]}>
        <Routes>
          <Route path="/decision" element={<DecisionRoute />} />
        </Routes>
      </MemoryRouter>
    );

    // check that it redirected to the boards page
    setTimeout(() => {
      expect(window.location.pathname).toBe("/boards");
    }, 2000);
  });

  test("Tests decision route for logged out", () => {
    // mock the UserAPI.getUserObservable method to just omit false every second
    jest.mock("../../src/api/userAPI", () => {
      return {
        __esModule: true,
        default: {
          getUserObservable: () => {
            return {
              subscribe: (callback: (value: boolean) => void) => {
                setInterval(() => {
                  callback(false);
                }, 1000);
              },
              unsubscribe: () => {},
            };
          },
        },
      };
    });

    render(
      <MemoryRouter initialEntries={["/decision"]}>
        <Routes>
          <Route path="/decision" element={<DecisionRoute />} />
        </Routes>
      </MemoryRouter>
    );

    // check that it redirected to the login page
    setTimeout(() => {
      expect(window.location.pathname).toBe("/accounts/login");
    }, 2000);
  });
});
