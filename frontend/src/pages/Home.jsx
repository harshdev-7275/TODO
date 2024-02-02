import React, { useEffect, useState } from 'react';
import { useTaskContext } from '../context/TaskContext';
import Task from '../components/Task';
import { Colors } from '../Colors';

import Modal from '../components/Modal';

const Home = () => {
  const { state, fetchTasks } = useTaskContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTaskHandler = () => {
    setIsModalOpen(true);
  };

  const closeNewTaskModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-[1400px] mx-auto mt-[5rem] container relative overflow-hidden">
      <div className="w-full">
        <button
          onClick={addTaskHandler}
          className="fixed right-20 top-50 px-3 border-2 py-3 font-bold rounded-md outline-none"
        >
          Add New Task
        </button>

        <ul className="grid grid-cols-3 gap-1">
          {state.tasks.map(task => (
            <Task key={task.id} task={task} />
          ))}
        </ul>
      </div>

      {isModalOpen && <Modal onClose={closeNewTaskModal} />}
    </div>
  );
};

export default Home;
