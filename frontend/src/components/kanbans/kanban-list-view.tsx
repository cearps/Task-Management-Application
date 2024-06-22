import { useEffect, useState } from "react";
import KanbanAPI from "../../api/kanbanAPI";

export default function KanbanListView() {
  const [kanbanBoards, setKanbanBoards] = useState([]);

  useEffect(() => {
    KanbanAPI.getKanbanBoardObservable().subscribe((response) => {
      console.log(response.data);
      setKanbanBoards(response.data);
    });
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">YOUR PROJECTS</h1>
      <div className="bg-yellow-500 rounded-full w-14 h-14 flex items-center justify-center m-2 cursor-pointer">
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
            d="M12 6v6h6m-6 0H6"
          />
        </svg>
      </div>
      <div className="flex flex-wrap">
        {kanbanBoards.map((board: any) => (
          <BoardCard title={board.name} dueDate={board.dueDate} />
        ))}
      </div>
    </div>
  );
}

const BoardCard = ({ title, dueDate }: { title: string; dueDate: string }) => {
  return (
    <div className="bg-yellow-500 text-black rounded-lg shadow-md p-4 m-2 w-56 h-36 relative">
      <div className="flex justify-between">
        <h3 className="font-bold text-lg">{title}</h3>
        <button className="text-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 13.5l3-3 3 3m0 0l-3 3-3-3m3 3V6.75M6.75 21h10.5a4.5 4.5 0 004.5-4.5V6.75a4.5 4.5 0 00-4.5-4.5H6.75A4.5 4.5 0 002.25 6.75v10.5A4.5 4.5 0 006.75 21z"
            />
          </svg>
        </button>
      </div>
      <p className="absolute bottom-4 left-4 text-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="inline w-4 h-4 mr-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6h6M18 12H6m6 0H3"
          />
        </svg>
        Due {dueDate}
      </p>
    </div>
  );
};
