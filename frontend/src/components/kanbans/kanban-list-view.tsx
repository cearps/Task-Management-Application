import { useState, useEffect } from "react";
import KanbanAPI from "../../api/kanbanAPI";
import { useNavigate } from "react-router-dom";
import { KanbanBoard } from "../../utilities/types";
import AddBoardForm from "../forms/add-board-form"; // Import the AddBoardForm component

export default function KanbanListView() {
  const [kanbanBoards, setKanbanBoards] = useState([] as KanbanBoard[]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control the modal visibility
  const [isButtonClicked, setIsButtonClicked] = useState(false); // New state for button click effect

  useEffect(() => {
    const subscription = KanbanAPI.getKanbanBoardsObservable().subscribe({
      next: (boards) => {
        if (boards === null) {
          return;
        }
        setKanbanBoards(boards);
      },
      error: (error) => {
        console.error("Error fetching Kanban boards:", error);
      },
    });

    // prevent memory leak
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleAddBoard = (name: string, dueDate: string, description: string) => {
    // Start date can be added by the user, or you can default it to today's date
    const startDate = new Date().toISOString().split("T")[0]; // Defaults to today's date

    console.log("Board Data:", { name, startDate, dueDate, description }); // Check the data
  
    KanbanAPI.createKanbanBoard(name, startDate, dueDate, description)
      .then((newBoard) => {
        // Update the local state with the new board

        console.log("New Board Created:", newBoard); // Log the response from the API

        setKanbanBoards((prevBoards) => [...prevBoards, newBoard]);
        setIsModalOpen(false); // Close the modal after adding the board
      })
      .catch((error) => {
        console.error("Error creating new Kanban board:", error);
      });
  };
  

  const handleButtonClick = () => {
    setIsButtonClicked(true);
    setIsModalOpen(true);

    // Reset the button click effect after a short delay
    setTimeout(() => {
      setIsButtonClicked(false);
    }, 200);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">YOUR PROJECTS</h1>
      <div
        className={`bg-yellow-500 rounded-full w-14 h-14 flex items-center justify-center m-2 cursor-pointer transition-transform ${
          isButtonClicked ? "scale-95" : "hover:scale-110"
        }`}
        onClick={handleButtonClick} // Trigger button click handler
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v12m6-6H6"
          />
        </svg>
      </div>
      <div className="flex flex-wrap">
        {kanbanBoards.map((board: KanbanBoard) => (
          <BoardCard
            key={board.id}
            id={board.id.toString()}
            title={board.name}
            dueDate={board.dueDate}
          />
        ))}
      </div>

      {/* AddBoardForm Modal */}
      <AddBoardForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleAddBoard}  // Now it also takes description as an argument
    />

    </div>
  );
}

const BoardCard = ({
  id,
  title,
  dueDate,
}: {
  id: string;
  title: string;
  dueDate: string;
}) => {
  const navigate = useNavigate();

  const handleCardClick = (id: string) => {
    navigate(`/boards/${id}`);
  };

  return (
    <div
      className="bg-yellow-500 text-black rounded-lg shadow-md p-4 m-2 w-56 h-36 relative border rounded cursor-pointer hover:bg-gray-100 hover:shadow-lg transition-transform transform hover:scale-105"
      onClick={() => handleCardClick(id)}
    >
      <div className="flex justify-between">
        <h3 className="font-bold text-lg">{title}</h3>
        <button className="text-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </button>
      </div>
      <p className="absolute bottom-4 left-4 text-sm flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4 mr-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        Due {dueDate}
      </p>
    </div>
  );
};
