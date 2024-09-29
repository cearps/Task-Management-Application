import KanbanListView from "../../../src/components/kanbans/kanban-list-view";
import { BrowserRouter } from "react-router-dom";

import { render, screen, fireEvent } from "@testing-library/react";
import KanbanAPI from "../../../src/api/kanbanAPI";
import { of } from "rxjs";

// Mock the KanbanAPI
jest.mock("../../../src/api/kanbanAPI");

describe("KanbanListView", () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    jest.spyOn(KanbanAPI, "getKanbanBoardsObservable").mockClear();
    jest.spyOn(KanbanAPI, "createKanbanBoardWithDetailsObservable").mockClear();
    jest.spyOn(KanbanAPI, "updateKanbanBoardObservable").mockClear();
    jest.spyOn(KanbanAPI, "deleteKanbanBoardObservable").mockClear();
  });

  test("renders Kanban boards", async () => {
    // Mock the observable to return a list of boards
    jest.spyOn(KanbanAPI, "getKanbanBoardsObservable").mockReturnValue(
      of([
        {
          id: 1,
          name: "Test Board 1",
          dueDate: "2024-09-30",
          users: [],
          tasks: [],
          startDate: "2024-09-01",
        },
        {
          id: 2,
          name: "Test Board 2",
          dueDate: "2024-10-05",
          users: [],
          tasks: [],
          startDate: "2024-09-01",
        },
      ])
    );

    render(
      <BrowserRouter>
        <KanbanListView />
      </BrowserRouter>
    );

    // Check if the boards are rendered
    expect(await screen.findByText("Test Board 1")).toBeInTheDocument();
    expect(await screen.findByText("Test Board 2")).toBeInTheDocument();
  });

  test("handles board addition", async () => {
    jest.spyOn(KanbanAPI, "getKanbanBoardsObservable").mockReturnValue(of([]));
    (
      KanbanAPI.createKanbanBoardWithDetailsObservable as jest.Mock
    ).mockReturnValue(
      of({
        id: 3,
        name: "New Board",
        dueDate: "2024-11-01",
        description: "New Description",
      })
    );

    render(
      <BrowserRouter>
        <KanbanListView />
      </BrowserRouter>
    );

    // Open the modal
    fireEvent.click(screen.getByTestId("add-board-button"));
    // Fill out the form and submit
    fireEvent.change(screen.getByPlaceholderText(/board name/i), {
      target: { value: "New Board" },
    });
    fireEvent.change(screen.getByLabelText(/due date/i), {
      target: { value: "2024-11-01" },
    });
    fireEvent.click(screen.getByRole("button", { name: /create board/i }));
    // Wait for the new board to be rendered
    expect(await screen.findByText("New Board")).toBeInTheDocument();
  });

  test("handles board update", async () => {
    jest.spyOn(KanbanAPI, "getKanbanBoardsObservable").mockReturnValue(
      of([
        {
          id: 1,
          name: "Test Board",
          dueDate: "2024-09-30",
          description: "Description 1",
          users: [],
          tasks: [],
          startDate: "2024-09-01",
        },
      ])
    );
    jest.spyOn(KanbanAPI, "updateKanbanBoardObservable").mockReturnValue(
      of({
        id: 1,
        name: "Updated Board",
        dueDate: "2024-09-30",
        description: "Description 1",
        users: [],
        tasks: [],
        startDate: "2024-09-01",
      })
    );

    render(
      <BrowserRouter>
        <KanbanListView />
      </BrowserRouter>
    );

    // Open the edit modal
    fireEvent.click(screen.getByRole("button", { name: /edit/i }));

    // Update the form fields and submit
    fireEvent.change(screen.getByPlaceholderText(/board name/i), {
      target: { value: "Updated Board" },
    });
    fireEvent.click(screen.getByRole("button", { name: /update board/i }));

    // Check that the updated board is displayed
    expect(await screen.findByText("Updated Board")).toBeInTheDocument();
  });

  test("handles board deletion", async () => {
    (KanbanAPI.getKanbanBoardsObservable as jest.Mock).mockReturnValue(
      of([
        {
          id: 1,
          name: "Test Board",
          dueDate: "2024-09-30",
          description: "Description 1",
        },
      ])
    );
    jest
      .spyOn(KanbanAPI, "deleteKanbanBoardObservable")
      .mockReturnValue(of(void 0));

    render(
      <BrowserRouter>
        <KanbanListView />
      </BrowserRouter>
    );

    // Open the confirmation modal to delete the board
    fireEvent.click(screen.getByRole("button", { name: /delete/i }));
    fireEvent.click(screen.getByRole("button", { name: /confirm/i }));

    // Ensure the board is no longer rendered
    expect(await screen.queryByText("Test Board")).not.toBeInTheDocument();
  });
});
