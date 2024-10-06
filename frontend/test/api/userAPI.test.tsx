import axios from "axios";
import UserAPI from "../../src/api/userAPI";
import { API_URL } from "../../src/api/apiConfig";
import { NewUserData, SignUpResponse, User } from "../../src/utilities/types";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("UserAPI", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks(); // Reset any previous axios mocks
  });

  it("should exist", () => {
    expect(UserAPI).toBeDefined();
  });

  describe("getUser", () => {
    it("should return the user data when token is present", async () => {
      const mockUser: User = {
        id: 1,
        userTag: "user1",
        email: "user@example.com",
      };
      const token = "mockToken";
      localStorage.setItem("token", token);

      mockedAxios.get.mockResolvedValueOnce({ data: mockUser });

      const result = await UserAPI.getUser();

      expect(result).toEqual(mockUser);
      expect(mockedAxios.get).toHaveBeenCalledWith(`${API_URL}/user/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    });

    it("should throw an error when no token is present", async () => {
      localStorage.removeItem("token");

      await expect(UserAPI.getUser()).rejects.toThrow();
    });
  });

  describe("createUser", () => {
    it("should create a new user and return the signup response", async () => {
      const newUser: NewUserData = {
        userTag: "userTag",
        email: "new@example.com",
        password: "password",
      };
      const mockResponse: SignUpResponse = {
        id: 1,
        fullName: newUser.userTag,
        email: "new@example.com",
        enabled: true,
        username: newUser.userTag,
        authorities: [],
        accountNonExpired: true,
        accountNonLocked: true,
        credentialsNonExpired: true,
      };

      mockedAxios.post.mockResolvedValueOnce({
        data: mockResponse,
        status: 200,
      });

      const result = await UserAPI.createUser(newUser);

      expect(result).toEqual(mockResponse);
    });
  });
});

describe("Observables", () => {
  it("getUserObservable should return a User Observable", (done) => {
    const mockUser: User = {
      id: 1,
      userTag: "user1",
      email: "user@example.com",
    };

    mockedAxios.get.mockResolvedValueOnce({ data: mockUser });

    const observable = UserAPI.getUserObservable();

    observable.subscribe((user) => {
      expect(user).toEqual(mockUser);
      done();
    });
  });
});

describe("isAuthenticatedObservable", () => {
  it("should return true if user is authenticated", (done) => {
    const mockUser: User = {
      id: 1,
      userTag: "user1",
      email: "user@example.com",
    };

    mockedAxios.get.mockResolvedValueOnce({ data: mockUser });

    UserAPI.isAuthenticatedObservable().subscribe((isAuthenticated) => {
      expect(isAuthenticated).toBe(true);
      done();
    });

    expect(mockedAxios.get).toHaveBeenCalledWith(
      `${API_URL}/user/me`,
      expect.any(Object)
    );
  });

  it("should return false if user is not authenticated", (done) => {
    mockedAxios.get.mockRejectedValueOnce({ response: { status: 401 } });

    UserAPI.isAuthenticatedObservable().subscribe((isAuthenticated) => {
      expect(isAuthenticated).toBe(false);
      done();
    });

    expect(mockedAxios.get).toHaveBeenCalledWith(
      `${API_URL}/user/me`,
      expect.any(Object)
    );
  });

  describe("logout", () => {
    it("should remove the token from localStorage", () => {
      localStorage.setItem("token", "mockToken");

      UserAPI.logout();

      expect(localStorage.getItem("token")).toBeNull();
    });
  });

  describe("createUser", () => {
    it("should throw an error if the response status is not 200", async () => {
      const newUser: NewUserData = {
        userTag: "userTag",
        email: "new@example.com",
        password: "password",
      };

      const mockErrorResponse = {
        data: { description: "User creation failed" },
        status: 400,
      };

      mockedAxios.post.mockResolvedValueOnce(mockErrorResponse);

      await expect(UserAPI.createUser(newUser)).rejects.toThrow(
        "User creation failed"
      );
    });
  });

  describe("loginUser", () => {
    it("should throw an error if login fails", async () => {
      const loginData = { email: "user@example.com", password: "password" };

      const mockErrorResponse = {
        data: { description: "Invalid credentials" },
        status: 401,
      };

      mockedAxios.post.mockResolvedValueOnce(mockErrorResponse);

      await expect(UserAPI.loginUser(loginData)).rejects.toThrow(
        "Invalid credentials"
      );
    });
  });
});
