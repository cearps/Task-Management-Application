import {
  BoardApiError,
  TaskApiError,
  CommentApiError,
  ApiError,
} from "../../src/utilities/errors";

describe("BoardApiError", () => {
  it("should have the correct name", () => {
    const error = new BoardApiError(
      "message",
      {
        id: 1,
        name: "board",
        description: "description",
        startDate: "startDate",
        dueDate: "dueDate",
        users: [],
        tasks: [],
      },
      "error"
    );
    expect(error.name).toBe("BoardApiError");
  });

  it("should have the correct message", () => {
    const error = new BoardApiError(
      "message",
      {
        id: 1,
        name: "board",
        description: "description",
        startDate: "startDate",
        dueDate: "dueDate",
        users: [],
        tasks: [],
      },
      "error"
    );
    expect(error.message).toBe("message");
  });

  it("should have the correct board", () => {
    const board = {
      id: 1,
      name: "board",
      description: "description",
      startDate: "startDate",
      dueDate: "dueDate",
      users: [],
      tasks: [],
    };
    const error = new BoardApiError("message", board, "error");
    expect(error.board).toBe(board);
  });

  it("should have the correct error", () => {
    const error = new BoardApiError(
      "message",
      {
        id: 1,
        name: "board",
        description: "description",
        startDate: "startDate",
        dueDate: "dueDate",
        users: [],
        tasks: [],
      },
      "error"
    );
    expect(error.error).toBe("error");
  });
});

describe("TaskApiError", () => {
  it("should have the correct name", () => {
    const error = new TaskApiError(
      "message",
      {
        id: 1,
        name: "task",
        description: "description",
        dueDate: "dueDate",
        urgency: 1,
        taskCategory: 1,
        users: [],
        comments: [],
      },
      "error"
    );
    expect(error.name).toBe("TaskApiError");
  });

  it("should have the correct message", () => {
    const error = new TaskApiError(
      "message",
      {
        id: 1,
        name: "task",
        description: "description",
        dueDate: "dueDate",
        urgency: 1,
        taskCategory: 1,
        users: [],
        comments: [],
      },
      "error"
    );
    expect(error.message).toBe("message");
  });

  it("should have the correct task", () => {
    const task = {
      id: 1,
      name: "task",
      description: "description",
      dueDate: "dueDate",
      urgency: 1,
      taskCategory: 1,
      users: [],
      comments: [],
    };
    const error = new TaskApiError("message", task, "error");
    expect(error.task).toBe(task);
  });

  it("should have the correct error", () => {
    const error = new TaskApiError(
      "message",
      {
        id: 1,
        name: "task",
        description: "description",
        dueDate: "dueDate",
        urgency: 1,
        taskCategory: 1,
        users: [],
        comments: [],
      },
      "error"
    );
    expect(error.error).toBe("error");
  });
});

describe("CommentApiError", () => {
  it("should have the correct name", () => {
    const error = new CommentApiError(
      "message",
      {
        comment: "comment",
      },
      "error"
    );
    expect(error.name).toBe("CommentApiError");
  });

  it("should have the correct message", () => {
    const error = new CommentApiError(
      "message",
      {
        comment: "comment",
      },
      "error"
    );
    expect(error.message).toBe("message");
  });

  it("should have the correct comment", () => {
    const comment = {
      comment: "comment",
    };
    const error = new CommentApiError("message", comment, "error");
    expect(error.comment).toBe(comment);
  });

  it("should have the correct error", () => {
    const error = new CommentApiError(
      "message",
      {
        comment: "comment",
      },
      "error"
    );
    expect(error.error).toBe("error");
  });
});

describe("ApiError", () => {
  it("should have the correct name", () => {
    const error = new ApiError("message", 404);
    expect(error.name).toBe("Error");
  });

  it("should have the correct message", () => {
    const error = new ApiError("message", 404);
    expect(error.message).toBe("message");
  });

  it("should have the correct status", () => {
    const error = new ApiError("message", 404);
    expect(error.status).toBe(404);
  });
});
