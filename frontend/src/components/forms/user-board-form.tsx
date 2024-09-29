import { useState, useEffect, useRef } from "react";
import { KanbanBoard, UserInfo } from "../../utilities/types";
import UserAPI from "../../api/userAPI";

export default function UserBoardForm({
  onClose,
  onSubmit,
  errors,
  board,
}: {
  onClose: () => void;
  onSubmit: (board: KanbanBoard) => void;
  errors: string | null;
  board: KanbanBoard;
}) {
  const [userTag, setUserTag] = useState("");
  const cardRef = useRef<HTMLDivElement>(null);
  const [currentUser, setCurrentUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    const subscription = UserAPI.getUserObservable().subscribe({
      next: (user) => {
        setCurrentUser(user);
      },
      error: (error) => {
        console.error("Error fetching current user:", error);
      },
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleAddUserSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({
      ...board,
      users: [...board.users, { id: 1, userTag: userTag }],
    });
  };

  const handleRemoveUserSubmit =
    (userId: number) =>
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      onSubmit({
        ...board,
        users: board.users.filter((user) => user.id !== userId),
      });
    };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className="bg-white rounded-lg shadow-lg w-full max-w-md p-6"
        ref={cardRef}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Update Board Users</h2>
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
          <h2 className="text-xl font-bold mb-5">Board Name: {board.name}</h2>

          <h3 className="text-lg font-bold mb-2">Users</h3>
          <ul>
            {/* Iterate over the users and render each user */}
            {board.users.map((user) => (
              <li
                key={user.id}
                className="flex items-center justify-between mb-2"
              >
                <span>{user.userTag}</span>
                {user.id !== currentUser?.id && (
                  <button
                    className="text-red-500"
                    onClick={handleRemoveUserSubmit(user.id)}
                  >
                    Delete User
                  </button>
                )}
              </li>
            ))}
          </ul>
          <form onSubmit={handleAddUserSubmit}>
            <input
              type="text"
              placeholder="Enter user tag"
              value={userTag}
              onChange={(e) => setUserTag(e.target.value)}
              className="border border-gray-300 rounded-md px-2 py-2 mt-2 mr-2"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white rounded-md px-4 py-2 mt-2 hover:bg-blue-600"
            >
              Add User
            </button>
            {errors && <p className="text-red-500">{errors}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
