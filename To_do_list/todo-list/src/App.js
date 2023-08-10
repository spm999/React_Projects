import React from 'react';
import './App.css';
import TodoList from './components/TodoList';


function App() {
  return (
    <div className="App">
      <TodoList />
      {/* <TodoList list={list} newTodo={newTodo}/> */}
    </div>
  );
}

export default App;
