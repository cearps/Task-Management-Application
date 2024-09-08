import { useState, useEffect } from "react";
import KanbanAPI from "../../api/kanbanAPI";
import { useNavigate } from "react-router-dom";
import { KanbanBoard } from "../../utilities/types";
import AddBoardForm from "../forms/add-board-form";

export default function KanbanListView() {
  const [kanbanBoards, setKanbanBoards] = useState([] as KanbanBoard[]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBoard, setEditingBoard] = useState<KanbanBoard | null>(null); 

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const boards = await KanbanAPI.getKanbanBoards();
        setKanbanBoards(boards);
      } catch (error) {
        console.error("Error fetching Kanban boards:", error);
      }
    };

    fetchBoards();
  }, []);

  const handleAddBoard = async (name: string, dueDate: string, description: string) => {
    try {
      if (editingBoard) {
        // If we're editing a board, update it
        const updatedBoard = await KanbanAPI.updateKanbanBoard(editingBoard.id, { name, dueDate, description });
        setKanbanBoards((prevBoards) => prevBoards.map((board) => (board.id === updatedBoard.id ? updatedBoard : board)));
        setEditingBoard(null); // Reset after editing
      } else {
        // Otherwise, create a new board
        const newBoard = await KanbanAPI.createKanbanBoard();
        const updatedBoard = await KanbanAPI.updateKanbanBoard(newBoard.id, { name, dueDate, description });
        setKanbanBoards((prevBoards) => [...prevBoards, updatedBoard]);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating or updating the Kanban board:", error);
    }
  };

  // Function to handle deleting a board
  const handleDeleteBoard = async (id: number) => {
    try {
      await KanbanAPI.deleteKanbanBoard(id);
      setKanbanBoards((prevBoards) => prevBoards.filter((board) => board.id !== id));
    } catch (error) {
      console.error("Error deleting Kanban board:", error);
    }
  };

  // Function to handle editing a board
  const handleEditBoard = (board: KanbanBoard) => {
    setEditingBoard(board); 
    setIsModalOpen(true);   
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">YOUR PROJECTS</h1>
      <div
        className="bg-yellow-500 rounded-full w-14 h-14 flex items-center justify-center m-2 cursor-pointer transition-transform hover:scale-110"
        onClick={() => setIsModalOpen(true)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
        </svg>
      </div>
      <div className="flex flex-wrap">
        {kanbanBoards.map((board: KanbanBoard) => (
          <BoardCard
            key={board.id}
            id={board.id}
            title={board.name}
            dueDate={board.dueDate}
            onDelete={handleDeleteBoard}
            onEdit={() => handleEditBoard(board)} 
          />
        ))}
      </div>

      {/* AddBoardForm Modal */}
      <AddBoardForm
  isOpen={isModalOpen}
  onClose={() => {
    setIsModalOpen(false);
    setEditingBoard(null); 
  }}
  onSubmit={handleAddBoard}
  defaultValues={editingBoard ? { name: editingBoard.name, dueDate: editingBoard.dueDate, description: editingBoard.description } : undefined} // Use undefined when editingBoard is null
/>

    </div>
  );

}
  const BoardCard = ({
    id,
    title,
    dueDate,
    onDelete,
    onEdit, 
  }: {
    id: number;
    title: string;
    dueDate: string;
    onDelete: (id: number) => void;
    onEdit: () => void; 
  }) => {
    const navigate = useNavigate();
  
    const handleCardClick = (id: number) => {
      navigate(`/boards/${id}`);
    };
  
    return (
      <div
        className="bg-yellow-500 text-black rounded-lg shadow-md p-4 m-2 w-56 h-36 relative border rounded cursor-pointer hover:bg-gray-100 hover:shadow-lg transition-transform transform hover:scale-105"
        onClick={() => handleCardClick(id)}
      >
        <div className="flex justify-between">
          <h3 className="font-bold text-lg">{title}</h3>
          
          <button className="text-black" onClick={(e) => {
            e.stopPropagation(); 
            onEdit(); 
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
            </svg>
          </button>
          
          <button className="text-black" onClick={(e) => {
            e.stopPropagation(); 
            onDelete(id);
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
          </button>
        </div>
        <p className="absolute bottom-4 left-4 text-sm flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Due {dueDate}
        </p>
      </div>
    );
  };