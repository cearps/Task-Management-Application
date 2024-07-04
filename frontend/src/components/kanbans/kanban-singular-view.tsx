import { useEffect, useState } from "react";
import KanbanAPI from "../../api/kanbanAPI";

export default function kanbanSingularView({ id }: { id: string }) {
  const [kanban, setKanban] = useState({});
  const [backlogTasks, setBacklogTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [inReviewTasks, setInReviewTasks] = useState([]);
  const [completeTasks, setCompleteTasks] = useState([]);

  useEffect(() => {
    KanbanAPI.getKanbanBoardObservable(id).subscribe((response) => {
      console.log(response.data);
      setKanban(response.data);
    });

    KanbanAPI.getKanbanBoardTasksObservable(id, "1").subscribe((response) => {
      console.log(response.data);
      setBacklogTasks(response.data);
    });

    KanbanAPI.getKanbanBoardTasksObservable(id, "2").subscribe((response) => {
      console.log(response.data);
      setInProgressTasks(response.data);
    });

    KanbanAPI.getKanbanBoardTasksObservable(id, "3").subscribe((response) => {
      console.log(response.data);
      setInReviewTasks(response.data);
    });

    KanbanAPI.getKanbanBoardTasksObservable(id, "4").subscribe((response) => {
      console.log(response.data);
      setCompleteTasks(response.data);
    });
  }, []);

  return (
    <div>
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">FIT3161 CONCEPT</h1>
        <div className="space-x-4">
          <span>START DATE: 24/04/2024</span>
          <span>TODAY'S DATE: 28/04/2024</span>
          <span>DUE DATE: 03/05/2024</span>
        </div>
      </header>
      <div className="grid grid-cols-4 gap-4">
        <KanbanColumn title="Task Backlog" tasks={backlogTasks} />
        <KanbanColumn title="In Progress" tasks={inProgressTasks} />
        <KanbanColumn title="In Review" tasks={inReviewTasks} />
        <KanbanColumn title="Complete" tasks={completeTasks} />
      </div>
      <NewTaskButton />
    </div>
  );
}

const KanbanColumn = ({ title, tasks }) => {
  return (
    <div className="bg-yellow-400 rounded-lg p-4">
      <h2 className="text-lg font-bold mb-4">{title}</h2>
      {tasks.map((task) => (
        <KanbanCard key={task.id} task={task} />
      ))}
    </div>
  );
};

const KanbanCard = ({ task }) => {
  const colorClass =
    task.color === "red"
      ? "bg-red-500"
      : task.color === "green"
      ? "bg-green-500"
      : "bg-orange-500";

  return (
    <div
      className={`bg-purple-800 text-white rounded-lg p-4 mb-4 ${colorClass}`}
    >
      <div className="flex justify-between">
        <span>{task.assigned}</span>
        <span
          className="w-4 h-4 rounded-full"
          style={{ backgroundColor: task.color }}
        ></span>
      </div>
      <h3 className="text-lg font-semibold mt-2">{task.title}</h3>
    </div>
  );
};
