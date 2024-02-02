// NewTaskModal.js
import React, { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';

const Modal = ({ onClose }) => {
  const { createTask } = useTaskContext();
  const [title, setTitle] = useState('');

  const handleCreateTask = () => {
    if (title.trim() !== '') {
      createTask({ title, completed: false });
      onClose();
    }
  };

  return (
    <div className="fixed top-1/2 left-1/2 opacity-95 transform -translate-x-1/2 -translate-y-1/2 bg-black p-4 rounded-md shadow-lg border-white border-2">
      <h2 className="text-2xl font-bold mb-4">Add New Task</h2>
      <input
        type="text"
        placeholder="Enter task title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="w-full p-2 mb-4 text-white bg-black border-b-2 rounded-md outline-none"
      />
      <button
        onClick={handleCreateTask}
        className="bg-green-600 text-white px-4 py-2 rounded-md"
      >
        Add Task
      </button>
      <button onClick={onClose} className="ml-2 text-white">
        Cancel
      </button>
    </div>
  );
};

export default Modal;
