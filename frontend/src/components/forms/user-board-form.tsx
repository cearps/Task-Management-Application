import { KanbanBoard } from "../../utilities/types";
import { useState } from "react";

export default function UserBoardForm({
  onClose,
  onSubmit,
  errors,
  setErrors,
  board,
}: {
  onClose: () => void;
  onSubmit: (board: KanbanBoard) => void;
  errors: string | null;
  setErrors: React.Dispatch<React.SetStateAction<string>>;
  board: KanbanBoard;
}) {
  const [name, setName] = useState(board.name);

  const handleAddUserSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // find the user by tag
    // if the user exists, add the user to the board
    // if the user does not exist, set an error

    onSubmit({ ...board, name });
  };

  const handleRemoveUserSubmit =
    (userId: number) => (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onSubmit({
        ...board,
        users: board.users.filter((user) => user.id !== userId),
      });
    };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add User to Board</h2>
          <button className="text-red-500" onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-2">Users</h3>
          <ul>
            {/* Iterate over the users and render each user */}
            {board.users.map((user) => (
              <li
                key={user.id}
                className="flex items-center justify-between mb-2"
              >
                <span>{user.userTag}</span>
                <button
                  className="text-red-500"
                  onClick={handleRemoveUserSubmit(user.id)}
                >
                  Delete User
                </button>
              </li>
            ))}
          </ul>
          <form onSubmit={handleAddUserSubmit}>
            <input
              type="text"
              placeholder="Enter user tag"
              className="border border-gray-300 rounded-md px-2 py-2 mt-2 mr-2"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white rounded-md px-4 py-2 mt-2"
            >
              Add User
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
