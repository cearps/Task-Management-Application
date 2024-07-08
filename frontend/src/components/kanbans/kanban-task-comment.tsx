import { useEffect, useState } from "react";
import { Comment, User } from "../../utilities/types";
import UserAPI from "../../api/userAPI";

const KanbanTaskComment = ({ comment }: { comment: Comment }) => {
  const [user, setUser] = useState(null as User | null);

  useEffect(() => {
    UserAPI.getUserObservable(comment.userId.toString()).subscribe(
      (response) => {
        console.log(response.data);
        setUser(response.data);
      }
    );
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="ml-2">
            <h3 className="font-bold">{user?.username}</h3>
            <p className="text-sm text-gray-500">{comment.createdAt}</p>
          </div>
        </div>
      </div>
      <p className="mt-2">{comment.content}</p>
    </div>
  );
};

export default KanbanTaskComment;
