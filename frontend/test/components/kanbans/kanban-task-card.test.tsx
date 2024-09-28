import KanbanCard from "../../../src/components/kanbans/kanban-task-card";
import { render } from "@testing-library/react";
import { KanbanTask } from "../../../src/utilities/types";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

describe("KanbanCard", () => {
  it("renders without crashing", () => {
    render(
      <DragDropContext>
        {(provided: any, snapshot: any) => (
          <Droppable droppableId="0">
            {console.log(provided, snapshot)}
            <KanbanCard
              task={{
                id: 0,
                name: "",
                description: "",
                dueDate: "",
                urgency: 0,
                taskCategory: 0,
                users: [],
                comments: [],
              }}
              position={0}
              setActiveTaskMethod={(task: KanbanTask) => () => task}
              currentUser={null}
            />
          </Droppable>
        )}
      </DragDropContext>
    );
  });
});
