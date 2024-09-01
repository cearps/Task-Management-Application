import React, { useState } from 'react';
import Modal from '../modal/Modal';

type AddBoardFormProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, dueDate: string) => void;
};

const AddBoardForm: React.FC<AddBoardFormProps> = ({ isOpen, onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(name, dueDate); // This currently just logs the data
    onClose(); // Close the modal after submission
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="p-4">
        <h2 className="text-2xl font-bold mb-4">Create New Board</h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Board Name</label>
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
          <label className="block text-gray-700 font-semibold mb-2">Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">Create Board</button>
      </form>
    </Modal>
  );
};

export default AddBoardForm;
