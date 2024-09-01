import React, { useState, useEffect } from 'react';
import Modal from '../modal/Modal';

type EditBoardFormProps = {
  isOpen: boolean;
  onClose: () => void;
  boardName: string;
  boardDueDate: string;
  onSubmit: (name: string, dueDate: string) => void;
};

const EditBoardForm: React.FC<EditBoardFormProps> = ({ isOpen, onClose, boardName, boardDueDate, onSubmit }) => {
  const [name, setName] = useState(boardName);
  const [dueDate, setDueDate] = useState(boardDueDate);

  useEffect(() => {
    setName(boardName);
    setDueDate(boardDueDate);
  }, [boardName, boardDueDate]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(name, dueDate);
    onClose(); // Close the modal after submission
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="p-4">
        <h2 className="text-2xl font-bold mb-4">Edit Board</h2>
        <div className="mb-4">
          <label className="block text-white font-semibold mb-2">Board Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter board name"
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block text-white font-semibold mb-2">Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">Save Changes</button>
      </form>
    </Modal>
  );
};

export default EditBoardForm;
