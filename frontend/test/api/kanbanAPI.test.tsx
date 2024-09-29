import axios from "axios";
import KanbanAPI from "../../src/api/kanbanAPI";
import { KanbanBoard } from "../../src/utilities/types";
import { API_URL } from "../../src/api/apiConfig";

// Mock the axios module
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("KanbanAPI", () => {
  const token = "test-token";
  const mockBoard: KanbanBoard = {
    id: 1,
    name: "Test Board",
    description: "Test Description",
    tasks: [],
    dueDate: "",
    startDate: "",
    users: [],
  };

  beforeEach(() => {
    localStorage.setItem("token", token);
  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  describe("getKanbanBoards", () => {
    it("should fetch Kanban boards successfully", async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: [mockBoard] });

      const boards = await KanbanAPI.getKanbanBoards();

      expect(mockedAxios.get).toHaveBeenCalledWith(`${API_URL}/kanbans`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      expect(boards).toEqual([mockBoard]);
    });

    it("should handle errors when fetching Kanban boards", async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error("Network Error"));

      await expect(KanbanAPI.getKanbanBoards()).rejects.toThrow(
        "Network Error"
      );
    });
  });

  describe("createKanbanBoard", () => {
    it("should create a Kanban board successfully", async () => {
      mockedAxios.post.mockResolvedValueOnce({ data: mockBoard });

      const board = await KanbanAPI.createKanbanBoard();

      expect(mockedAxios.post).toHaveBeenCalledWith(
        `${API_URL}/kanbans`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      expect(board).toEqual(mockBoard);
    });

    it("should handle errors when creating a Kanban board", async () => {
      mockedAxios.post.mockRejectedValueOnce(new Error("Creation Error"));

      await expect(KanbanAPI.createKanbanBoard()).rejects.toThrow(
        "Creation Error"
      );
    });
  });

  describe("updateKanbanBoard", () => {
    it("should update a Kanban board successfully", async () => {
      const updatedBoard: Partial<KanbanBoard> = { name: "Updated Board" };
      mockedAxios.post.mockResolvedValueOnce({
        data: { ...mockBoard, ...updatedBoard },
      });

      const result = await KanbanAPI.updateKanbanBoard(1, updatedBoard);

      expect(mockedAxios.post).toHaveBeenCalledWith(
        `${API_URL}/kanbans/1`,
        updatedBoard,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      expect(result).toEqual({ ...mockBoard, ...updatedBoard });
    });

    it("should handle errors when updating a Kanban board", async () => {
      mockedAxios.post.mockRejectedValueOnce(new Error("Update Error"));

      await expect(
        KanbanAPI.updateKanbanBoard(1, { name: "Updated Board" })
      ).rejects.toThrow("Update Error");
    });
  });

  describe("getKanbanBoard", () => {
    it("should fetch a Kanban board by ID successfully", async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: mockBoard });

      const board = await KanbanAPI.getKanbanBoard("1");

      expect(mockedAxios.get).toHaveBeenCalledWith(`${API_URL}/kanbans/1`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      expect(board).toEqual(mockBoard);
    });

    it("should handle errors when fetching a Kanban board by ID", async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error("Board Not Found"));

      await expect(KanbanAPI.getKanbanBoard("1")).rejects.toThrow(
        "Board Not Found"
      );
    });
  });

  describe("deleteKanbanBoard", () => {
    it("should delete a Kanban board successfully", async () => {
      mockedAxios.delete.mockResolvedValueOnce({});

      await KanbanAPI.deleteKanbanBoard(1);

      expect(mockedAxios.delete).toHaveBeenCalledWith(`${API_URL}/kanbans/1`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    });

    it("should handle errors when deleting a Kanban board", async () => {
      mockedAxios.delete.mockRejectedValueOnce(new Error("Deletion Error"));

      await expect(KanbanAPI.deleteKanbanBoard(1)).rejects.toThrow(
        "Deletion Error"
      );
    });
  });

  describe("Observables", () => {
    it("should fetch Kanban boards observable", (done) => {
      jest.spyOn(KanbanAPI, "getKanbanBoards").mockResolvedValue([mockBoard]);

      KanbanAPI.getKanbanBoardsObservable().subscribe((boards) => {
        expect(boards).toEqual([mockBoard]);
        done();
      });
    });

    it("should fetch a specific Kanban board observable", (done) => {
      jest.spyOn(KanbanAPI, "getKanbanBoard").mockResolvedValue(mockBoard);

      KanbanAPI.getKanbanBoardObservable("1").subscribe((board) => {
        expect(board).toEqual(mockBoard);
        done();
      });
    });

    it("should handle errors in getKanbanBoardObservable", (done) => {
      jest
        .spyOn(KanbanAPI, "getKanbanBoard")
        .mockRejectedValue(new Error("Observable Error"));

      KanbanAPI.getKanbanBoardObservable("1").subscribe((board) => {
        expect(board).toBeNull();
        done();
      });
    });

    it("should create a Kanban board observable", (done) => {
      jest.spyOn(KanbanAPI, "createKanbanBoard").mockResolvedValue(mockBoard);

      KanbanAPI.createKanbanBoardObservable().subscribe((board) => {
        expect(board).toEqual(mockBoard);
        done();
      });
    });

    it("should update a Kanban board observable", (done) => {
      jest.spyOn(KanbanAPI, "updateKanbanBoard").mockResolvedValue(mockBoard);

      KanbanAPI.updateKanbanBoardObservable(1, {}).subscribe((board) => {
        expect(board).toEqual(mockBoard);
        done();
      });
    });

    it("should handle errors in updateKanbanBoardObservable", (done) => {
      jest
        .spyOn(KanbanAPI, "updateKanbanBoard")
        .mockRejectedValue(new Error("Observable Error"));

      KanbanAPI.updateKanbanBoardObservable(1, {}).subscribe({
        error: (error) => {
          expect(error).toBeInstanceOf(Error);
          done();
        },
      });
    });

    it("should create a Kanban board with details observable", (done) => {
      jest.spyOn(KanbanAPI, "createKanbanBoard").mockResolvedValue(mockBoard);
      jest.spyOn(KanbanAPI, "updateKanbanBoard").mockResolvedValue(mockBoard);

      KanbanAPI.createKanbanBoardWithDetailsObservable({}).subscribe(
        (board) => {
          expect(board).toEqual(mockBoard);
          done();
        }
      );
    });

    it("should handle errors in createKanbanBoardWithDetailsObservable", (done) => {
      jest
        .spyOn(KanbanAPI, "createKanbanBoard")
        .mockRejectedValue(new Error("Observable Error"));

      KanbanAPI.createKanbanBoardWithDetailsObservable({}).subscribe({
        error: (error) => {
          expect(error).toBeInstanceOf(Error);
          done();
        },
      });
    });

    it("should delete a Kanban board observable", (done) => {
      jest.spyOn(KanbanAPI, "deleteKanbanBoard").mockResolvedValue(undefined);

      KanbanAPI.deleteKanbanBoardObservable(1).subscribe(() => {
        done();
      });
    });

    it("should handle errors in deleteKanbanBoardObservable", (done) => {
      jest
        .spyOn(KanbanAPI, "deleteKanbanBoard")
        .mockRejectedValue(new Error("Observable Error"));

      KanbanAPI.deleteKanbanBoardObservable(1).subscribe({
        error: (error) => {
          expect(error).toBeInstanceOf(Error);
          done();
        },
      });
    });
  });
});
