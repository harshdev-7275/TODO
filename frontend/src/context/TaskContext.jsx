import React, { createContext, useReducer, useContext } from 'react';
import axios from 'axios';

const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

const TaskContext = createContext();

const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  const fetchTasks = async () => {
    dispatch({ type: 'FETCH_TASKS_REQUEST' });

    try {
      const response = await axios.get('http://localhost:5000/api/todos');
      dispatch({ type: 'FETCH_TASKS_SUCCESS', payload: response.data });
    } catch (error) {
      dispatch({ type: 'FETCH_TASKS_FAILURE', payload: error.message });
    }
  };

  const fetchTask = async id => {
    dispatch({ type: 'FETCH_TASK_REQUEST' });

    try {
      const response = await axios.get(`http://localhost:5000/api/todos/${id}`);
      dispatch({ type: 'FETCH_TASK_SUCCESS', payload: response.data });
    } catch (error) {
      dispatch({ type: 'FETCH_TASK_FAILURE', payload: error.message });
    }
  };

  const createTask = async taskData => {
    dispatch({ type: 'CREATE_TASK_REQUEST' });

    try {
      const response = await axios.post(
        'http://localhost:5000/api/todos',
        taskData
      );
      dispatch({ type: 'CREATE_TASK_SUCCESS', payload: response.data });
    } catch (error) {
      dispatch({ type: 'CREATE_TASK_FAILURE', payload: error.message });
    }
  };

  const updateTask = async (id, updates) => {
    dispatch({ type: 'UPDATE_TASK_REQUEST' });

    try {
      const response = await axios.put(
        `http://localhost:5000/api/todos/${id}`,
        updates
      );
      dispatch({ type: 'UPDATE_TASK_SUCCESS', payload: response.data });
    } catch (error) {
      dispatch({ type: 'UPDATE_TASK_FAILURE', payload: error.message });
    }
  };

  const deleteTask = async id => {
    dispatch({ type: 'DELETE_TASK_REQUEST' });

    try {
      await axios.delete(`http://localhost:5000/api/todos/${id}`);
      dispatch({ type: 'DELETE_TASK_SUCCESS', payload: id });
    } catch (error) {
      dispatch({ type: 'DELETE_TASK_FAILURE', payload: error.message });
    }
  };

  return (
    <TaskContext.Provider
      value={{
        state,
        dispatch,
        fetchTasks,
        fetchTask,
        createTask,
        updateTask,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};

const taskReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_TASKS_REQUEST':
    case 'FETCH_TASK_REQUEST':
    case 'CREATE_TASK_REQUEST':
    case 'UPDATE_TASK_REQUEST':
    case 'DELETE_TASK_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'FETCH_TASKS_SUCCESS':
      return {
        ...state,
        tasks: action.payload,
        loading: false,
        error: null,
      };
    case 'FETCH_TASK_SUCCESS':
      return {
        ...state,
        task: action.payload,
        loading: false,
        error: null,
      };
    case 'CREATE_TASK_SUCCESS':
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
        loading: false,
        error: null,
      };
    case 'UPDATE_TASK_SUCCESS':
      const updatedTasks = state.tasks.map(task =>
        task.id === action.payload.id ? action.payload : task
      );
      return {
        ...state,
        tasks: updatedTasks,
        loading: false,
        error: null,
      };
    case 'DELETE_TASK_SUCCESS':
      const filteredTasks = state.tasks.filter(
        task => task.id !== action.payload
      );
      return {
        ...state,
        tasks: filteredTasks,
        loading: false,
        error: null,
      };
    case 'FETCH_TASKS_FAILURE':
    case 'FETCH_TASK_FAILURE':
    case 'CREATE_TASK_FAILURE':
    case 'UPDATE_TASK_FAILURE':
    case 'DELETE_TASK_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export { TaskProvider, useTaskContext };
