import { useParams } from "react-router-dom";
import Base from "../../components/sections/base";
import KanbanSingularView from "../../components/kanbans/kanban-singular-view"; // Import the KanbanSingularView component

export default function KanbanSingle() {
  const { boardId } = useParams();

  return (
    <Base pageTitle="Kanban123">
      <KanbanSingularView id={boardId ?? ""} />
    </Base>
  );
}
