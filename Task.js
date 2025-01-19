import React from 'react';

const Task = ({ task, toggleTaskStatus, deleteTask }) => {
    return (
        <li>
            <span
                style={{
                    textDecoration: task.completed ? 'line-through' : 'none',
                }}
                onClick={() => toggleTaskStatus(task._id)}
            >
                {task.task}
            </span>
            <button onClick={() => deleteTask(task._id)}>Delete</button>
        </li>
    );
};

export default Task;
