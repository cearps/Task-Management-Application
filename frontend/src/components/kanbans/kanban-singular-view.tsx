import { useEffect, useState } from "react";
import KanbanAPI from "../../api/kanbanAPI";
import Loader from "../loaders/loader";
import { Kanban } from "./types";
import KanbanDisplay from "./kanban-display";

export default function kanbanSingularView({ id }: { id: string }) {
  const [kanban, setKanban] = useState(undefined as Kanban | undefined);

  useEffect(() => {
    KanbanAPI.getKanbanBoardObservable(id).subscribe((response) => {
      console.log(response.data);
      setKanban(response.data);
    });
  }, []);

  return kanban ? <KanbanDisplay kanban={kanban} /> : <Loader />;
}
