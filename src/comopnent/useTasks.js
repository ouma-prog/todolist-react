// useTasks.js
import { useState, useEffect, useCallback } from 'react';

function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  // Fonction pour ajouter une tâche
  const addTask = useCallback(() => {
    if (newTask.trim() === '') return;
    setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
    setNewTask('');
  }, [newTask, tasks]);

  // Fonction pour supprimer une tâche par son ID
  const deleteTask = useCallback(
    (taskId) => {
      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(updatedTasks);
    },
    [tasks]
  );

  // Fonction pour mettre à jour une tâche par son ID
  const updateTask = useCallback(
    (taskId, updatedText) => {
      const updatedTasks = tasks.map((task) =>
        task.id === taskId ? { ...task, text: updatedText } : task
      );
      setTasks(updatedTasks);
    },
    [tasks]
  );

  // Filtrage des tâches
  const filter = useCallback(
    (filterType) => {
      switch (filterType) {
        case 'completed':
          return tasks.filter((task) => task.completed);
        case 'uncompleted':
          return tasks.filter((task) => !task.completed);
        default:
          return tasks;
      }
    },
    [tasks]
  );

  // Sauvegarde des tâches dans le local storage
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Chargement des tâches depuis le local storage au chargement de l'application
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  return {
    tasks,
    newTask,
    setNewTask,
    addTask,
    deleteTask,
    updateTask,
    filter,
  };
}

export default useTasks;
