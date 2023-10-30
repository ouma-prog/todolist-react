import React, { useState } from 'react';

function TaskItem({ task, deleteTask, updateTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedText, setUpdatedText] = useState(task.text);

  const handleUpdate = () => {
    updateTask(task.id, updatedText);
    setIsEditing(false);
  };

  return (
    <li>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={updatedText}
            onChange={(e) => setUpdatedText(e.target.value)}
          />
          <button onClick={handleUpdate}>Mettre à jour</button>
        </div>
      ) : (
        <div>
          <span
            style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
          >
            {task.text}
          </span>
          <button onClick={() => deleteTask(task.id)}>Supprimer</button>
          <button onClick={() => setIsEditing(true)}>Modifier</button>
        </div>
      )}
    </li>
  );
}

export default TaskItem;
