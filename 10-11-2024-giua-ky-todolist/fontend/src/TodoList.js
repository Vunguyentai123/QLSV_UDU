import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function Todo({ todo, onToggleComplete, onDelete, onEdit }) {
    return (
        <div className="todo">
            <div>
                <p>{todo.title}</p>
                <p className="text-sm text-gray-600">Deadline: {todo.due_date}</p>
            </div>
            <div>
                <button onClick={onToggleComplete} className={todo.completed ? 'completed' : ''}>
                    {todo.completed ? '✔️' : '❌'}
                </button>
                <button onClick={onEdit} className="edit-button">✏️</button>
                <button onClick={onDelete} className="delete-button">🗑️</button>
            </div>
        </div>
    );
}

export default function TodoList() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState({
        title: '',
        due_date: '',
        completed: 0,
    });
    const [editingTodoIndex, setEditingTodoIndex] = useState(null);
    const [editingTodoText, setEditingTodoText] = useState('');
    const [editingTodoDueDate, setEditingTodoDueDate] = useState('');

    useEffect(() => {
        fetchTodos();
    }, [todos]);

    const fetchTodos = () => {
        axios.get('http://localhost:3001/api/todos')
            .then((response) => {
                setTodos(response.data);
            })
            .catch((error) => {
                console.error('Error fetching todos:', error);
            });
    }

    const handleAddTodo = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/api/todos', newTodo)
            .then((response) => {
                setTodos((prevTodos) => [...prevTodos, response.data]);
                setNewTodo({ title: '', due_date: '', completed: 0 });
            })
            .catch((error) => {
                console.error('Error adding todo:', error);
            });
    };

    const toggleCompleteTodo = (index) => {
        const todo = todos[index];
        axios.put(`http://localhost:3001/api/todos/${todo.id}`, {
            title: todo.title,
            completed: !todo.completed,
            due_date: new Date(todo.due_date).toISOString().split('T')[0] // Định dạng lại giá trị due_date
        })
        .then((response) => {
            const updatedTodos = [...todos];
            updatedTodos[index] = response.data;
            setTodos(updatedTodos);
        })
        .catch((error) => {
            console.error('Error updating todo:', error);
        });
    };

    const deleteTodo = (index) => {
        const todo = todos[index];
        axios.delete(`http://localhost:3001/api/todos/${todo.id}`)
            .then(() => {
                setTodos(todos.filter((_, i) => i !== index));
            })
            .catch((error) => {
                console.error('Error deleting todo:', error);
            });
    };

    const handleEditTodo = (index, todo) => {
        setEditingTodoIndex(index);
        setEditingTodoText(todo.title);
        setEditingTodoDueDate(todo.due_date);
    };

    const saveEditedTodo = (index) => {
        const todo = todos[index];
        axios.put(`http://localhost:3001/api/todos/${todo.id}`, {
            title: editingTodoText,
            completed: todo.completed,
            due_date: editingTodoDueDate
        })
        .then((response) => {
            const updatedTodos = [...todos];
            updatedTodos[index] = response.data;
            setTodos(updatedTodos);
            setEditingTodoIndex(null);
            setEditingTodoText('');
            setEditingTodoDueDate('');
        })
        .catch((error) => {
            console.error('Error updating todo:', error);
        });
    };

    const cancelEditTodo = () => {
        setEditingTodoIndex(null);
        setEditingTodoText('');
        setEditingTodoDueDate('');
    };

    return (
        <div className="TodoList">
            <h1>Todo List</h1>
            <form onSubmit={handleAddTodo}>
                <input
                    type="text"
                    value={newTodo.title}
                    onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
                    placeholder="Add a new task"
                />
                <input
                    type="datetime-local"
                    value={newTodo.due_date}
                    onChange={(e) => setNewTodo({ ...newTodo, due_date: e.target.value })}
                />
                <button type="submit">Add Task</button>
            </form>
            <div className="todo-list">
                {todos.map((todo, index) => (
                    <div key={todo.id}>
                        {editingTodoIndex === index ? (
                            <>
                                <input
                                    type="text"
                                    className='edit-input'
                                    value={editingTodoText}
                                    onChange={(e) => setEditingTodoText(e.target.value)}
                                />
                                <input
                                    type="datetime-local"
                                    className='edit-input'
                                    value={editingTodoDueDate}
                                    onChange={(e) => setEditingTodoDueDate(e.target.value)}
                                />
                                <button className='save-button' onClick={() => saveEditedTodo(index)}>Save</button>
                                <button className='cancel-button' onClick={cancelEditTodo}>Cancel</button>

                            </>
                        ) : (
                            <Todo
                                key={todo.id}
                                todo={todo}
                                onToggleComplete={() => toggleCompleteTodo(index)}
                                onDelete={() => deleteTodo(index)}
                                onEdit={() => handleEditTodo(index, todo)}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}