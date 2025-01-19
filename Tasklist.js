import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Task from './Task';

const TaskList = ({ setIsAuthenticated }) => {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState("");

    const fetchTasks = async () => {
        try {
            const token = localStorage.getItem('token');
            const { data } = await axios.get('http://localhost:5000/api/tasks', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setTasks(data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const addTask = async () => {
        if (!task.trim()) return;
        try {
            const token = localStorage.getItem('token');
            await axios.post(
                'http://localhost:5000/api/tasks',
                { task },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setTask("");
            fetchTasks();
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    const toggleTaskStatus = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(
                `http://localhost:5000/api/tasks/${id}`,
                { completed: !tasks.find((t) => t._id === id).completed },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchTasks();
        } catch (error) {
            console.error('Error toggling task status:', error);
        }
    };

    const deleteTask = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchTasks();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div>
            <h1>To-Do List</h1>
            <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Enter a task"
            />
            <button onClick={addTask}>Add</button>
            <ul>
                {tasks.map((t) => (
                    <Task key={t._id} task={t} toggleTaskStatus={toggleTaskStatus} deleteTask={deleteTask} />
                ))}
            </ul>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default TaskList;
