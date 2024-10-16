import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { v4 as uuidv4 } from 'uuid';

// Hàm tạo màu ngẫu nhiên
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Thành phần Task
function Task({ task, onComplete }) {
    if (!task || !onComplete) return null;

    return (
        <div className="flex items-center justify-between p-2 border rounded mb-2" style={{ backgroundColor: task.color }}>
            <div>
                <p>{task.text}</p>
                <p className="text-sm text-gray-600">Deadline: {task.deadline}</p>
            </div>
            <button onClick={onComplete} className="text-red-500">Complete</button>
        </div>
    );
}

// Thành phần chính TodoList
export default function TodoList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [deadline, setDeadline] = useState("");

    const addTask = (e) => {
        e.preventDefault();
        if (newTask.trim() !== "" && deadline.trim() !== "") {
            const newTaskObj = {
                text: newTask,
                deadline: deadline,
                color: "#f9f9f9" // Màu mặc định cho nhiệm vụ mới
            };
            setTasks([...tasks, newTaskObj]);
            setNewTask("");
            setDeadline("");
        }
    };

    const completeTask = (index) => {
        const newTasks = tasks.filter((_, i) => i !== index);
        setTasks(newTasks);
    };

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-4">Todo List</h1>
            <form onSubmit={addTask} className="mb-4">
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Add a new task"
                    className="border p-2 mr-2"
                />
                <input
                    type="datetime-local"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="border p-2 mr-2"
                />
                <button type="submit" className="bg-blue-500 text-white p-2">Add</button>
            </form>
            <div>
                <AnimatePresence>
                    {tasks.map((task, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.3 }}
                            
                        >
                            <Task task={task} onComplete={() => completeTask(index)} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}
