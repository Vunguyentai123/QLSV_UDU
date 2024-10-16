import React, { useState, useEffect } from 'react';
import './App.css';

function Task({ task, onToggleComplete, onDelete }) {
    return (
        <div className="task">
            <div>
                <p>{task.text}</p>
                <p className="text-sm text-gray-600">Deadline: {task.deadline}</p>
            </div>
            <div>
                <button onClick={onToggleComplete} className={task.completed ? 'completed' : ''}>
                    {task.completed ? '✔️' : '❌'}
                </button>
                <button onClick={onDelete} className="delete-button">🗑️</button>
            </div>
        </div>
    );
}

export default function TodoList() {
    const [tasks, setTasks] = useState(() => {
        // Lấy danh sách nhiệm vụ từ localStorage khi khởi tạo
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });
    const [newTask, setNewTask] = useState("");
    const [deadline, setDeadline] = useState("");

    useEffect(() => {
        // Lưu danh sách nhiệm vụ vào localStorage mỗi khi danh sách thay đổi
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (e) => {
        e.preventDefault();
        if (newTask.trim() !== "" && deadline.trim() !== "") {
            const newTaskObj = {
                text: newTask,
                deadline: deadline,
                color: "#f9f9f9", // Màu mặc định cho nhiệm vụ mới
                completed: false // Trạng thái hoàn thành mặc định là false
            };
            setTasks([...tasks, newTaskObj]);
            setNewTask("");
            setDeadline("");
        }
    };

    const toggleCompleteTask = (index) => {
        const newTasks = tasks.map((task, i) => {
            if (i === index) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        setTasks(newTasks);
    };

    const deleteTask = (index) => {
        const newTasks = tasks.filter((_, i) => i !== index);
        setTasks(newTasks);
    };

    return (
        <div className="TodoList">
            <h1>Todo List</h1>
            <form onSubmit={addTask}>
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Add a new task"
                />
                <input
                    type="datetime-local"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                />
                <button type="submit">Add Task</button>
            </form>
            <div className="task-list">
                {tasks.map((task, index) => (
                    <Task
                        key={index}
                        task={task}
                        onToggleComplete={() => toggleCompleteTask(index)}
                        onDelete={() => deleteTask(index)}
                    />
                ))}
            </div>
        </div>
    );
}
