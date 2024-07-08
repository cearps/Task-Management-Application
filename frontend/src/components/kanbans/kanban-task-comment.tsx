import { Comment } from "./types";

const KanbanTaskComment = ({ comment }: { comment: Comment }) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="ml-2">
            <h3 className="font-bold"></h3>
            <p className="text-sm text-gray-500">2 hours ago</p>
          </div>
        </div>
        <div>
          <button className="text-gray-500 hover:text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
      <p className="mt-2">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et
        tincidunt nunc. Sed in metus ut purus tincidunt aliquet. Donec
        consectetur, nunc in tincidunt tincidunt, nunc odio lacinia purus, nec
        tincidunt sapien metus vitae nunc. Nulla facilisi. Nullam nec nunc
        consectetur, tincidunt nunc ac, tincidunt nunc. Donec et tincidunt nunc.
        Sed in metus ut purus tincidunt aliquet. Donec consectetur, nunc in
        tincidunt tincidunt, nunc odio lacinia purus, nec tincidunt sapien metus
        vitae nunc. Nulla facilisi. Nullam nec nunc consectetur, tincidunt nunc
        ac, tincidunt nunc.
      </p>
    </div>
  );
};

export default KanbanTaskComment;
