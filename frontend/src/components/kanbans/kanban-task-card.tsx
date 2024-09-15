import { KanbanTask } from "../../utilities/types";
import urgencyToColour from "../../utilities/urgency-colour-mapping";
import { Draggable } from "react-beautiful-dnd";

export default function KanbanCard({
  task,
  setActiveTaskMethod,
  index,
}: {
  task: KanbanTask;
  setActiveTaskMethod: (task: KanbanTask) => () => void;
  index: number;
}) {
  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided, snapshot) => (
        <div
          className="relative bg-[#2e223b] text-white rounded-lg p-4 shadow-md cursor-pointer hover:bg-gray-100 hover:text-black hover:shadow-lg transition-transform transform hover:scale-105"
          onClick={setActiveTaskMethod(task)}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            userSelect: "none",
            backgroundColor: snapshot.isDragging ? "#263B4A" : "",
            ...provided.draggableProps.style,
          }}
        >
          <span
            className={`absolute top-2 right-2 w-3 h-3 rounded-full ${urgencyToColour(
              task.urgency
            )}`}
          ></span>
          <h3 className="text-lg font-semibold">{task.name}</h3>
        </div>
      )}
    </Draggable>
  );
}
