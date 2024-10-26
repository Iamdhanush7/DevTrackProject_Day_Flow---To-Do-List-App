import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import './Personal.css';

function Personal() {
  const [personalPendingTasks, setPersonalPendingTasks] = useState(() => {
    const savedTasks = localStorage.getItem('personalPendingTasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [personalCompletedTasks, setPersonalCompletedTasks] = useState(() => {
    const savedTasks = localStorage.getItem('personalCompletedTasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [personalTaskInput, setPersonalTaskInput] = useState('');

  const handlePersonalTaskInputChange = (event) => {
    setPersonalTaskInput(event.target.value);
  };

  const handleAddPersonalTask = () => {
    if (personalTaskInput.trim() !== '') {
      const newTasks = [...personalPendingTasks, personalTaskInput];
      setPersonalPendingTasks(newTasks);
      localStorage.setItem('personalPendingTasks', JSON.stringify(newTasks));
      setPersonalTaskInput('');
    }
  };

  const handleCompletePersonalTask = (index) => {
    const taskToComplete = personalPendingTasks[index];
    const newCompletedTasks = [...personalCompletedTasks, taskToComplete];
    setPersonalCompletedTasks(newCompletedTasks);
    localStorage.setItem('personalCompletedTasks', JSON.stringify(newCompletedTasks));
    const newPendingTasks = personalPendingTasks.filter((task, i) => i !== index);
    setPersonalPendingTasks(newPendingTasks);
    localStorage.setItem('personalPendingTasks', JSON.stringify(newPendingTasks));
  };

  const handleDeletePersonalPendingTask = (index) => {
    const newPendingTasks = personalPendingTasks.filter((task, i) => i !== index);
    setPersonalPendingTasks(newPendingTasks);
    localStorage.setItem('personalPendingTasks', JSON.stringify(newPendingTasks));
  };

  const handleDeletePersonalCompletedTask = (index) => {
    const newCompletedTasks = personalCompletedTasks.filter((task, i) => i !== index);
    setPersonalCompletedTasks(newCompletedTasks);
    localStorage.setItem('personalCompletedTasks', JSON.stringify(newCompletedTasks));
  };

  return (
    <div className="work-main-container">
      <div className="tasks-container">
        <div className="pending-work">
          <h2>Pending Tasks</h2>
          <ul>
            {personalPendingTasks.map((task, index) => (
              <li key={index}>
                {task}
                <button onClick={() => handleCompletePersonalTask(index)}>
                  <FontAwesomeIcon icon={faCheck} /> {/* Tick mark icon for complete button */}
                </button>
                <button onClick={() => handleDeletePersonalPendingTask(index)}>
                  <FontAwesomeIcon icon={faTimes} /> {/* Cross mark icon for delete button */}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="completed-work">
          <h2>Completed Tasks</h2>
          <ul>
            {personalCompletedTasks.map((task, index) => (
              <li key={index}>
                {task}
                <button onClick={() => handleDeletePersonalCompletedTask(index)}>
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
          value={personalTaskInput}
          onChange={handlePersonalTaskInputChange}
          placeholder="Enter pending personal task"
        />
        <button onClick={handleAddPersonalTask} type="add">+ Add Task</button>
      </div>
    </div>
  );
}

export default Personal;
