import React, { useCallback } from 'react'; // Importez useCallback

import TaskItem from './TaskItem';
import useTasks from './useTasks';

function TaskList() {
  const {
    newTask,
    setNewTask,
    addTask,
    deleteTask,
    updateTask,
    filter,
  } = useTasks();

  // Mémorisez la fonction addTask avec useCallback
  const addTaskCallback = useCallback(
    () => {
      addTask();
    },
    [addTask]
  );

  return (
    <div className="App">
      <div>
        <input
          type="text"
          placeholder="Nouvelle tâche"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        {/* Utilisez la fonction mémorisée addTaskCallback */}
        <button onClick={addTaskCallback}>Ajouter</button>
      </div>
      <ul>
        {filter('all').map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            updateTask={updateTask}
          />
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
