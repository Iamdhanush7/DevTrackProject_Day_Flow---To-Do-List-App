import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

import './Work.css';

function Work() {
  const [pendingTasks, setPendingTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [showAllPendingTasks, setShowAllPendingTasks] = useState(false);
  const [showAllCompletedTasks, setShowAllCompletedTasks] = useState(false);

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const storedPendingTasks = JSON.parse(localStorage.getItem('pendingTasks')) || [];
    const storedCompletedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];
    setPendingTasks(storedPendingTasks);
    setCompletedTasks(storedCompletedTasks);
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('pendingTasks', JSON.stringify(pendingTasks));
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
  }, [pendingTasks, completedTasks]);

  const handleTaskInputChange = (event) => {
    setTaskInput(event.target.value);
  };

  const handleAddTask = () => {
    if (taskInput.trim() !== '') {
      setPendingTasks([...pendingTasks, taskInput]);
      setTaskInput('');
    }
  };

  const handleCompleteTask = (index) => {
    const taskToComplete = pendingTasks[index];
    setCompletedTasks([...completedTasks, taskToComplete]);
    setPendingTasks(pendingTasks.filter((task, i) => i !== index));
  };

  const handleDeletePendingTask = (index) => {
    setPendingTasks(pendingTasks.filter((task, i) => i !== index));
  };

  const handleDeleteCompletedTask = (index) => {
    setCompletedTasks(completedTasks.filter((task, i) => i !== index));
  };

  return (
     <div className="work-main-container">
      <div className="tasks-container">
        <div className="pending-work">
          <h2>Pending Tasks</h2>
          <ul>
            {pendingTasks.map((task, index) => (
              <li key={index}>
                {task}
                <button onClick={() => handleCompleteTask(index)}>
                  <FontAwesomeIcon icon={faCheck} /> {/* Tick mark icon for complete button */}
                </button>
                <button onClick={() => handleDeletePendingTask(index)}>
                  <FontAwesomeIcon icon={faTimes} /> {/* Cross mark icon for delete button */}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="completed-work">
          <h2>Completed Tasks</h2>
          <ul>
            {completedTasks.map((task, index) => (
              <li key={index}>
                {task}
                <button onClick={() => handleDeleteCompletedTask(index)}>
                  <FontAwesomeIcon icon={faTimes} /> {/* Cross mark icon for delete button */}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="work-input">
        <input
          type="text"
          value={taskInput}
          onChange={handleTaskInputChange}
          placeholder="Enter task"
        />
        <button onClick={handleAddTask} type="add">+ Add Task</button>
      </div>
    </div>
  );
}

export default Work;
