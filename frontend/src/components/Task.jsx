import React, { useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { useTaskContext } from '../context/TaskContext';
import { FaEdit } from 'react-icons/fa';

const Task = ({ task }) => {
  const { updateTask, deleteTask } = useTaskContext();
  const [title, setTitle] = useState(task.title);
  const [isTitleChange, setIsTitleChange] = useState(false);

  const handleCompleteToggle = () => {
    const updatedTask = {
      ...task,
      completed: !task.completed,
      title,
    };
    updateTask(task.id, updatedTask);
    setIsTitleChange(false);
  };

  const handleDelete = () => {
    deleteTask(task.id);
  };

  const editHandler = () => {
    setIsTitleChange(true);
  };

  const saveHandler = () => {
    const updatedTask = {
      ...task,
      title,
    };
    updateTask(task.id, updatedTask);
    setIsTitleChange(false);
  };

  const onChangeInput = e => {
    if (e.target.value.length <= 20) {
      setTitle(e.target.value);
    }
  };

  return (
    <div
      className={` w-[350px] h-[250px] bg-[#222] mt-[3rem] py-6 p-4 rounded-lg flex flex-col items-start justify-start gap-4 overflow-hidden`}
    >
      <div className="text-4xl text-center">
        {isTitleChange ? (
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={title}
              onChange={onChangeInput}
              className="w-[200px] bg-transparent text-2xl border-b-2 outline-none"
            />
            <button className="text-xl " onClick={saveHandler}>
              Save
            </button>
          </div>
        ) : (
          <div className="text-4xl text-center flex items-center gap-3 overflow-hidden text-clip">
            <h1 className="">{task.title} </h1>
            <span>
              <FaEdit size={30} onClick={editHandler} />
            </span>
          </div>
        )}
      </div>
      <div className="flex items-center justify-center gap-2">
        Status:
        <span
          className={`${task.completed ? 'text-green-600' : 'text-red-700'}`}
        >
          {task.completed ? 'Completed' : 'Not Completed'}
        </span>
      </div>
      <div>
        <button onClick={handleCompleteToggle}>
          {task.completed ? 'Mark as Not Completed' : 'Mark as Completed'}
        </button>
      </div>
      <MdDelete size={28} onClick={handleDelete} className="cursor-pointer" />
    </div>
  );
};

export default Task;
