import { useEffect, useState } from "react";
import KanbanAPI from "../../api/kanbanAPI";
import Loader from "../loaders/loader";
import { Kanban } from "../../utilities/types";
import KanbanDisplay from "./kanban-display";

export default function kanbanSingularView({ id }: { id: string }) {
  const [kanban, setKanban] = useState(undefined as Kanban | undefined);

  useEffect(() => {
    const subscription = KanbanAPI.getKanbanBoardObservable(id).subscribe(
      (response) => {
        console.log(response.data);
        setKanban(response.data);
      }
    );

    // prevent memory leak
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return kanban ? <KanbanDisplay kanban={kanban} /> : <Loader />;
}
