import React, { useState } from 'react';

const Todo = () => {
    const [newTodo, setNewTodo] = useState('');
    const [todos, setTodos] = useState([]);
    const [toEdit, setToEdit] = useState(false);
    const [editedTodo, setEditedTodo] = useState('');
    const [editIndex, seteditIndex] = useState(null);
    const [selectedTodos, setSelectedTodos] = useState([]); // State to store selected todos for deletion
    const [searchTerm, setSearchTerm] = useState('');
    const [autoCompleteOptions, setAutoCompleteOptions] = useState([]); // State to store auto-complete options

    const AddTodo = () => {
        setTodos([newTodo, ...todos]);
        setNewTodo('');
    };

    const deleteTodo = (index) => {
        let new_todos = [...todos];
        new_todos.splice(index, 1);
        setTodos(new_todos);
    };

    const editTodos = (index) => {
        setToEdit(true);
        setEditedTodo(todos[index]);
        seteditIndex(index);
    };

    const saveThis = () => {
        if (editIndex !== -1) {
            const updatedTodos = [...todos];
            updatedTodos[editIndex] = editedTodo;
            setTodos(updatedTodos);
        }
        setToEdit(false);
    };

    // Function to handle checkbox change
    const handleCheckboxChange = (index) => {
        const selectedTodoIndex = selectedTodos.indexOf(index);
        if (selectedTodoIndex === -1) {
            // If the todo is not already selected, add it to the selectedTodos array
            setSelectedTodos([...selectedTodos, index]);
        } else {
            // If the todo is already selected, remove it from the selectedTodos array
            const updatedSelectedTodos = [...selectedTodos];
            updatedSelectedTodos.splice(selectedTodoIndex, 1);
            setSelectedTodos(updatedSelectedTodos);
        }
    };

    // Function to delete selected todos
    const deleteSelectedTodos = () => {
        const newTodos = todos.filter((todo, index) => !selectedTodos.includes(index));
        setTodos(newTodos);
        // Clear the selectedTodos array after deletion
        setSelectedTodos([]);
    };

    // Function to filter todos based on search term
    const filteredTodos = todos.filter(todo =>
        todo.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Function to update auto-complete options
    const updateAutoCompleteOptions = () => {
        const options = todos.filter(todo => todo.toLowerCase().startsWith(searchTerm.toLowerCase()));
        setAutoCompleteOptions(options);
    };

    return (
        <>
            <div>
                <input
                    type="text"
                    placeholder='search'
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        updateAutoCompleteOptions();
                    }}
                    value={searchTerm}
                    list="autoCompleteOptions"
                />
                <datalist id="autoCompleteOptions">
                    {autoCompleteOptions.map((option, index) => (
                        <option key={index} value={option} />
                    ))}
                </datalist>
            </div>
            <div>
                {/* Create operation */}
                
                    <input
                    type="text"
                    placeholder='write your todo'
                    onChange={(e) => setNewTodo(e.target.value)}
                    value={newTodo}
                />
                <button onClick={AddTodo}>Add Todo</button>
                
                
            </div>

            <div>
                {/* {fetch all todo} */}
                {filteredTodos.map((todo, index) => (
                    <div key={index}>
                        <input
                            type="checkbox"
                            onChange={() => handleCheckboxChange(index)}
                        />
                        <li>{todo}</li>
                        <button onClick={() => deleteTodo(index)}>Delete Todo</button>
                        <button onClick={() => editTodos(index)}>Edit Todo</button>
                    </div>
                ))}
            </div>

            <div>
                {/* Edit todo */}
                {toEdit &&
                    <div>
                        <input
                            type="text"
                            value={editedTodo}
                            onChange={(e) => setEditedTodo(e.target.value)}
                        />
                        <button onClick={saveThis}>save</button>
                    </div>
                }
            </div>

            <div>
                {/* Delete selected todos */}
                {selectedTodos.length > 0 &&
                    <button onClick={deleteSelectedTodos}>Delete Selected Todos</button>
                }
            </div>
        </>
    );
};

export default Todo;
