import axios from "axios";
import TaskAPI from "../../src/api/taskAPI";
import { KanbanTask, NewComment, Comment } from "../../src/utilities/types";
import { API_URL } from "../../src/api/apiConfig";

// Mock the axios module
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("TaskAPI", () => {
  const token = "test-token";
  const mockTask: KanbanTask = {
    id: 1,
    name: "Test Task",
    description: "Test Task Description",
    dueDate: "2024-12-31",
    urgency: 2,
    users: [],
    comments: [],
    taskCategory: 1,
  };

  const mockComment: Comment = {
    id: 1,
    comment: "Test comment",
    user: { userId: 1, userTag: "Test User" },
    timestamp: "2024-01-01",
  };

  beforeEach(() => {
    localStorage.setItem("token", token);
  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  describe("createTask", () => {
    it("should create a task successfully", async () => {
      mockedAxios.post.mockResolvedValueOnce({ data: mockTask });

      const task = await TaskAPI.createTask(1);

      expect(mockedAxios.post).toHaveBeenCalledWith(
        `${API_URL}/kanbans/1/tasks`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      expect(task).toEqual(mockTask);
    });

    it("should throw an error when creating a task fails", async () => {
      mockedAxios.post.mockRejectedValueOnce(new Error("Creation Error"));

      await expect(TaskAPI.createTask(1)).rejects.toThrow("Creation Error");
    });
  });

  describe("deleteTask", () => {
    it("should delete a task successfully", async () => {
      mockedAxios.delete.mockResolvedValueOnce({});

      await TaskAPI.deleteTask(1, 1);

      expect(mockedAxios.delete).toHaveBeenCalledWith(
        `${API_URL}/kanbans/1/tasks/1`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
    });

    it("should throw an error when deleting a task fails", async () => {
      mockedAxios.delete.mockRejectedValueOnce(new Error("Deletion Error"));

      await expect(TaskAPI.deleteTask(1, 1)).rejects.toThrow(
        "Failed to delete task:"
      );
    });
  });

  describe("updateTask", () => {
    it("should update a task successfully", async () => {
      const updatedTask: Partial<KanbanTask> = { name: "Updated Task" };
      mockedAxios.post.mockResolvedValueOnce({
        data: { ...mockTask, ...updatedTask },
      });

      const result = await TaskAPI.updateTask(1, 1, updatedTask);

      expect(mockedAxios.post).toHaveBeenCalledWith(
        `${API_URL}/kanbans/1/tasks/1`,
        updatedTask,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      expect(result).toEqual({ ...mockTask, ...updatedTask });
    });

    it("should throw an error when updating a task fails", async () => {
      mockedAxios.post.mockRejectedValueOnce(new Error("Update Error"));

      await expect(
        TaskAPI.updateTask(1, 1, { name: "Updated Task" })
      ).rejects.toThrow("Update Error");
    });
  });

  describe("createTaskObservable", () => {
    it("should create and update a task using observables", (done) => {
      jest.spyOn(TaskAPI, "createTask").mockResolvedValueOnce(mockTask);
      jest
        .spyOn(TaskAPI, "updateTask")
        .mockResolvedValueOnce({ ...mockTask, name: "Updated Task" });

      const subscription = TaskAPI.createTaskObservable(1, {
        name: "Updated Task",
      }).subscribe({
        next: (task) => {
          expect(task.name).toBe("Updated Task");
          subscription.unsubscribe();
          done();
        },
        error: done.fail,
      });
    });

    it("should handle errors in createTaskObservable", (done) => {
      jest.spyOn(TaskAPI, "createTask").mockResolvedValueOnce(mockTask);
      jest
        .spyOn(TaskAPI, "updateTask")
        .mockRejectedValueOnce(new Error("Update Error"));

      const subscription = TaskAPI.createTaskObservable(1, {
        name: "Updated Task",
      }).subscribe({
        next: () => {
          done.fail("Should not emit a value");
        },
        error: (error) => {
          expect(error.message).toContain("Error creating task with boardId 1");
          subscription.unsubscribe();
          done();
        },
      });
    });
  });

  describe("updateTaskObservable", () => {
    it("should update a task using observables", (done) => {
      jest
        .spyOn(TaskAPI, "updateTask")
        .mockResolvedValueOnce({ ...mockTask, name: "Updated Task" });

      const subscription = TaskAPI.updateTaskObservable(1, {
        id: 1,
        name: "Updated Task",
      }).subscribe({
        next: (task) => {
          expect(task.name).toBe("Updated Task");
          subscription.unsubscribe();
          done();
        },
        error: done.fail,
      });
    });

    it("should handle errors in updateTaskObservable", (done) => {
      jest
        .spyOn(TaskAPI, "updateTask")
        .mockRejectedValueOnce(new Error("Update Error"));

      const subscription = TaskAPI.updateTaskObservable(1, {
        id: 1,
        name: "Updated Task",
      }).subscribe({
        next: () => {
          done.fail("Should not emit a value");
        },
        error: (error) => {
          expect(error.message).toContain(
            "Error updating task with boardId 1 and taskId 1"
          );
          subscription.unsubscribe();
          done();
        },
      });
    });
  });

  describe("addComment", () => {
    it("should add a comment successfully", async () => {
      const newComment: NewComment = { comment: "New Comment" };
      mockedAxios.post.mockResolvedValueOnce({ data: mockComment });

      const comment = await TaskAPI.addComment(1, 1, newComment);

      expect(mockedAxios.post).toHaveBeenCalledWith(
        `${API_URL}/kanbans/1/tasks/1/comment`,
        newComment,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      expect(comment).toEqual(mockComment);
    });

    it("should throw an error when adding a comment fails", async () => {
      mockedAxios.post.mockRejectedValueOnce(new Error("Comment Error"));

      const newComment: NewComment = { comment: "New Comment" };

      await expect(TaskAPI.addComment(1, 1, newComment)).rejects.toThrow(
        "Comment Error"
      );
    });
  });

  describe("addCommentObservable", () => {
    it("should add a comment using observables", (done) => {
      jest.spyOn(TaskAPI, "addComment").mockResolvedValueOnce(mockComment);

      const newComment: NewComment = { comment: "New Comment" };

      const subscription = TaskAPI.addCommentObservable(
        1,
        1,
        newComment
      ).subscribe({
        next: (comment) => {
          expect(comment.comment).toBe("Test comment");
          subscription.unsubscribe();
          done();
        },
        error: done.fail,
      });
    });
  });
});
