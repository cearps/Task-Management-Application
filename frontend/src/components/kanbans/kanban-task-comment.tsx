import { useEffect, useState } from "react";
import { Comment, User } from "../../utilities/types";
import UserAPI from "../../api/userAPI";

const KanbanTaskComment = ({ comment }: { comment: Comment }) => {
  const [user, setUser] = useState(null as User | null);

  useEffect(() => {
    const subscription = UserAPI.getUserObservable(
      comment.userId.toString()
    ).subscribe((response) => {
      console.log(response.data);
      setUser(response.data);
    });

    // prevent memory leak
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="ml-3">
            <h3 className="font-bold text-lg text-black">{user?.username}</h3>
            <p className="text-sm text-gray-500">
              {new Date(comment.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
      <p className="mt-3 text-gray-700">{comment.content}</p>
    </div>
  );
};

export default KanbanTaskComment;
