import { Task } from "./types";

export default function KanbanCard({
  task,
  setActiveTaskMethod,
}: {
  task: Task;
  setActiveTaskMethod: (task: Task) => () => void;
}) {
  const urgencyToColor = (urgency: number): string => {
    switch (urgency) {
      case 1:
        return "bg-red-500";
      case 2:
        return "bg-yellow-500";
      case 3:
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };
  return (
    <div
      className="relative bg-[#2e223b] text-white rounded-lg p-4 shadow-md"
      onClick={setActiveTaskMethod(task)}
    >
      <span
        className={`absolute top-2 right-2 w-3 h-3 rounded-full ${urgencyToColor(
          task.urgency
        )}`}
      ></span>
      <h3 className="text-lg font-semibold">{task.name}</h3>
    </div>
  );
}
