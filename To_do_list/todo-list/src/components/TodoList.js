import React, { useState, useEffect } from 'react';
import './TodoList.css'


const AddTodo = () => {
    const [newTodo, setNewTodo] = useState('');
    const [list, setList] = useState(JSON.parse(localStorage.getItem('list')) || []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newTodo.trim() === '') {
            return;
        }

        const todoItem = {
            id: Math.floor(Math.random() * 10000),
            value: newTodo,
        };

        setList((prevList) => [...prevList, todoItem]);
        setNewTodo('');
    };

    const handleDeleteTodo = (id) => {
        const updatedList = list.filter((item) => item.id !== id);
        setList(updatedList);
    };

    useEffect(() => {
        localStorage.setItem('list', JSON.stringify(list));
    }, [list]);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('list'));
        if (data) {
            setList(data);
        }
    }, []);

    return (
        <div className="container">
            <form className="input-container" onSubmit={handleSubmit}>
                <input
                    type="text"
                    onChange={(e) => setNewTodo(e.target.value)}
                    className="todo-input"
                    placeholder="Write a Todo..."
                    value={newTodo}
                    name="text"
                />
                <button type="submit" className="add-todo-button">
                    Add Todo
                </button>
            </form>
            <ul className="todo-list">
                {list.map((item) => (
                    <li key={item.id} className="todo-item">
                        <span className="todo-content">{item.value}</span>
                        <button
                            className="delete-button"
                            onClick={() => handleDeleteTodo(item.id)}
                        >
                            Delete
                        </button>
                    </li>

                ))}
            </ul>
        </div>
    );
};

export default AddTodo;
