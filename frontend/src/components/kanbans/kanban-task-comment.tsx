import { Comment } from "../../utilities/types";

const KanbanTaskComment = ({ comment }: { comment: Comment }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="ml-3">
            <h3 className="font-bold text-lg text-black">
              {comment.user.userTag}
            </h3>
            <p className="text-sm text-gray-500">{comment.timestamp}</p>
          </div>
        </div>
      </div>
      <p className="mt-3 text-gray-700">{comment.comment}</p>
    </div>
  );
};

export default KanbanTaskComment;
