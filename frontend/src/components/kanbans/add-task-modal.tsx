import React, { useState } from 'react';
import Modal from '../modal/modal';
import Field from '../forms/field';
import Button from '../buttons/button';
import TaskAPI from '../../api/taskAPI';

type AddTaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
  boardId: number;
};

const AddTaskModal: React.FC<AddTaskModalProps> = ({ isOpen, onClose, boardId }) => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [dueDate, setDueDate] = useState<string>('');
  const [urgency, setUrgency] = useState(1); 
  const [status, setStatus] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTask = {
      name,
      description,
      dueDate,
      urgency,
      status,
      boardId,
    };

    TaskAPI.createTask(newTask)
      .then(() => {
        onClose(); // Close the modal after adding the task
      })
      .catch((err) => console.error(err));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="p-4">
        <h2 className="text-2xl font-bold mb-4">Add New Task</h2>
        <Field
          label="Task Name"
          type="text"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          placeholder="Enter task name"
          required
        />
        <Field
          label="Description"
          type="text"
          value={description}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
          placeholder="Enter task description"
          required
        />
        <Field
          label="Due Date"
          type="date"
          value={dueDate}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDueDate(e.target.value)}
          required
        />
        <Field
          label="Assign To"
          type="text"
          value={status}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStatus(e.target.value)}
          placeholder="Enter the member"
          required
        />

        {/* Urgency Dropdown */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Urgency</label>
          <select
            value={urgency}
            onChange={(e) => setUrgency(Number(e.target.value))}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            required
          >
            <option value={1}>High</option>
            <option value={2}>Medium</option>
            <option value={3}>Low</option>
          </select>
        </div>

        <Button type="submit">Add Task</Button>
      </form>
    </Modal>
  );
};

export default AddTaskModal;
